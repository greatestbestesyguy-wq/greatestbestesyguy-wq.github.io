export default async function handler(req, res) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const { prompt, stream } = req.body; // Added 'stream' toggle

    if (!apiKey) return res.status(500).json({ error: "Missing API Key" });
    if (!prompt) return res.status(400).json({ error: "No prompt provided" });

    // 1. Determine the mode based on the request body
    const mode = stream ? 'streamGenerateContent?alt=sse' : 'generateContent';
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:${mode}&key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    if (stream) {
      // 2. Handle Streaming (for the Image Generator)
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      response.body.pipe(res);
    } else {
      // 3. Handle Standard JSON (for your other existing pages)
      const data = await response.json();
      res.status(response.status).json(data);
    }

  } catch (error) {
    res.status(500).json({ error: "Server Error: " + error.message });
  }
}
