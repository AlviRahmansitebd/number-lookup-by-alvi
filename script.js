async function lookupNumber() {
  const number = document.getElementById("number").value;
  const resultBox = document.getElementById("result");

  if (!number) {
    resultBox.innerText = "Please enter a number";
    return;
  }

  resultBox.innerText = "Searching...";

  try {
    const res = await fetch("/api/lookup?number=" + encodeURIComponent(number));
    const data = await res.json();

    resultBox.innerText = JSON.stringify(data, null, 2);
  } catch (error) {
    resultBox.innerText = "Error: " + error.message;
  }
}
