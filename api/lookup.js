export default async function handler(req, res) {
  const { number } = req.query;

  if (!number) {
    return res.status(400).json({ error: "Number is required" });
  }

  try {
    const url = `https://www.numberlookup.top/api/lookup?number=${number}`;
    const response = await fetch(url);
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      error: "Lookup failed",
      details: error.message
    });
  }
}
