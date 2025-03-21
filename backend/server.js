require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const multer = require('multer');
const { createWorker } = require('tesseract.js');

const app = express();
const upload = multer({ dest: 'uploads/' });

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB database'))
  .catch(err => console.error('MongoDB connection error:', err));

// Initialize OCR Worker
const initializeOCR = async () => {
  const worker = await createWorker();
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  return worker;
};

// Function to Analyze Extracted Text
const analyzeHealthReport = (text) => {
  const metrics = {};

  // Extract MCH (Mean Corpuscular Hemoglobin)
  const mchMatch = text.match(/MCH\s*(\d+\.\d+)/i);
  if (mchMatch) {
    metrics.mch = parseFloat(mchMatch[1]);
  }

  // Extract MCHC (Mean Corpuscular Hemoglobin Concentration)
  const mchcMatch = text.match(/MCHC\s*(\d+\.\d+)/i);
  if (mchcMatch) {
    metrics.mchc = parseFloat(mchcMatch[1]);
  }

  // Extract RDW (Red Cell Distribution Width)
  const rdwMatch = text.match(/RDW\s*(\d+\.\d+)/i);
  if (rdwMatch) {
    metrics.rdw = parseFloat(rdwMatch[1]);
  }

  // Extract WBC Count (White Blood Cell Count)
  const wbcMatch = text.match(/Total WBC count\s*(\d+)/i);
  if (wbcMatch) {
    metrics.wbc = parseInt(wbcMatch[1]);
  }

  // Extract Platelet Count
  const plateletMatch = text.match(/Platelet Count\s*(\d+)/i);
  if (plateletMatch) {
    metrics.platelet = parseInt(plateletMatch[1]);
  }

  return metrics;
};

// Function to Generate Recommendations
const generateRecommendations = async (metrics) => {
  try {
    const prompt = `Based on the following health metrics, provide recommendations: ${JSON.stringify(metrics)}`;
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const response = await axios.post(endpoint, {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000,
      },
    });

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return 'Unable to generate recommendations at this time.';
  }
};

// Health Report Endpoint
app.post('/api/upload-health-report', upload.single('image'), async (req, res) => {
  try {
    const { path } = req.file;

    // Initialize OCR Worker
    const worker = await initializeOCR();

    // Perform OCR
    const { data: { text } } = await worker.recognize(path);

    console.log('Extracted Text:', text); // Debug OCR output

    // Analyze Extracted Text
    const healthMetrics = analyzeHealthReport(text);

    console.log('Health Metrics:', healthMetrics); // Debug parsed metrics

    // Generate Recommendations
    const recommendations = await generateRecommendations(healthMetrics);

    res.json({
      message: 'Health report processed successfully',
      text,
      healthMetrics,
      recommendations,
    });

    // Terminate the worker after use
    await worker.terminate();
  } catch (error) {
    console.error('Error processing health report:', error);
    res.status(500).json({ error: 'Error processing health report' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});