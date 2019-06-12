let wordFilter = require('./index');
// wordFilter.instance().init(['羔子', '王八', '王八羔子', '王八蛋']);
wordFilter.instance().init(['王八蛋', '王八', '羔子']);
// console.log(wordFilter.instance().replace('王八王八蛋王八羔子王八蛋', '*'));
// console.log(wordFilter.instance().replace('王八羔子王八蛋王八羔子王八蛋', '*'));
// console.log(wordFilter.instance().replace('你真是个王八蛋王八蛋', '*'));
// console.log(wordFilter.instance().replace('你真是个王八王八蛋', '*'));
console.log(wordFilter.instance().replace('王八王八蛋', '*'));

