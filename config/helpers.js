'use strict';

const path = require('path');

const _root = path.resolve(__dirname, '..');

exports.root = function (args) {
    args = Array.prototype.slice.call(arguments, 0);
    console.log('✅ ROOT --->', path.join.apply(path, [_root].concat(args)))
    return path.join.apply(path, [_root].concat(args));
};

exports.assetsPath = function (_path) {
    console.log('✅ ASSETS PATH  --->', path.posix.join('public', _path))
    return path.posix.join('public', _path);
};
