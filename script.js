// ===============================
// Number Identity by Alvi
// Final Professional script.js
// Number Lookup + Courier Report
// ===============================

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

async function fetchAPI(endpoint, params) {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`${endpoint}?${query}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.error || "Server error");
  }

  if (data.error || data.status === "error" || data.code === "INVALID_KEY") {
    throw new Error(data.message || data.error || "API error");
  }

  return data;
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

// ===============================
// NUMBER LOOKUP
// ===============================

async function lookupNumber() {
  const number = getNumber();

  if (!number) {
    showError("দয়া করে একটি মোবাইল নাম্বার লিখুন।");
    return;
  }

  showLoading();

  try {
    const data = await fetchAPI("/api/lookup", { number });
    hideLoading();
    showNumberResult(data);
  } catch (error) {
    hideLoading();
    showError(error.message || "Number lookup failed.");
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
      <h3>✅ Number Identity Result</h3>

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

// ===============================
// COURIER REPORT
// ===============================

async function checkCourier() {
  const number = getNumber();

  if (!number) {
    showError("দয়া করে একটি মোবাইল নাম্বার লিখুন।");
    return;
  }

  showLoading();

  try {
    const data = await fetchAPI("/api/courier", { number });
    hideLoading();
    showCourierReport(data, number);
  } catch (error) {
    hideLoading();
    showError(error.message || "Courier report আনতে সমস্যা হয়েছে।");
  }
}

function showCourierReport(data, number) {
  const resultBox = DOM.result();
  resultBox.className = "result";

  const info = data.data || data.result || data;

  const total = Number(pick(info, [
    "total_parcel",
    "total",
    "total_order",
    "orders",
    "total_orders",
    "totalDelivery"
  ], 0));

  const delivered = Number(pick(info, [
    "success_parcel",
    "success",
    "delivered",
    "delivery",
    "successful",
    "completed"
  ], 0));

  const cancelled = Number(pick(info, [
    "cancelled_parcel",
    "cancel",
    "cancelled",
    "returned",
    "return",
    "failed"
  ], 0));

  const successRate = total > 0 ? Math.round((delivered / total) * 100) : 0;

  let statusText = "⚠️ ঝুঁকিপূর্ণ কাস্টমার";
  let statusColor = "#ef4444";

  if (successRate >= 80) {
    statusText = "✅ বিশ্বস্ত কাস্টমার";
    statusColor = "#22c55e";
  } else if (successRate >= 50) {
    statusText = "🟡 সতর্ক থাকুন";
    statusColor = "#f59e0b";
  }

  resultBox.innerHTML = `
    <div class="courier-card">
      <h2>📦 Courier Report</h2>

      <div class="rate-circle" style="border-color:${statusColor}; color:${statusColor};">
        ${successRate}%
      </div>

      <p class="rate-label">Success Rate</p>

      <div class="risk-box" style="border-color:${statusColor}; color:${statusColor};">
        ${statusText}
      </div>

      <div class="courier-stats">
        <div>
          <strong>${total}</strong>
          <span>অর্ডার</span>
        </div>

        <div>
          <strong>${delivered}</strong>
          <span>ডেলিভারি</span>
        </div>

        <div>
          <strong>${cancelled}</strong>
          <span>বাতিল</span>
        </div>
      </div>

      <p class="checked-number">Checked: ${escapeHtml(number)}</p>
    </div>
  `;
}
