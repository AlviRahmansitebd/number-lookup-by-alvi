export default async function handler(req, res) {
  const { phone } = req.query;

  if (!phone) {
    return res.status(400).json({
      success: false,
      message: "Phone number is required"
    });
  }

  try {
    const url = `${process.env.COURIER_API_URL}?phone_number=${encodeURIComponent(phone)}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "api_key": process.env.COURIER_API_KEY
      }
    });

    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Courier lookup failed",
      details: error.message
    });
  }
}
