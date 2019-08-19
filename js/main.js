const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

const searchShows = () =>{
    const data =  { 
        "_source": ["titleName.title", "imagePackUri"], 
        "from": 0,
        "size": 10,
            "query": {
              "bool": {
                "must": [
                  {
                    "multi_match": {
                      "fields": ["titleName.title"],
                      "query": search.value,
                      "fuzziness": "AUTO",
                      "prefix_length": 2
                    }
                  }
                ]
            }
        }
      };

      fetch('http://search-searchapi-playground-xx4asiusxu3qq2hqirqpvt2t3m.eu-west-1.es.amazonaws.com/test-prodtest-titles-for-search/_search', {
  method: 'POST',
  headers: {
    'Content-type': 'application/json'},
  body: JSON.stringify(data)
}).then(response => {
  if(response.ok) {
    return response.json();
  }
  throw new Error('Request failed!');
}, networkError => {
  console.log(networkError.message)
}).then(jsonResponse => {
    console.log(jsonResponse.hits.hits)
    const matches = jsonResponse.hits.hits;
    const html = matches.map(match => 
        `<div class="card card-body mb-1">
        <h4>${match["_source"].titleName.title}</h4>
        <img src=${match["_source"].imagePackUri} class="card-img-top" alt="">
        </div>`
        
    ).join('');
    matchList.innerHTML = html;
console.log(matches)

  }
);
}
search.addEventListener('input', () => searchShows(search.value))
