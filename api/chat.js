export default async function handler(req, res) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const { prompt } = req.body;

    if (!apiKey) return res.status(500).json({ error: "Missing GEMINI_API_KEY" });
    if (!prompt) return res.status(400).json({ error: "No prompt provided" });

    // FIX 1: Using the 2026 stable "latest" alias for the free tier
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash-latest:generateContent?key=${apiKey}`;

    // FIX 2: Added the missing "fetch(" opening and assigned it to a variable
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
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
