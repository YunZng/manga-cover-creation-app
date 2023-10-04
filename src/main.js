import "../style.css";

// Constants
const ENDPOINT_COMPLETIONS = "https://api.openai.com/v1/chat/completions";
const ENDPOINT_IMAGES = "https://api.openai.com/v1/images/generations";

// Global variables
let API_KEY;

// Helper functions
async function getBlurb(title, theme) {
  let header = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
  };
  return fetch(ENDPOINT_COMPLETIONS, {
    method: 'POST',
    headers: header,
    body: JSON.stringify({
      'model': 'gpt-3.5-turbo',
      'messages': [
        {
          'role': 'user',
          'content': `Generate a good blurb using title "${title}", and theme "${theme}".`
        },
        {
          'role': 'user',
          'content': `Make it shorter, around 100 words.`
        },

        {
          'role': 'user',
          'content': `Check your grammar.`
        }
      ]
    })
  })
    .then(response => response.json())
    .then(responseJSON => {
      try {
        return responseJSON.choices[0].message.content;
      } catch (err) {
        throw new Error(responseJSON.error.message);
      }
    });
}

async function getCoverImage(blurb) {
  let header = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
  };
  return fetch(ENDPOINT_IMAGES, {
    method: 'POST',
    headers: header,
    body: JSON.stringify({
      'prompt': `Give me a cool, clear, readable image about this blurb: ${blurb}`
    })
  })
    .then(response => response.json())
    .then(responseJSON => {
      try {
        return responseJSON.data[0].url;
      } catch (err) {
        throw new Error(responseJSON.error.message);
      }
    });
}

// Event handlers
async function handleFormSubmission(e) {
  let title = document.getElementById("mangaTitle");
  let theme = document.getElementById("mangaTheme");
  let button = document.getElementById("generateButton");
  let blurbArea = document.getElementById("generatedBlurb");
  let imgArea = document.getElementById("coverImage");
  let spinner = document.getElementById("spinner");
  e.preventDefault();
  if (!title.value || !theme.value) {
    alert("Are you really trynna trick me by submitting blanks?");
  } else {
    try {
      // prevent action, reset content, show loading
      title.readOnly = true;
      theme.readOnly = true;
      button.classList.add("hidden");
      blurbArea.classList.add("hidden");
      blurbArea.innerHTML = '';
      imgArea.classList.add("hidden");
      imgArea.src = '';
      spinner.classList.remove("hidden");

      // start requesting blurb
      let blurb = await getBlurb(title.value, theme.value);
      blurbArea.classList.remove("hidden");
      blurbArea.innerHTML = blurb;
      // start requesting image
      let imgURL = await getCoverImage(blurb);
      imgArea.classList.remove("hidden");
      imgArea.src = imgURL;
    } catch (err) {
      alert(err);
      console.log(err);
    }

    // restore setting
    spinner.classList.add("hidden");
    title.readOnly = false;
    theme.readOnly = false;
    button.classList.remove("hidden");
  }
  return;
}

document.addEventListener("DOMContentLoaded", () => {
  API_KEY = localStorage.getItem("openai_api_key");

  if (!API_KEY) {
    alert(
      "Please store your API key in local storage with the key 'openai_api_key'.",
    );
    return;
  }

  const mangaInputForm = document.getElementById("mangaInputForm");
  mangaInputForm.addEventListener("submit", handleFormSubmission);
});
