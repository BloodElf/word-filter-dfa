let wordFilter = require('./index');
//wordFilter.instance().init(['羔子', '王八', '王八羔子', '王八蛋']);
wordFilter.instance().init(['王八蛋', '王八']);
console.log(wordFilter.instance().replace('你真是个王八羔子王八蛋', '*'));
console.log(wordFilter.instance().replace('你真是个王八蛋', '*'));
