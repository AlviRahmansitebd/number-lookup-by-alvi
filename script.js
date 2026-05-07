async function lookupNumber() {
  const number = document.getElementById("number").value.trim();
  const resultBox = document.getElementById("result");
  const loading = document.getElementById("loading");

  resultBox.className = "result hidden";
  resultBox.innerHTML = "";

  if (!number) {
    showError("মোবাইল নাম্বার লিখুন।");
    return;
  }

  loading.classList.remove("hidden");

  try {
    const res = await fetch("/api/lookup?number=" + encodeURIComponent(number));
    const data = await res.json();

    loading.classList.add("hidden");

    if (data.error || data.status === "error" || data.code === "INVALID_KEY") {
      showError(data.message || data.error || "Lookup failed.");
      return;
    }

    showResult(data);
  } catch (error) {
    loading.classList.add("hidden");
    showError("Server error. Please try again.");
  }
}

function showResult(data) {
  const resultBox = document.getElementById("result");
  resultBox.className = "result success";

  const info = data.data || data.result || data;

  const name = info.name || info.NAME || info.full_name || "Not Found";
  const number = info.number || info.phone || info.mobile || info.international_format || "N/A";
  const country = info.country || info.country_name || "N/A";
  const carrier = info.carrier || info.operator || "N/A";
  const type = info.type || info.line_type || "Unknown";

  resultBox.innerHTML = `
    <div class="result-card">
      <h3>✅ Lookup Result</h3>

      <div class="result-row">
        <div class="label">Name</div>
        <div class="value">${name}</div>
      </div>

      <div class="result-row">
        <div class="label">Number</div>
        <div class="value">${number}</div>
      </div>

      <div class="result-row">
        <div class="label">Country</div>
        <div class="value">${country}</div>
      </div>

      <div class="result-row">
        <div class="label">Carrier</div>
        <div class="value">${carrier}</div>
      </div>

      <div class="result-row">
        <div class="label">Type</div>
        <div class="value">${type}</div>
      </div>
    </div>
  `;
}

function showError(message) {
  const resultBox = document.getElementById("result");
  resultBox.className = "result error";
  resultBox.innerText = "❌ " + message;
}
async function checkCourier() {
  const number = document.getElementById("number").value.trim();
  const resultBox = document.getElementById("result");
  const loading = document.getElementById("loading");

  if (!number) {
    showError("দয়া করে একটি মোবাইল নাম্বার লিখুন।");
    return;
  }

  resultBox.className = "result hidden";
  resultBox.innerHTML = "";
  loading.classList.remove("hidden");

  try {
    const res = await fetch(`/api/courier?phone=${encodeURIComponent(number)}`);
    const data = await res.json();

    loading.classList.add("hidden");
    showCourierReport(data, number);
  } catch (error) {
    loading.classList.add("hidden");
    showError("Courier report আনতে সমস্যা হয়েছে।");
  }
}

function showCourierReport(data, phone) {
  const resultBox = document.getElementById("result");
  resultBox.className = "result";

  const info = data.data || data.result || data;

  const total =
    info.total_parcel ||
    info.total ||
    info.total_order ||
    info.orders ||
    0;

  const success =
    info.success_parcel ||
    info.success ||
    info.delivered ||
    info.delivery ||
    0;

  const cancel =
    info.cancelled_parcel ||
    info.cancel ||
    info.cancelled ||
    info.returned ||
    0;

  const successRate = total > 0 ? Math.round((success / total) * 100) : 0;

  let riskText = "সাধারণ রিস্ক";
  if (successRate >= 80) riskText = "ভালো কাস্টমার";
  else if (successRate >= 50) riskText = "সতর্ক থাকুন";
  else riskText = "ঝুঁকিপূর্ণ কাস্টমার";

  resultBox.innerHTML = `
    <div class="courier-card">
      <h2>📦 Courier Report</h2>

      <div class="rate-circle">${successRate}%</div>
      <p class="rate-label">Success Rate</p>

      <div class="risk-box">⚠️ ${riskText}</div>

      <div class="courier-stats">
        <div>
          <strong>${total}</strong>
          <span>অর্ডার</span>
        </div>
        <div>
          <strong>${success}</strong>
          <span>ডেলিভারি</span>
        </div>
        <div>
          <strong>${cancel}</strong>
          <span>বাতিল</span>
        </div>
      </div>

      <p class="checked-number">Checked: ${phone}</p>
    </div>
  `;
}
