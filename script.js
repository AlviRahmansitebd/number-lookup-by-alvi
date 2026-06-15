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
    showError("Please enter a mobile number.");
    return;
  }

  DOM.result().className = "result hidden";
  DOM.result().innerHTML = "";
  DOM.loading().classList.remove("hidden");

  try {
    const response = await fetch(`/api/lookup?number=${encodeURIComponent(number)}`);
    const data = await response.json();

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
}  display: flex;
  align-items: center;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(0, 255, 150, 0.3);
  border-radius: 14px;
  padding: 0 14px;
}

.input-icon {
  font-size: 20px;
  margin-right: 10px;
}

input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #fff;
  font-size: 15px;
  padding: 14px 0;
}

input::placeholder {
  color: #64748b;
}

button {
  background: linear-gradient(135deg, #00c97a, #00ff96);
  color: #0a0f1e;
  border: none;
  border-radius: 14px;
  padding: 16px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  width: 100%;
  letter-spacing: 0.5px;
}

button:active {
  opacity: 0.85;
}

/* LOADING */
.loading {
  text-align: center;
  color: #00ff96;
  font-size: 14px;
  padding: 10px;
}

.hidden {
  display: none;
}

/* RESULT */
.result {
  border-radius: 14px;
  padding: 16px;
  font-size: 14px;
}

.result.error {
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.4);
  color: #fca5a5;
}

.result.success {
  background: rgba(0, 255, 150, 0.08);
  border: 1px solid rgba(0, 255, 150, 0.3);
}

.result-card h3 {
  color: #00ff96;
  margin-bottom: 12px;
  font-size: 16px;
}

.result-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255,255,255,0.07);
}

.result-row:last-child {
  border-bottom: none;
}

.label {
  color: #94a3b8;
  font-size: 13px;
}

.value {
  color: #fff;
  font-weight: 600;
  font-size: 13px;
}

/* WHY SECTION */
.why-section {
  margin-bottom: 24px;
}

.why-section h2 {
  text-align: center;
  font-size: 20px;
  margin-bottom: 16px;
  color: #fff;
}

.feature-row {
  display: flex;
  gap: 10px;
}

.feature-card {
  flex: 1;
  background: rgba(0, 255, 150, 0.05);
  border: 1px solid rgba(0, 255, 150, 0.2);
  border-radius: 16px;
  padding: 16px 10px;
  text-align: center;
}

.feature-card span {
  font-size: 28px;
  display: block;
  margin-bottom: 8px;
  color: #00ff96;
}

.feature-card h3 {
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 6px;
  color: #fff;
}

.feature-card p {
  font-size: 11px;
  color: #94a3b8;
  line-height: 1.5;
}

/* FOOTER */
footer {
  text-align: center;
  color: #64748b;
  font-size: 12px;
  padding-top: 10px;
}

.green {
  color: #00ff96;
  font-weight: 700;
}
