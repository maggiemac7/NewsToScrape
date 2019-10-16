var axios = require('axios');
var cheerio = require('cheerio');

module.exports = function (app) {
    app.get('/scrape', function(req, res){
        //Scrape here
    axios.get("https://www.goodreads.com/genres/biography").then(function(response){
        var $ = cheerio.load(response.data);

        // An empty array to save the data that we'll scrape
        var results = [];
      
        // With cheerio, find each p-tag with the "title" class
        // (i: iterator. element: the current element)
        $(".bookBox").each(function(i, element) {
        //   // Save the text of the element in a "title" variable
        var title = $(element).find('.bookImage').attr('alt');
      
        //   // In the currently selected element, look at its child elements (i.e., its a-tags),
        //   // then save the values for any "href" attributes that the child elements may have
          var link = 'https://www.goodreads.com' + $(element).find('a').attr("href");
          var bookCover = $(element).find('.bookImage').attr('src');
      
        //   // Save these results in an object that we'll push into the results array we defined earlier
          results.push({
            title: title,
            link: link,
            bookCover: bookCover
          });
        });
      
        // Log the results once you've looped through each of the elements found with cheerio
        console.log(results);
    })
    });
}