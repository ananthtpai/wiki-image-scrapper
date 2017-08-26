const cheerio = require('cheerio')
const request = require('../request');

function getTeamsFromHTML(html) {
    const $ = cheerio.load(html);
    var teams = $('.mf-section-4 .wikitable.sortable').find('td a');
    var teamsArray = [];
    for (var i = 0; i < teams.length; i++) {
        teamsArray.push({
            wiki: teams[i].attribs.href
        })
    }
    return new Promise(function(resolve, reject) {
        if(true) {
            resolve(teamsArray);
        } else {
            reject(null);
        }
    });
}

async function downloadImagesFromWiki(wikiUrl) {
    var html = await request.get("https://en.m.wikipedia.org" + wikiUrl);
    const $ = cheerio.load(html);
    var imageUrl = $(".infobox.vcard a").find('img')[0];
    if(imageUrl) {
        imageUrl = imageUrl.attribs.src;

        var fileName = getFileNameFromImageUrl(imageUrl)
        request.download("https:"  + imageUrl, "./downloads" + fileName);
    }

    return new Promise(function(resolve, reject) {
        if(true) {
            resolve(true);
        } else {
            reject(null);
        }
    });
}

function getFileNameFromImageUrl(url) {
    const regex = /\/(?:.(?!\/))+$/gm;
    return regex.exec(url)[0];
}

module.exports = {
    getTeamsFromHTML: getTeamsFromHTML,
    downloadImagesFromWiki: downloadImagesFromWiki
}
