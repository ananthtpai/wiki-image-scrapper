const request = require('./lib/request');
const parser = require('./lib/parser/wiki');
process.argv.forEach(function (val, index, array) {
  // console.log(index + ': ' + val);
});

async function init() {
    var url = "https://en.m.wikipedia.org/wiki/Premier_League";
    var response = await request.get(url);
    var wikiArray = await parser.getTeamsFromHTML(response);

    for (var i = 0; i < wikiArray.length; i++) {
        var downloads = await parser.downloadImagesFromWiki(wikiArray[i].wiki)
    }
}


init();
