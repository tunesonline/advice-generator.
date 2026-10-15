const API_URL = "https://api.adviceslip.com/advice";

const adviceId = document.getElementById("advice-id");
const adviceText = document.getElementById("advice-text");
const adviceButton = document.getElementById("advice-button");
const statusMessage = document.getElementById("status-message");

async function fetchAdvice() {
  const response = await fetch(API_URL, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data = await response.json();

  if (!data.slip || !data.slip.advice || !data.slip.id) {
    throw new Error("The advice response was not in the expected format.");
  }

  return data.slip;
}

function showAdvice(slip) {
  adviceId.textContent = `#${slip.id}`;
  adviceText.textContent = `“${slip.advice}”`;
}

async function getAdvice() {
  adviceButton.disabled = true;
  statusMessage.textContent = "Loading advice...";

  try {
    const slip = await fetchAdvice();
    showAdvice(slip);
    statusMessage.textContent = "Here is your advice.";
  } catch (error) {
    console.error("Could not get advice:", error);
    adviceText.textContent = "Oops! We couldn't get advice right now.";
    statusMessage.textContent = "Check your internet connection and try again.";
  } finally {
    adviceButton.disabled = false;
  }
}

adviceButton.addEventListener("click", getAdvice);

// Load advice as soon as the page opens.
getAdvice();
