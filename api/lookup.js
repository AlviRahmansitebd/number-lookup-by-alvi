export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const { number } = req.query;

  if (!number) {
    return res.status(400).json({ error: "Number is required" });
  }

  try {
    const url = `${process.env.LOOKUP_API_URL}?number=${number}&key=${process.env.LOOKUP_API_KEY}`;

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
