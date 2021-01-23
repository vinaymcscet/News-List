console.log("This is my index.js file");
// 8c8fe529bb7e41b580938f8f24ee1186

// Initalize the news api parameter
let source = "bbc-news";
let category = "business";
let country = "in";
let apiKey = '8c8fe529bb7e41b580938f8f24ee1186';
// Grab the news container
newsAccordian = document.getElementById('newsAccordian');
// create a ajax get request
const xhr = new XMLHttpRequest();
// xhr.open('GET', `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`, true);
xhr.open('GET', `http://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`, true);
// xhr.getResponseHeader('Content-type', 'application/json');

// what to do when response is ready.
xhr.onload = function () {
    if (this.status == 200) {
        // debugger;
        let json = JSON.parse(this.responseText);
        let articles = json.articles;
        // console.log(articles["publishedAt"]);
        let newsHtml = '';
        for(let date in articles){
            const dateObj = new Date(articles[date]["publishedAt"]);
            // console.log(dateObj);
            let dateValue = dateObj.getDate();
            let monthValue = dateObj.getMonth(); 
            let yearValue = dateObj.getFullYear();
            let timeValue = dateObj.toLocaleTimeString();
            articles.forEach(function (element, index) {
                // console.log(articles[news]);
                let news = `
                        <div class="card">
                            <div class="card-header" id="heading${index}">
                                <h2 class="mb-0">
                                    <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapse${index}" 
                                    aria-expanded="false" aria-controls="collapse${index}">
                                    <span class="badge badge-pill badge-success">Breaking News ${index+1}</span> ${element["title"]}
                                    </button>
                                </h2>
                            </div>
                            <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}" data-parent="#newsAccordian">
                                <div class="card-body">
                                    <h5>Source: ${element["source"]["name"]}</h5>
                                    <img src="${element["urlToImage"]}" alt="${element["source"]["id"]}" width="150" height="150">
                                    <p>${element["content"]}. Read More <a href="${element['url']}" target="_blank">Read more here</a></p>
                                    <h6>Posted at: <em>${dateValue}/${monthValue}/${yearValue}, ${timeValue}</em></h6>
                                </div>
                            </div>
                        </div> `;
                newsHtml += news;
            });
        }
        newsAccordian.innerHTML = newsHtml;
    }
    else {
        console.log("Some error occured");
    }
}
xhr.send();
