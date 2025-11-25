// ---------- Config ----------
const API_KEY = "584ce82c24d069361abad1f7ba0b7973";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

// DOM
const movieCategoriesContainer = document.getElementById("movie-categories");
const tvCategoriesContainer = document.getElementById("tv-categories");
const mylistContainer = document.getElementById("mylist-container");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const searchResults = document.getElementById("searchResults");

// ---------- Categories ----------
const categories = {
  movies: [
    { title: "Trending Now", url: `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`, type: "movie" },
    { title: "Top Rated", url: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`, type: "movie" },
    { title: "Action", url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`, type: "movie" },
    { title: "Adventure", url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=12`, type: "movie" },
    { title: "Animation", url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=16`, type: "movie" },
    { title: "Comedy", url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35`, type: "movie" },
    { title: "Crime", url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=80`, type: "movie" },
    { title: "Documentaries", url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=99`, type: "movie" },
    { title: "Drama", url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=18`, type: "movie" },
    { title: "Family", url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=10751`, type: "movie" },
    { title: "Fantasy", url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=14`, type: "movie" },
    { title: "History", url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=36`, type: "movie" },
    { title: "Horror", url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27`, type: "movie" },
    { title: "Music", url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=10402`, type: "movie" },
    { title: "Mystery", url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=9648`, type: "movie" },
    { title: "Romance", url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=10749`, type: "movie" },
    { title: "Science Fiction", url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=878`, type: "movie" },
    { title: "TV Movie", url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=10770`, type: "movie" },
    { title: "Thriller", url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=53`, type: "movie" },
    { title: "War", url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=10752`, type: "movie" },
    { title: "Western", url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=37`, type: "movie" },
    { title: "Popular", url: `${BASE_URL}/movie/popular?api_key=${API_KEY}`, type: "movie" },
    { title: "Now Playing", url: `${BASE_URL}/movie/now_playing?api_key=${API_KEY}`, type: "movie" },
    { title: "Upcoming", url: `${BASE_URL}/movie/upcoming?api_key=${API_KEY}`, type: "movie" },
    { title: "Latest", url: `${BASE_URL}/movie/latest?api_key=${API_KEY}`, type: "movie" },
    { title: "Bollywood", url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&region=IN&with_original_language=hi`, type: "movie" },
    { title: "Classics", url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=release_date.asc`, type: "movie" },
    { title: "Oscar Winners", url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_keywords=academy-award-winner`, type: "movie" },
    { title: "Kids", url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&certification_country=US&certification.lte=G`, type: "movie" },
    { title: "Christmas Specials", url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_keywords=christmas`, type: "movie" }
  ],
  tvshows: [
    { title: "Trending TV", url: `${BASE_URL}/trending/tv/week?api_key=${API_KEY}`, type: "tv" },
    { title: "Top Rated TV", url: `${BASE_URL}/tv/top_rated?api_key=${API_KEY}`, type: "tv" },
    { title: "Action & Adventure", url: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=10759`, type: "tv" },
    { title: "Animation TV", url: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=16`, type: "tv" },
    { title: "Comedy TV", url: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=35`, type: "tv" },
    { title: "Crime TV", url: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=80`, type: "tv" },
    { title: "Documentary TV", url: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=99`, type: "tv" },
    { title: "Drama TV", url: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=18`, type: "tv" },
    { title: "Family TV", url: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=10751`, type: "tv" },
    { title: "Mystery TV", url: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=9648`, type: "tv" },
    { title: "Reality", url: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=10764`, type: "tv" },
    { title: "Sci-Fi & Fantasy TV", url: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=10765`, type: "tv" },
    { title: "Kids TV", url: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=10762`, type: "tv" }
  ]
};

// ---------- Helper to create category rows ----------
async function loadCategory(container, cat){
  const section = document.createElement("div");
  section.className = "section-block";
  const h2 = document.createElement("h2");
  h2.textContent = cat.title;
  section.appendChild(h2);

  const row = document.createElement("div");
  row.className = "movie-row";
  section.appendChild(row);
  container.appendChild(section);

  try {
    const res = await fetch(cat.url);
    const data = await res.json();
    (data.results || []).forEach(item => {
      if(!item.poster_path) return;
      const img = document.createElement("img");
      img.src = `${IMG_URL}${item.poster_path}`;
      img.alt = item.title || item.name;
      img.addEventListener("click", ()=>openTrailer(item.id, cat.type));
      row.appendChild(img);
    });
  } catch(e){ console.error(e); }
}

// ---------- Load All Categories ----------
categories.movies.forEach(cat => loadCategory(movieCategoriesContainer, cat));
categories.tvshows.forEach(cat => loadCategory(tvCategoriesContainer, cat));

// ---------- My List ----------
const myList = JSON.parse(localStorage.getItem("myList") || "[]");
myList.forEach(item => {
  const img = document.createElement("img");
  img.src = `${IMG_URL}${item.poster_path}`;
  img.alt = item.title || item.name;
  img.addEventListener("click", ()=>openTrailer(item.id, item.type));
  mylistContainer.appendChild(img);
});

// ---------- Search ----------
searchBtn.addEventListener("click", searchMovie);
searchInput.addEventListener("keydown", e => { if(e.key === "Enter") searchMovie(); });

async function searchMovie(){
  const query = searchInput.value.trim();
  if(!query) return;
  searchResults.innerHTML = "";
  try {
    const res = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await res.json();
    (data.results || []).forEach(item => {
      if(!item.poster_path) return;
      const img = document.createElement("img");
      img.src = `${IMG_URL}${item.poster_path}`;
      img.alt = item.title || item.name;
      img.addEventListener("click", ()=>openTrailer(item.id, item.media_type));
      searchResults.appendChild(img);
    });
  } catch(e){ console.error(e); }
}

// ---------- Trailer function (new tab) ----------
function openTrailer(id, type="movie"){
  fetch(`${BASE_URL}/${type}/${id}/videos?api_key=${API_KEY}`)
    .then(r => r.json())
    .then(data => {
      const trailers = (data.results || []).filter(v => v.site==="YouTube" && v.type==="Trailer");
      if(trailers.length > 0){
        const videoUrl = `https://www.youtube.com/watch?v=${trailers[0].key}`;
        window.open(videoUrl, "_blank");
      } else {
        alert("Trailer not available for this title.");
      }
    })
    .catch(() => alert("Failed to fetch trailer."));
}
