const https = require('https');
const fs = require('fs');

function getRequest(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            var stringResponse = "";

            res.on('data', function (chunk) {
                stringResponse += chunk;
            });

            res.on('end', function () {
                resolve(stringResponse);
            });
        }).on('error', (e) => {
           reject(err);
        });
    });
}

function downloadFile(url, dest) {
    var file = fs.createWriteStream(dest);

    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            var stringResponse = "";

            res.on('data', function (chunk) {
                file.write(chunk);
            });

            res.on('end', function () {
                file.end();
                resolve('success');
            });
        }).on('error', (e) => {
            reject(err);
        });
    })
}

module.exports = {
    get: getRequest,
    download: downloadFile
}
