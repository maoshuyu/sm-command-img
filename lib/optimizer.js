'use strict';
function optimizer(root, options) {
    var src = fis.project.getSource(); 
    var files = [];

    process.stdout.write('\n retrieving ' + ('"' + root + '"').green.bold);

    fis.util.map(src, function(subpath, file) {
        if (file._isImage) {
            var ext = file.ext.replace(/^\./, '');
            var path = file.realpath;
            if (ext == 'png' || ext == 'jpg' || ext == 'jpeg') {
                files.push({
                    ext: ext,     
                    path: path
                });
            }         
        }
    });

    if (files.length > 0) {
        process.stdout.write(('\n total ' + (files.length + '').green.bold + ' image files'));

        var done = function() {
            process.stdout.write('\n image compress success \n'.green.bold); 
        };

        var error = function() {
            fis.log.error(err);
        };

        switch (options.engine) {
            case 'tinypng': 
                var tinypng = require('./tinypng');
                tinypng(files).then(done).catch(error);
                break;
            case 'imageisux':
                var imageisux = require('./imageisux');
                imageisux(files).then(done).catch(error);
                break;
            default:
                fis.log.error('engine error'.red.bold); 
                break
        }

    } else {
        process.stdout.write('do not find the image file'.green.bold); 
    }
}

module.exports = optimizer;    
