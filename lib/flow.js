'use strict';
var Promise = require('promise');

function flow(files, serial, cb) {

    process.stdout.write('\n compress now'.green.bold); 

    var done = function(file) {
        process.stdout.write(' * '.green.bold); 
        return Promise.resolve(file);     
    };

    var fail = function(err) {
        return Promise.reject(err); 
    };

    if (serial) {
        // serial
        return files.reduce(function(sequence, file) {
            return sequence.then(function() {
                return new Promise(function(resolve, reject) {
                    cb(file, resolve, reject);
                }).then(done, fail);
            }); 
        }, Promise.resolve()); 
    } else {
        // parallel 
        return Promise.all(files.map(function(file) {
            return new Promise(function(resolve, reject) {
                cb(file, resolve, reject);
            }).then(done, fail);
        }));
    }
}

module.exports = flow;
