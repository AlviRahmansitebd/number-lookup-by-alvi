function showResult(data) {
  const resultBox = document.getElementById("result");
  resultBox.className = "result success";

  const info = data.data || {};

  let html = `
    <div class="result-card">
      <h3>✅ Lookup Result</h3>

      <div class="result-row">
        <div class="label">Name</div>
        <div class="value">${info.name || "Not Found"}</div>
      </div>

      <div class="result-row">
        <div class="label">Number</div>
        <div class="value">${info.number || "N/A"}</div>
      </div>

      <div class="result-row">
        <div class="label">Country</div>
        <div class="value">${info.country || "N/A"}</div>
      </div>

      <div class="result-row">
        <div class="label">Carrier</div>
        <div class="value">${info.carrier || "N/A"}</div>
      </div>

      <div class="result-row">
        <div class="label">Type</div>
        <div class="value">${info.type || "Unknown"}</div>
      </div>
    </div>
  `;

  resultBox.innerHTML = html;
}
