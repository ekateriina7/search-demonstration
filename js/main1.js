const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

const searchShows = async searchText => {
    const res = await fetch('http://search-searchapi-playground-xx4asiusxu3qq2hqirqpvt2t3m.eu-west-1.es.amazonaws.com/test-prodtest-titles-for-search/_search');
    const showsObj = await res.json();
    const shows = showsObj.hits.hits;
   
    console.log(showsObj)
    console.log(shows[0]["_source"].titleName.title);

    let matches = shows.filter(show => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return shows[0]["_source"].titleName.title.match(regex)
       
    });

    if(searchText.length === 0) {
        matches = [];
        matchList.innerHTML = ''
    }
    console.log(matches)

    outputHtml(matches);

}

const outputHtml = matches => {
    if(matches.length > 0) {
        const html = matches.map(match => 
            `<div class="card card-body mb-1">
            <h4>${match["_source"].titleName.title}</h4>
            <img src=${match["_source"].imagePackUri} class="card-img-top" alt="">
            </div>`
            
        ).join('');
        matchList.innerHTML = html;
    }
}

search.addEventListener('input', () => searchShows(search.value))