'use strict';

const $ = require('jquery'), electron = require('electron');
const mod = electron.remote.require('./module-main.js');

function onClick(selector, fun) {
    $(selector).off('click.tom').on('click.tom', fun);
}

function logException(ex) {
    console.log(ex);
    console.log('Type: ' + typeof (ex));
    console.log('Message: ' + ex.message);
    console.log('Error Type: ' + ex.type);
    console.log('Error Code: ' + ex.code);
}

$(document).ready(() => {
    onClick('#throwException', () => {
        try {
            mod.throwException();
        } catch (ex) {
            logException(ex);
        }
    });

    onClick('#returnException', () => {
        const ex = mod.getException();
        logException(ex);
    });

    onClick('#rejectPromise', async () => {
        try {
            await mod.rejectPromise();
        } catch (ex) {
            logException(ex);
        }
    });
});
