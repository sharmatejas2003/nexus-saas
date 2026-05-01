const axios = require("axios");

exports.askAI = async (req, res) => {
  try {
    const { message, context } = req.body;
    
    const systemInstruction = `You are the AI Assistant for "Nexus SaaS". Provide a numbered list of 5 task titles only. No conversational filler.`;
    
    const fullPrompt = context 
      ? `Project: "${context}"\nRequest: ${message}`
      : `Request: ${message}`;

    //Gemini 1.5 Flash
    const response = await axios.post(
      `[https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=$](https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=$){process.env.GEMINI_API_KEY}`,
      { 
        contents: [{ parts: [{ text: `${systemInstruction}\n\n${fullPrompt}` }] }],
        safetySettings: [
          { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
          { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
          { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
          { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" }
        ]
      }
    );

    const reply = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
    res.json({ reply });
  } catch (err) {
    console.error("GOOGLE API ERROR:", err.response?.data || err.message);
    
    if (err.response?.status === 429) {
      return res.status(429).json({ error: "Rate limit hit. Wait 60 seconds." });
    }
    res.status(500).json({ error: "AI failed to connect" });
  }
};