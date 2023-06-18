const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");
const twitterBtn = document.getElementById("twitter");
const loader = document.getElementById("loader");

let apiQuotes = [];

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function loadingComplete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

let counter = 0;

//Get Quotes From API
function newQuote() {
  loading();
  try {
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    if (quote.text.length > 120) {
      quoteText.classList.add("long-quote");
    }

    quoteText.textContent = quote.text;

    if (!quote.author) {
      quoteAuthor.textContent = "unknown";
    } else {
      quoteAuthor.textContent = quote.author;
    }
    loadingComplete();
  } catch (error) {
    console.log(error);
  }
}

//Fetching all Quotes
async function getQuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    console.log(error);
    quoteContainer.textContent =
      "Failed to load quotes, Please try again later.";
  }
}

//Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
  window.open(twitterUrl, "_blank");
}

//Event Listner
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

//On Load
getQuotes();
