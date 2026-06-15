const DOM = {
  number: () => document.getElementById("number"),
  result: () => document.getElementById("result"),
  loading: () => document.getElementById("loading")
};

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
  const number = DOM.number().value.trim();

  if (!number) {
    showError("দয়া করে একটি মোবাইল নাম্বার লিখুন।");
    return;
  }

  DOM.result().className = "result hidden";
  DOM.result().innerHTML = "";
  DOM.loading().classList.remove("hidden");

  try {
const response = await fetch(`https://www.numberlookup.top/api/lookup?number=${encodeURIComponent(number)}`);

    DOM.loading().classList.add("hidden");

    if (!response.ok || data.error || data.status === "error" || data.code === "INVALID_KEY") {
      showError(data.message || data.error || "Lookup failed.");
      return;
    }

    showNumberResult(data);
  } catch (error) {
    DOM.loading().classList.add("hidden");
    showError("Server error. Please try again.");
  }
}

function showNumberResult(data) {
  const resultBox = DOM.result();
  resultBox.className = "result success";

  const info = data.data || data.result || data;

  const name = pick(info, ["name", "NAME", "full_name", "fullname"], "Not Found");
  const phone = pick(info, ["number", "phone", "mobile", "international_format"], "N/A");
  const country = pick(info, ["country", "country_name", "location"], "N/A");
  const carrier = pick(info, ["carrier", "operator", "sim", "network"], "N/A");
  const type = pick(info, ["type", "line_type", "phone_type"], "Unknown");

  resultBox.innerHTML = `
    <div class="result-card">
      <h3>✅ Lookup Result</h3>

      <div class="result-row">
        <div class="label">Name</div>
        <div class="value">${escapeHtml(name)}</div>
      </div>

      <div class="result-row">
        <div class="label">Number</div>
        <div class="value">${escapeHtml(phone)}</div>
      </div>

      <div class="result-row">
        <div class="label">Country / Location</div>
        <div class="value">${escapeHtml(country)}</div>
      </div>

      <div class="result-row">
        <div class="label">Carrier / Operator</div>
        <div class="value">${escapeHtml(carrier)}</div>
      </div>

      <div class="result-row">
        <div class="label">Type</div>
        <div class="value">${escapeHtml(type)}</div>
      </div>
    </div>
  `;
}
