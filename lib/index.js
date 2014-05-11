// Load modules

var Crypto = require('crypto');


// Declare internals

var internals = {};


// Generate a cryptographically strong pseudo-random data
// Credits: https://github.com/hueniverse/cryptiles/blob/master/lib/index.js

exports.token = function (size) {

    var buffer = exports.randomBits((size + 1) * 6);
    if (buffer instanceof Error) {
        return buffer;
    }

    var string = buffer.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/\=/g, '');
    return string.slice(0, size);
};


exports.randomBits = function (bits) {

    if (!bits || bits < 0) {
        throw new Error('Invalid random bits count');
    }

    var bytes = Math.ceil(bits / 8);
    try {
        return Crypto.randomBytes(bytes);
    }
    catch (err) {
        throw new Error('Failed generating random bits: ' + err.message);
    }
};


// Generates the hash of input, defaults to RIPE160

exports.hash = function (input, algo) {
	if (!input) {
		throw new Error('Invalid input value');
	}

	var algorithm = algo || 'rmd160';

	try {
		return Crypto.createHash(algorithm).update(input).digest('hex');
	}
	catch (err) {
		throw new Error('Failed generating hash: ' + err.message);
	}
};
