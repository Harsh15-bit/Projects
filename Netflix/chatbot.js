const chatbot = document.getElementById("chatbot");
const chatbotHeader = document.getElementById("chatbot-header");
const chatbotBody = document.getElementById("chatbot-body");
const chatbotInput = document.getElementById("chatbot-input");

const API_KEY_CHAT = "584ce82c24d069361abad1f7ba0b7973";
const BASE_URL_CHAT = "https://api.themoviedb.org/3";

let botOpen = false;
chatbotHeader.addEventListener("click", ()=>{
  if(!botOpen){
    chatbotBody.style.display = "flex";
    chatbotBody.style.height = "0px";
    setTimeout(()=>{ chatbotBody.style.transition = "height .28s ease"; chatbotBody.style.height = "260px"; chatbotInput.style.display="block"; }, 20);
  } else {
    chatbotBody.style.height = "0px";
    chatbotInput.style.display="none";
    setTimeout(()=>{ chatbotBody.style.display="none"; }, 280);
  }
  botOpen = !botOpen;
});

(function dragElement(el){
  let pos1=0,pos2=0,pos3=0,pos4=0;
  el.onmousedown = dragMouseDown;
  function dragMouseDown(e){
    if(e.target.id !== "chatbot-header") return;
    e.preventDefault();
    pos3 = e.clientX; pos4 = e.clientY;
    document.onmouseup = closeDrag;
    document.onmousemove = elementDrag;
  }
  function elementDrag(e){
    e.preventDefault();
    pos1 = pos3 - e.clientX; pos2 = pos4 - e.clientY;
    pos3 = e.clientX; pos4 = e.clientY;
    chatbot.style.top = (chatbot.offsetTop - pos2) + "px";
    chatbot.style.left = (chatbot.offsetLeft - pos1) + "px";
    chatbot.style.right = "auto";
  }
  function closeDrag(){ document.onmouseup = null; document.onmousemove = null; }
})(chatbot);

function appendChat(text, who){
  const p = document.createElement("p");
  p.textContent = text;
  p.className = who;
  chatbotBody.appendChild(p);
  chatbotBody.scrollTop = chatbotBody.scrollHeight;
  if(who==="bot"){ const utter = new SpeechSynthesisUtterance(text); speechSynthesis.speak(utter); }
}

const botResponses = {
  "home": "This is the Home page — browse categories or trending titles.",
  "trending": "Trending shows and movies are shown in the Trending Now category.",
  "movies": "You can browse many movie categories — click a category to see more.",
  "tv": "TV Shows section lists popular and genre-specific TV shows.",
  "my list": "My List stores titles you clicked (saved locally).",
  "search": "Use the search box at the top to look up any movie or show.",
  "about": "This app helps you explore and save your favorite movies and shows in one place.",
  "help": "You can type keywords like 'movies', 'tv', 'trending', or 'my list' to navigate easily.",
  "contact": "For support or feedback, email us at support@moviebot.com.",
  "login": "Click on the Login button at the top right corner to sign in.",
  "signup": "Create an account by clicking the Sign Up button — it’s quick and free.",
  "settings": "In Settings, you can adjust your preferences, language, and notifications.",
  "recommend": "Looking for something new? Try browsing 'Trending' or 'Recommended for You'!",
  "genres": "We have multiple genres like Action, Comedy, Horror, Drama, Romance, and Sci-Fi.",
  "new releases": "Check out the New Releases section to see the latest movies and shows added.",
  "favorites": "Your Favorites list shows everything you liked or rated highly.",
  "logout": "To log out, go to your profile menu and click 'Logout'.",
  "error": "Oops! Something went wrong. Please try again in a moment."
};


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;
if(SpeechRecognition){
  recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.continuous = false;
  recognition.onresult = (e)=>{
    const text = e.results[0][0].transcript;
    appendChat(text, "user");
    processUser(text.toLowerCase());
  };
}

chatbotInput.addEventListener("keydown", (e)=>{
  if(e.key === "Enter"){
    const txt = chatbotInput.value.trim();
    if(!txt) return;
    appendChat(txt, "user");
    chatbotInput.value = "";
    processUser(txt.toLowerCase());
  }
  if(e.key === "F2" && recognition){ recognition.start(); }
});

async function processUser(text){
  if(text.includes("recommend")){
    appendChat("Finding a recommendation for you...", "bot");
    try{
      const page = Math.floor(Math.random()*5)+1;
      const res = await fetch(`${BASE_URL_CHAT}/movie/popular?api_key=${API_KEY_CHAT}&page=${page}`);
      const data = await res.json();
      const movie = data.results[Math.floor(Math.random()* (data.results.length || 1) )];
      if(movie){ appendChat(`I recommend: ${movie.title}. Watch the trailer on YouTube!`, "bot"); return; }
    }catch(e){ console.error(e); appendChat("Couldn't fetch recommendations.", "bot"); return; }
  }

  for(const key in botResponses){
    if(text.includes(key)){
      appendChat(botResponses[key], "bot"); return;
    }
  }

  appendChat("Sorry, I didn't get that. Try asking about 'recommend', 'movies', 'trending', or 'my list'.", "bot");
}

appendChat("Hi — ask me about the site or say 'recommend' for a movie suggestion. Press F2 to speak.", "bot");
