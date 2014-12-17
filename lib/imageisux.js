'use strict';
var UPLOAD_URL = 'http://image.isux.us/index.php/preview/upload_file';
var needle = require('needle');
var fs = require('fs');
var util = require('util');
var ERROR_MSG = require('./errors');
var flow = require('./flow');

function imageisux(files) {
    return flow(files, function(file, resolve, reject) {

        var data = {
            fileSelect: {
                file: file.path, 
                content_type: 'image/' + file.ext 
            },
            webp: false
        };

        needle.post(UPLOAD_URL, data, {multipart:true}, function(err, resp ,body) {
            if (err) {
                reject(util.format(ERROR_MSG.UPLOAD_ERROR, file.path));
                return;
            }

            try {
                if (body.indexOf('{') === -1) {
                    reject(util.format(ERROR_MSG.PARSE_ERROR, file.path));
                    return;
                }

                var data = eval('({'+body.split('{')[1]+')');
                var url = data.output;
                if (url) {
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
                } else {
                    reject(util.format(ERROR_MSG.OUTPUT_EXIT_ERROR, file.path));
                }
            } catch (e) {
                reject(util.format(ERROR_MSG.CATCH_ERROR, e, file.path));
            }
        });
    });
}

module.exports = imageisux;
