'use strict';
var needle = require('needle');
var fs = require('fs');
var util = require('util');
var UPLOAD_URL = 'https://api.tinypng.com/shrink';
var APP_KEY = 'E7uV-3xfvPcQkKX02nuNFNR7NrOKBT-Y';
var ERROR_MSG = require('./errors');
var flow = require('./flow');

function tinypng(files) {
    return flow(files, function(file, resolve, reject) {
        var options = {
            auth: 'api:' + APP_KEY
        };

        needle.post(UPLOAD_URL, fs.createReadStream(file.path), options, function(err, resp ,body) {
            if (err) {
                console.log(1);
                reject(util.format(ERROR_MSG.UPLOAD_ERROR, file.path));
                return;
            }

            try {
                if (body.output && body.output.url) {
                    var url = body.output.url;
                    try {
                        needle.get(url, function(err, resp, body) {
                            if (err) {
                                reject(util.format(ERROR_MSG.DOWNLOAD_ERROR, file.path));
                                return;
                            }     

                            fs.writeFile(file.path, body, function(err, data) {
                                if (err) {
                                    reject(util.format(ERROR_MSG.WRITE_ERROR, file.path));
                                    return;
                                } 

                                resolve(file.path);
                            });
                        }); 
                    } catch (e) {
                        reject(util.format(ERROR_MSG.CATCH_ERROR, e, file.path));
                    }
                } else {
                    reject(util.format(ERROR_MSG.OUTPUT_EXIT_ERROR, file.path));
                }
            } catch (e) {
                reject(util.format(ERROR_MSG.CATCH_ERROR, e, file.path));
            }
        });
    });
}
module.exports = tinypng;
