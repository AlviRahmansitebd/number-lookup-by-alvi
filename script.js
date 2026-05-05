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
