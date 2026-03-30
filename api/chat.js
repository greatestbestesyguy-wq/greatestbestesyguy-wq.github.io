export default async function handler(req, res) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const { prompt } = req.body;

    if (!apiKey) return res.status(500).json({ error: "Missing API Key" });
    if (!prompt) return res.status(400).json({ error: "No prompt provided" });

    // UPDATE: Using the exact string confirmed by your ListModels call
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

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
