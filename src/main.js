import "../style.css";

// Constants
const ENDPOINT_COMPLETIONS = "https://api.openai.com/v1/chat/completions";
const ENDPOINT_IMAGES = "https://api.openai.com/v1/images/generations";

// Global variables
let API_KEY;

// Helper functions
async function getBlurb(title, theme) {
  // TODO Implement Me!
  // Use the OpenAI API to generate a blurb based on the title and theme.
  // You should use the global API_KEY variable to authenticate your request.
  // You must use fetch to make the request.
  // You should return the generated blurb.
}

async function getCoverImage(blurb) {
  // TODO Implement Me!
  // Use the OpenAI API to generate a cover image based on the blurb.
  // You should use the global API_KEY variable to authenticate your request.
  // You must use fetch to make the request.
  // You should return the URL of the generated image.
}

// Event handlers
async function handleFormSubmission(e) {
  // TODO Implement Me!
  // This function is called when the form is submitted.
  // It should get the title and theme from the form.
  // It should then call getBlurb and getCoverImage to generate the blurb and image.
  // Finally, it should update the DOM to display the blurb and image.
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
