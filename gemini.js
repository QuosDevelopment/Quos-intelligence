const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

class Gemini {
  async think(prompt) {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return {
      content: text,
      needsSearch: text.includes('search') || text.includes('google'),
      needsBuild: text.includes('build') || text.includes('create'),
      query: text.match(/search for (.+)/i)?.[1] || '',
      projectName: text.match(/build (.+)/i)?.[1] || '',
      code: text,
      response: text
    };
  }
}

module.exports = Gemini;