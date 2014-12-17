'use strict';

var optimizer = require('./lib/optimizer');

exports.name = 'img';
exports.usage = '<command> [options]';
exports.desc = 'optimizer img';
exports.register = function(commander) {
    commander
        .option('-e, --engine <name>', 'compression engine', String, 'tinypng')
        .option('-s, --serial', 'serial download', Boolean, false)
        .action(function() {
            var options = arguments[arguments.length - 1];

            if (options.verbose) {
                fis.log.level = fis.log.L_ALL;
            }

            var root = fis.util.realpath(options.root || process.cwd());

            // init project
            fis.project.setProjectRoot(root);

            optimizer(root, options);
        });
    
};
