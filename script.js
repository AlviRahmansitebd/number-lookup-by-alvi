async function lookupNumber() {
  const number = document.getElementById("number").value;
  const resultBox = document.getElementById("result");

  if (!number) {
    resultBox.innerText = "Enter a number";
    return;
  }

  resultBox.innerText = "Searching...";

  try {
    const url = `https://api.lookupnow.top/api/v1/query.php?key=pk_live_22ce832d6208fc1abc9c676bf7709a72e8889c&number=${encodeURIComponent(number)}`;

    const res = await fetch(url);
    const data = await res.json();

    resultBox.innerText = JSON.stringify(data, null, 2);
  } catch (err) {
    resultBox.innerText = "Error: " + err.message;
  }
}
