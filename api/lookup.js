export default async function handler(req, res) {
  const { number } = req.query;

  if (!number) {
    return res.status(400).json({ error: "Number is required" });
  }

  try {
    const apiUrl = `${process.env.LOOKUP_API_URL}?key=${process.env.LOOKUP_API_KEY}&number=${encodeURIComponent(number)}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      error: "Lookup failed",
      details: error.message
    });
  }
}
