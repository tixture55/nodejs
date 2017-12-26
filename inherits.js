
var util = require('util');

function Currency (name, code) {
    this.name = name;
    this.code = code;
}
Currency.prototype.toString = function () {
    return this.name + ' ' + this.code;
};
function CryptoCurrency (name, code, author) {
    Currency.call(this, name, code);

    this.author = author;
}
util.inherits(CryptoCurrency, Currency);
CryptoCurrency.prototype.toString = function () {
    return CryptoCurrency.super_.prototype.toString.call(this) + ' ' + this.author;
};

var bitcoin = new CryptoCurrency('bitcoin', 'BTC', 'Satoshi Nakamoto');
console.log(bitcoin.name);
console.log(bitcoin.code);
console.log(bitcoin.author);
console.log(bitcoin.toString());
