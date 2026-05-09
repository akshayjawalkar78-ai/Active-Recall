module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { topic } = req.body;
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Anthropic API key not configured on server.' });
  }

  if (!topic) {
    return res.status(400).json({ error: 'Topic is required.' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 1000,
        messages: [
          {
            role: 'user',
            content: `Create a concise, high-density study guide for the topic: "${topic}". 
            Focus on core definitions, key principles, and essential facts. 
            Format it as a clean text document with clear headings.`
          }
        ]
      })
    });

    const data = await response.json();
    
    if (data.error) {
      return res.status(response.status).json({ error: data.error.message });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error('API Error:', err);
    res.status(500).json({ error: 'Failed to communicate with AI service.' });
  }
};
