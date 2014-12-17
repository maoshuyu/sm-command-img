'use strict';
var ERROR_MSG = {
    UPLOAD_ERROR: 'send post request error\n file: %s \n',
    PARSE_ERROR: 'parse body error\n file: %s \n',
    OUTPUT_EXIT_ERROR: 'output is not exist\n file: %s \n',
    CATCH_ERROR: '%s\n file: %s \n',
    DOWNLOAD_ERROR: 'image download error\n file: %s \n',
    WRITE_ERROR: 'file write error\n file: %s \n'
};

// 错误信息飘红
for (var key in ERROR_MSG) {
    if (ERROR_MSG.hasOwnProperty(key)) {
        ERROR_MSG[key] = ERROR_MSG[key].red.bold;  
    }
}

module.exports = ERROR_MSG;
