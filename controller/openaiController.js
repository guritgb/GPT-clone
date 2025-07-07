const dotenv = require("dotenv");
dotenv.config();

const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

// Summary Controller
exports.summaryController = async (req, res) => {
  try {
    const { text } = req.body;
    const response = await openai.completions.create({
      model: "gpt-3.5-turbo",
      prompt: `Summarize this \n${text}`,
      max_tokens: 500,
      temperature: 0.5,
    });

    if (response.choices[0]?.text) {
      return res.status(200).json(response.choices[0].text);
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: err.message });
  }
};

// Paragraph Controller
exports.paragraphController = async (req, res) => {
  try {
    const { text } = req.body;
    const response = await openai.completions.create({
      model: "gpt-3.5-turbo",
      prompt: `Write a detailed paragraph about \n${text}`,
      max_tokens: 500,
      temperature: 0.5,
    });

    if (response.choices[0]?.text) {
      return res.status(200).json(response.choices[0].text);
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: err.message });
  }
};

// Chatbot Controller
exports.chatbotController = async (req, res) => {
  try {
    const { text } = req.body;
    const response = await openai.completions.create({
      model: "gpt-3.5-turbo",
      prompt: `Answer question similar to how Yoda from Star Wars would.
      Me: 'what is your name?'
      Yoda: 'Yoda is my name'
      Me: ${text}`,
      max_tokens: 300,
      temperature: 0.7,
    });

    if (response.choices[0]?.text) {
      return res.status(200).json(response.choices[0].text);
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: err.message });
  }
};

// JS Converter Controller
exports.jsconverterController = async (req, res) => {
  try {
    const { text } = req.body;
    const response = await openai.completions.create({
      model: "gpt-3.5-turbo",
      prompt: `/* convert these instructions into JavaScript code \n${text}`,
      max_tokens: 400,
      temperature: 0.25,
    });

    if (response.choices[0]?.text) {
      return res.status(200).json(response.choices[0].text);
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: err.message });
  }
};

// Sci-Fi Image Controller
exports.scifiImageController = async (req, res) => {
  try {
    const { text } = req.body;
    const response = await openai.images.generate({
      prompt: `Generate a sci-fi image of ${text}`,
      n: 1,
      size: "512x512",
    });

    if (response.data[0]?.url) {
      return res.status(200).json(response.data[0].url);
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: err.message });
  }
};
