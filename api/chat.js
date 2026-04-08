export default async function handler(req, res) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const { prompt, requireJson } = req.body;

    if (!apiKey) return res.status(500).json({ error: "Missing API Key" });
    if (!prompt) return res.status(400).json({ error: "No prompt provided" });

    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    // Standard payload
    const payload = {
      contents: [{ parts: [{ text: prompt }] }]
    };

    // If the frontend requests JSON, enforce it so the AI doesn't output markdown wrappers.
    // This protects your game from parsing errors while keeping standard chat normal.
    if (requireJson) {
      payload.generationConfig = {
        responseMimeType: "application/json",
      };
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ 
        error: data.error?.message || "Google API Error" 
      });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Server Crash: " + error.message });
  }
}
