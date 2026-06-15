export default async function handler(req, res) {
  const { number } = req.query;

  if (!number) {
    return res.status(400).json({ error: "Number is required" });
  }

  try {
    const response = await fetch(
      `https://www.numberlookup.top/?number=${number}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.5",
          "Referer": "https://www.numberlookup.top/"
        }
      }
    );

    const html = await response.text();

    // HTML থেকে operator বের করা
    const carrierMatch = html.match(/Grameenphone|Robi|Banglalink|Airtel|Teletalk/i);
    const carrier = carrierMatch ? carrierMatch[0] : "Unknown";

    const cleaned = number.replace(/\D/g, "");

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
