// app.js 

var cheerio = require('cheerio');

const readline = require('readline');

var fs = require('fs');

var getAuthorData = require('./webdata');



const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
  
rl.question('What is the user you want to scrape ', (user) => {
    // TODO: Log the answer in a database
    console.log(`Thank you for your valuable feedback: ${user}`);
    getAuthorData(user)
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
        .map(el => "https://archiveofourown.org/" + $(el).attr("href"));
    
      links = links.filter((link, i) =>{
        return (i % 2) != 1;
      })
    
    
      let works = $('ol[class="work index group"]')
        .find('li[role="article"]> div[class="header module"]> h4[class="heading"] > a')
        .toArray()
        .map(el => $(el).text())
      works = works.filter(work => work != "iluv2eat");
    
    
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
    
      console.log(links);
    
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
  
    rl.close();
});

 
  
  
  