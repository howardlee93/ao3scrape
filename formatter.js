
var getAuthorData = require('./webdata');
var cheerio = require('cheerio');

var fs = require('fs');

getAuthorData()
.then(res =>{


  let data =[];

  let workTemplate = {
    title:"",
    summary:"",
    link:""
  }
  
  console.log('Status code: ' + res.status);
    
  let $ = cheerio.load(res.data);

  let authors = $('ol[class="work index group"]')
    .find('li[role="article"]> div[class="header module"]> h4[class="heading"] > a[rel="author"]')
    .toArray()
    .map(el => $(el).text())


  let summaries = $('blockquote[class="userstuff summary"]')
    .toArray()
    .map(el => $(el).text().trim())


  let links = $('li[role="article"]> div[class="header module"]> h4[class="heading"] > a')
    .toArray()
    .map(el => "https://archiveofourown.org/" + $(el).attr("href"))
  links = links.filter((link, i) =>{
    (i % 2) != 1;
  })



  let works = $('ol[class="work index group"]')
    .find('li[role="article"]> div[class="header module"]> h4[class="heading"] > a')
    .toArray()
    .map(el => $(el).text())
  works = works.filter(work => work != "iluv2eat");

  console.log(data);

  works.map(work =>{
    const obj = Object.create(workTemplate)
    obj.title = work;
    data.push(obj)
});


  for (let i = 0; i < links.length; i++){
    let elem = data[i];
    let link = links[i];
    let summary = summaries[i];

    elem.link = link;
    elem.summary = summary;

  }

  fs.writeFile('res/result.txt', JSON.stringify(data), (err) => {
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log('saved!');
});






})
.catch(function(err){
    console.log(err);
});


