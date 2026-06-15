export default async function handler(req, res) {
  const { number } = req.query;

  if (!number) {
    return res.status(400).json({ error: "Number is required" });
  }

  const cleaned = number.replace(/\D/g, "");

  if (cleaned.length !== 11 || !cleaned.startsWith("0")) {
    return res.status(200).json({
      success: false,
      error: "Invalid BD number. Must be 11 digits starting with 0."
    });
  }

  const prefixMap = {
    "013": { carrier: "Grameenphone (GP)", code: "GP" },
    "017": { carrier: "Grameenphone (GP)", code: "GP" },
    "018": { carrier: "Robi Axiata", code: "Robi" },
    "016": { carrier: "Airtel Bangladesh", code: "Airtel" },
    "019": { carrier: "Banglalink", code: "BL" },
    "014": { carrier: "Banglalink", code: "BL" },
    "015": { carrier: "Teletalk", code: "TT" }
  };

  const prefix = cleaned.substring(0, 3);
  const info = prefixMap[prefix];

  if (!info) {
    return res.status(200).json({
      success: false,
      error: "Unrecognized Bangladesh number prefix."
    });
  }

  return res.status(200).json({
    success: true,
    number: cleaned,
    carrier: info.carrier,
    carrier_code: info.code,
    location: "Bangladesh",
    type: "Mobile",
    international_format: "+880" + cleaned.substring(1)
  });
}
