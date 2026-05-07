export default async function handler(req, res) {
  const { phone, number } = req.query;
  const inputPhone = phone || number;

  if (!inputPhone) {
    return res.status(400).json({
      status: "error",
      message: "Phone number is required"
    });
  }

  try {
    const response = await fetch(
      `https://api.bdcourier.com/courier-check?phone=${encodeURIComponent(inputPhone)}`,
      {
        method: "GET",
        headers: {
          "api-key": process.env.COURIER_API_KEY
        }
      }
    );

    const data = await response.json();

    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Courier API failed",
      details: error.message
    });
  }
}
