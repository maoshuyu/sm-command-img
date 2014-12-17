'use strict';
var Promise = require('promise');

function flow(files, cb) {
    process.stdout.write('\n compress now'.green.bold); 

    return Promise.all(files.map(function(file) {
        return new Promise(function(resolve, reject) {
            cb(file, resolve, reject);
        }).then(function(file) {
            process.stdout.write(' * '.green.bold); 
            return Promise.resolve(file);     
        }, function(err) {
            return Promise.reject(err); 
        });
    }));   

    /*return files.reduce(function(sequence, file) {
        return sequence.then(function() {
            return new Promise(function(resolve, reject) {
                cb(file, resolve, reject);
            }).then(function(file) {
                process.stdout.write(' * '.green.bold); 
                return Promise.resolve(file);     
            }, function(err) {
                return Promise.reject(err); 
            });
        }); 
    }, Promise.resolve());*/ 

}

module.exports = flow;
