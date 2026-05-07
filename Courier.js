export default async function handler(req, res) {
  const { phone, number } = req.query;
  const inputPhone = phone || number;

  if (!inputPhone) {
    return res.status(400).json({
      success: false,
      message: "Phone number is required"
    });
  }

  try {
    const response = await fetch(
      `${process.env.COURIER_API_URL}?phone_number=${encodeURIComponent(inputPhone)}`,
      {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${process.env.COURIER_API_KEY}`,
          "api-key": process.env.COURIER_API_KEY,
          "api_key": process.env.COURIER_API_KEY
        }
      }
    );

    const data = await response.json();

    return res.status(200).json({
      success: true,
      raw: data
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Courier API failed",
      details: error.message
    });
  }
}
