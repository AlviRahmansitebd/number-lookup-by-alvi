async function lookupNumber() {
  const number = document.getElementById("number").value.trim();
  const resultBox = document.getElementById("result");
  const loading = document.getElementById("loading");

  resultBox.className = "result hidden";
  resultBox.innerHTML = "";

  if (!number) {
    showError("দয়া করে একটি ফোন নাম্বার লিখুন।");
    return;
  }

  loading.classList.remove("hidden");

  try {
    const res = await fetch("/api/lookup?number=" + encodeURIComponent(number));
    const data = await res.json();

    loading.classList.add("hidden");

    if (data.error || data.status === "error" || data.code === "INVALID_KEY") {
      showError(data.message || data.error || "Lookup failed. Please try again.");
      return;
    }

    showResult(data);
  } catch (error) {
    loading.classList.add("hidden");
    showError("Server error. Please try again later.");
  }
}

function showResult(data) {
  const resultBox = document.getElementById("result");
  resultBox.className = "result success";

  let html = `<div class="result-card"><h3>✅ Lookup Result</h3>`;

  const cleanData = flattenObject(data);

  Object.keys(cleanData).forEach((key) => {
    html += `
      <div class="result-row">
        <div class="label">${formatKey(key)}</div>
        <div class="value">${cleanData[key]}</div>
      </div>
    `;
  });

  html += `</div>`;
  resultBox.innerHTML = html;
}

function showError(message) {
  const resultBox = document.getElementById("result");
  resultBox.className = "result error";
  resultBox.innerText = "❌ " + message;
}

function formatKey(key) {
  return key.replaceAll("_", " ").replaceAll(".", " ").toUpperCase();
}

function flattenObject(obj, prefix = "") {
  let result = {};

  for (const key in obj) {
    const value = obj[key];
    const newKey = prefix ? prefix + "." + key : key;

    if (value && typeof value === "object" && !Array.isArray(value)) {
      Object.assign(result, flattenObject(value, newKey));
    } else {
      result[newKey] = Array.isArray(value) ? value.join(", ") : value;
    }
  }

  return result;
}
