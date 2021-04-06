
var getAuthorData = require('./webdata');
var cheerio = require('cheerio');

var fs = require('fs');

getAuthorData()
.then(res =>{


  let data ={
    titles: [],
    authors: [],
    summaries: [],
    links: []
  }
  
  
  console.log('Status code: ' + res.status);
    
  let $ = cheerio.load(res.data);
  let works = $('ol[class="work index group"]')
    .find('li[role="article"]> div[class="header module"]> h4[class="heading"] > a')
    .toArray()
    .map(el => $(el).text())
  console.log(works);

  data.titles.push(... works.filter(work => work != "iluv2eat"));

  let authors = $('ol[class="work index group"]')
    .find('li[role="article"]> div[class="header module"]> h4[class="heading"] > a[rel="author"]')
    .toArray()
    .map(el => $(el).text())
  
  data.authors.push( ...authors);


  let summaries = $('blockquote[class="userstuff summary"]')
    .toArray()
    .map(el => $(el).text().trim())

  data.summaries.push(... summaries);


  let links = $('li[role="article"]> div[class="header module"]> h4[class="heading"] > a')
    .toArray()
    .map(el => "https://archiveofourown.org/" + $(el).attr("href"))


  for (let i = 0; i < links.length; i += 2){
    data.links.push(links[i]);

  }

  console.log(data);

  fs.writeFile('res/result.txt', JSON.stringify(data), (err) => {
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log('Lyric saved!');
});






})
.catch(function(err){
    console.log(err);
});


