export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  
  const { number } = req.query;

  if (!number) {
    return res.status(400).json({ error: "Number is required" });
  }

  return res.status(200).json({
    success: false,
    error: "We are sorry, this service is temporarily unavailable."
  });
}
