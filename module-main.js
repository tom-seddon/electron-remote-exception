'use strict';

function MyError(type, code) {
    this.name = 'MyError';
    this.message = 'Type ' + type + ', code ' + code;
    this.type = type;
    this.code = code;
    this.stack = (new Error()).stack;
}

MyError.prototype = Object.create(Error.prototype);
MyError.prototype.constructor = MyError;

function createError(message) {
    //return new Error(message);
    return new MyError("fred", 1234);
}

module.exports = {
    throwException: () => {
        throw createError('Error (thrown)');
    },
    getException: () => {
        return createError('Error (returned)');
    },
    rejectPromise: () => {
        return new Promise((resolve, reject) => {
            process.nextTick(() => {
                reject(createError('Error (rejecting a promise)'));
            });
        });
    },
};