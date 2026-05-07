const DOM = {
  number: () => document.getElementById("number"),
  result: () => document.getElementById("result"),
  loading: () => document.getElementById("loading")
};

function getNumber() {
  return DOM.number().value.trim();
}

function showLoading() {
  DOM.result().className = "result hidden";
  DOM.result().innerHTML = "";
  DOM.loading().classList.remove("hidden");
}

function hideLoading() {
  DOM.loading().classList.add("hidden");
}

function showError(message) {
  const resultBox = DOM.result();
  resultBox.className = "result error";
  resultBox.innerText = "❌ " + message;
}

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = value ?? "";
  return div.innerHTML;
}

function pick(obj, keys, fallback = "N/A") {
  for (const key of keys) {
    if (obj && obj[key] !== undefined && obj[key] !== null && obj[key] !== "") {
      return obj[key];
    }
  }
  return fallback;
}

async function lookupNumber() {
  const number = getNumber();

  if (!number) {
    showError("দয়া করে একটি মোবাইল নাম্বার লিখুন।");
    return;
  }

  showLoading();

  try {
    const response = await fetch(`/api/lookup?number=${encodeURIComponent(number)}`);
    const data = await response.json();

    hideLoading();

    if (!response.ok || data.error || data.status === "error" || data.code === "INVALID_KEY") {
      showError(data.message || data.error ||
