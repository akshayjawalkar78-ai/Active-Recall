module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { topic } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Gemini API key not configured on server. Please add GEMINI_API_KEY to your Vercel Environment Variables.' });
  }

  if (!topic) {
    return res.status(400).json({ error: 'Topic is required.' });
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Create a concise, high-density study guide for the topic: "${topic}". 
            Focus on core definitions, key principles, and essential facts. 
            The goal is to provide enough detail for a student to perform active recall, but not so much that it's overwhelming.
            Format it as a clean text document with clear headings and bullet points.`
          }]
        }]
      })
    });

    const data = await response.json();
    
    if (data.error) {
      return res.status(response.status || 500).json({ error: data.error.message });
    }

    // Gemini response format: data.candidates[0].content.parts[0].text
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (text) {
      res.status(200).json({ content: [{ text }] });
    } else {
      throw new Error("Invalid response from Gemini API");
    }
  } catch (err) {
    console.error('API Error:', err);
    res.status(500).json({ error: 'Failed to communicate with AI service.' });
  }
};
