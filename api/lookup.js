export default async function handler(req, res) {
  const { number } = req.query;

  if (!number) {
    return res.status(400).json({ error: "Number is required" });
  }

  try {
    // Prefix দিয়ে operator বের করা
    const cleaned = number.replace(/\D/g, "");
    const prefix = cleaned.substring(0, 3);

    const operators = {
      "017": "Grameenphone (GP)",
      "013": "Grameenphone (GP)",
      "018": "Robi",
      "016": "Airtel",
      "019": "Banglalink",
      "014": "Banglalink",
      "015": "Teletalk"
    };

    const carrier = operators[prefix] || "Unknown";

    if (!operators[prefix]) {
      return res.status(200).json({
        success: false,
        error: "Invalid BD number"
      });
    }

    return res.status(200).json({
      success: true,
      number: cleaned,
      carrier: carrier,
      location: "Bangladesh",
      type: "Mobile",
      international_format: "+880" + cleaned.substring(1)
    });

  } catch (error) {
    return res.status(500).json({
      error: "Lookup failed",
      details: error.message
    });
  }
}
