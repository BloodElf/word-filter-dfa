"use strict";
exports.__esModule = true;
var WordFilter = /** @class */ (function () {
  function WordFilter() {
    this._initialized = false;
    this._filterTextMap = {};
  }
  WordFilter.instance = function () {
    if (WordFilter._instance == undefined) {
      WordFilter._instance = new WordFilter();
    }
    return WordFilter._instance;
  };
  /**
   * 初始化时，将敏感词丢进来，并解析成 MAP
   *
   * @param {string[]} keywords
   */
  WordFilter.prototype.init = function (keywords) {
    this._initTextFilterMap(keywords);
    this._initialized = true;
  };
  /**
   * 初始化过滤词词库
   *
   * @param {string[]} keywords
   * @private
   */
  WordFilter.prototype._initTextFilterMap = function (keywords) {
    if (keywords) {
      // every word
      for (var i = 0; i < keywords.length; i++) {
        if (!keywords[i]) {
          continue;
        }
        var parent_1 = this._filterTextMap;
        // add word map
        var word = keywords[i];
        // every letter
        for (var i_1 = 0; i_1 < word.length; i_1++) {
          if (!parent_1[word[i_1]])
            parent_1[word[i_1]] = {};
          parent_1 = parent_1[word[i_1]];
        }
        parent_1.isEnd = true;
      }
    }
  };
  /**
   * 敏感词过滤
   */
  WordFilter.prototype.replace = function (searchValue, replaceValue) {
    if (replaceValue === void 0) { replaceValue = '*'; }
    // 敏感词 map
    var parent = this._filterTextMap;
    // 每一个输入文字进行过滤
    for (var i = 0; i < searchValue.length; i++) {
      // 输入文字和替换文字相同不用过滤
      if (searchValue[i] == replaceValue) {
        continue;
      }
      var found = false;
      var skip = 0;
      var sWord = '';
      for (var j = i; j < searchValue.length; j++) {
        // 当前文字在父机词组中未找到，重置词组到根词组
        // skip => j - i - 1 （j - i - 1 个字已经被过滤）
        // break 当前文字过滤结束，进入后续过滤
        if (!parent[searchValue[j]]) {
          found = false;
          skip = j - i - 1;
          parent = this._filterTextMap;
          break;
        }
        // 当前文字在父级词组中命中
        sWord = sWord + searchValue[j];
        // 当前命中文字在父级词组中处于文字结束位置， 而且下一个字未命中
        if (parent[searchValue[j]].isEnd && !parent[searchValue[j]][searchValue[j + 1]]) {
          // 标记找到
          found = true;
          // 过滤 j - i 个字
          skip = j - i;
          // 重置父级词组到根 map
          parent = this._filterTextMap;
          break;
        }
        // 父级词组 map 更换为当前文字
        parent = parent[searchValue[j]];
      }
      // 发现已经过滤的字 i 进行增加
      if (skip > 1) {
        i += skip - 1;
      }
      // 当前未命中敏感字，检查后面的字
      if (!found) {
        continue;
      }
      // STARS
      var stars = replaceValue;
      for (var k = 0; k < skip; k++) {
        stars = stars + replaceValue;
      }
      // 将敏感字换成 STARS
      var reg = new RegExp(sWord, 'g');
      searchValue = searchValue.replace(reg, stars);
    }
    return searchValue;
  };
  return WordFilter;
}());
exports.WordFilter = WordFilter;
exports["default"] = WordFilter;
