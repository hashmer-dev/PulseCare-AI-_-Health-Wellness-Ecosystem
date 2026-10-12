import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const port = Number(process.env.PORT) || 3000;

// Initialize GoogleGenAI client server-side using gemini-3.5-flash-lite
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Mock database for specialists
const SPECIALISTS = [
  {
    id: 'spec-1',
    name: 'Dr. Sarah Jenkins, MD',
    specialty: 'Endocrinologist & Diabetes Specialist',
    hospital: 'Metro General Hospital & Wellness Center',
    address: '742 Evergreen Terrace, Suite 300',
    city: 'San Francisco, CA',
    rating: 4.9,
    reviewsCount: 128,
    distance: '1.2 miles away',
    lat: 37.7749,
    lng: -122.4194,
    phone: '(415) 555-0192',
    availability: 'Next available: Tomorrow, 10:00 AM',
    acceptingNewPatients: true,
  },
  {
    id: 'spec-2',
    name: 'Dr. Michael Chen, FACC',
    specialty: 'Cardiologist',
    hospital: 'Bay Area Heart & Vascular Institute',
    address: '1200 Wellness Way, Floor 4',
    city: 'San Francisco, CA',
    rating: 4.8,
    reviewsCount: 94,
    distance: '2.5 miles away',
    lat: 37.7833,
    lng: -122.4167,
    phone: '(415) 555-8831',
    availability: 'Next available: Thursday, 2:15 PM',
    acceptingNewPatients: true,
  },
  {
    id: 'spec-3',
    name: 'Dr. Emily Rodriguez, MD',
    specialty: 'Pulmonologist & Respiratory Specialist',
    hospital: 'Pacific Lung & Allergy Clinic',
    address: '450 Sutter St, Suite 1205',
    city: 'San Francisco, CA',
    rating: 4.9,
    reviewsCount: 156,
    distance: '3.1 miles away',
    lat: 37.7890,
    lng: -122.4080,
    phone: '(415) 555-4490',
    availability: 'Next available: Today, 4:30 PM',
    acceptingNewPatients: true,
  },
  {
    id: 'spec-4',
    name: 'Dr. James Wilson, DO',
    specialty: 'Primary Care & Internal Medicine',
    hospital: 'St. Jude Community Health',
    address: '890 Market Street',
    city: 'San Francisco, CA',
    rating: 4.7,
    reviewsCount: 210,
    distance: '0.8 miles away',
    lat: 37.7850,
    lng: -122.4065,
    phone: '(415) 555-3322',
    availability: 'Next available: Tomorrow, 9:00 AM',
    acceptingNewPatients: true,
  },
  {
    id: 'spec-5',
    name: 'Dr. Priya Patel, MD',
    specialty: 'Endocrinology & Metabolism',
    hospital: 'Bayview Medical Plaza',
    address: '2200 Mission St',
    city: 'San Francisco, CA',
    rating: 4.9,
    reviewsCount: 88,
    distance: '4.0 miles away',
    lat: 37.7599,
    lng: -122.4148,
    phone: '(415) 555-7711',
    availability: 'Next available: Friday, 11:00 AM',
    acceptingNewPatients: false,
  },
];

// API: Symptom Checker & Triage
app.post('/api/symptom-check', async (req, res) => {
  try {
    const { symptoms, age, gender, duration } = req.body;

    if (!symptoms) {
      return res.status(400).json({ error: 'Symptoms description is required.' });
    }

    const prompt = `You are an expert clinical triage AI assistant. Analyze the following patient case and provide a structured medical guidance report, including common medication classes typically prescribed or discussed for these conditions (for informational purposes only).

Patient Details:
- Age: ${age || 'Not specified'}
- Gender: ${gender || 'Not specified'}
- Symptom Duration: ${duration || 'Not specified'}
- Symptoms Description: "${symptoms}"

Provide your assessment in valid JSON format with the following keys:
1. urgencyLevel: string ("Low", "Moderate", "High", "Emergency")
2. potentialConditions: array of objects with keys "name" (string), "matchPercentage" (number 0-100), "description" (string)
3. preliminaryGuidance: array of actionable steps for self-care or monitoring (strings)
4. redFlagsChecked: array of severe red-flag warning signs the user should watch out for (strings)
5. emergencyInstructions: string or null (instructions if urgency is High or Emergency, otherwise encouraging disclaimer)
6. recommendedSpecialty: string (e.g., "Cardiologist", "Primary Care Physician", "Endocrinologist")
7. suggestedMedicines: array of objects with keys "category" (string), "commonDrugs" (array of strings), "purpose" (string)

Ensure the output is strictly valid JSON matching this schema without markdown block wrappers if possible, or standard markdown JSON.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash-lite',
      contents: prompt,
      config: {
        temperature: 0.2,
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '{}';
    let data;
    try {
      const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
      data = JSON.parse(cleaned);
    } catch (e) {
      data = {
        urgencyLevel: 'Moderate',
        potentialConditions: [
          { name: 'General Fatigue / Viral Syndrome', matchPercentage: 75, description: 'Common reaction to stress, lack of sleep, or mild infection.' }
        ],
        preliminaryGuidance: ['Rest adequately', 'Stay hydrated', 'Monitor temperature'],
        redFlagsChecked: ['Persistent high fever > 103°F', 'Severe shortness of breath', 'Chest pain'],
        emergencyInstructions: 'If symptoms worsen rapidly, seek emergency medical attention immediately.',
        recommendedSpecialty: 'Primary Care Physician',
        suggestedMedicines: [
          { category: 'Supportive Care', commonDrugs: ['Over-the-counter analgesics as advised by a pharmacist'], purpose: 'Symptom relief' }
        ]
      };
    }

    res.json(data);
  } catch (error: any) {
    console.error('Symptom check error:', error);
    res.status(500).json({ error: error.message || 'Failed to analyze symptoms.' });
  }
});

// API: Chronic Disease AI Guide
app.post('/api/chronic-advice', async (req, res) => {
  try {
    const { condition } = req.body;
    if (!condition) {
      return res.status(400).json({ error: 'Condition is required.' });
    }

    const prompt = `Provide a comprehensive lifestyle and medical management guide for someone living with "${condition}".
Return as valid JSON with keys:
1. conditionName: string
2. overview: string
3. foodsToAvoid: array of strings
4. recommendedNutrients: array of strings
5. dailyRoutine: array of objects with "time" (string) and "activity" (string)
6. lifestyleTips: array of strings
7. warningSigns: array of strings`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash-lite',
      contents: prompt,
      config: {
        temperature: 0.3,
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '{}';
    const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
    res.json(JSON.parse(cleaned));
  } catch (error: any) {
    console.error('Chronic advice error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate chronic advice.' });
  }
});

// API: AI Diet Plan & Schedule Generator
app.post('/api/diet-plan', async (req, res) => {
  try {
    const { dietaryPreference, calorieTarget, targetLanguage } = req.body;

    const prompt = `Create a complete structured daily diet plan and schedule for someone with dietary preference "${dietaryPreference || 'Balanced'}" and a total daily calorie target of ${calorieTarget || 2000} kcal.

Return strictly as valid JSON with the following structure (translated to ${targetLanguage || 'English'}):
{
  "totalCalories": number,
  "dietaryPreference": string,
  "dailySummary": string,
  "meals": [
    {
      "mealTime": "08:00 AM",
      "mealType": "Breakfast",
      "title": "Recipe Title",
      "calories": number,
      "macros": { "protein": "Xg", "carbs": "Yg", "fats": "Zg" },
      "ingredientsList": ["item 1", "item 2"],
      "stepByStepInstructions": ["step 1", "step 2"]
    },
    {
      "mealTime": "11:00 AM",
      "mealType": "Morning Snack",
      "title": "Snack Title",
      "calories": number,
      "macros": { "protein": "Xg", "carbs": "Yg", "fats": "Zg" },
      "ingredientsList": ["item 1"],
      "stepByStepInstructions": ["step 1"]
    },
    {
      "mealTime": "01:00 PM",
      "mealType": "Lunch",
      "title": "Lunch Title",
      "calories": number,
      "macros": { "protein": "Xg", "carbs": "Yg", "fats": "Zg" },
      "ingredientsList": ["item 1", "item 2"],
      "stepByStepInstructions": ["step 1", "step 2"]
    },
    {
      "mealTime": "04:30 PM",
      "mealType": "Afternoon Snack",
      "title": "Snack Title",
      "calories": number,
      "macros": { "protein": "Xg", "carbs": "Yg", "fats": "Zg" },
      "ingredientsList": ["item 1"],
      "stepByStepInstructions": ["step 1"]
    },
    {
      "mealTime": "07:00 PM",
      "mealType": "Dinner",
      "title": "Dinner Title",
      "calories": number,
      "macros": { "protein": "Xg", "carbs": "Yg", "fats": "Zg" },
      "ingredientsList": ["item 1", "item 2"],
      "stepByStepInstructions": ["step 1", "step 2"]
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash-lite',
      contents: prompt,
      config: {
        temperature: 0.4,
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '{}';
    const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
    res.json(JSON.parse(cleaned));
  } catch (error: any) {
    console.error('AI diet plan error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate diet plan.' });
  }
});

// API: Specialist Directory
app.get('/api/specialists', (req, res) => {
  const { specialty, query } = req.query;
  let results = [...SPECIALISTS];

  if (specialty && specialty !== 'All') {
    results = results.filter(s => s.specialty.toLowerCase().includes(String(specialty).toLowerCase()));
  }

  if (query) {
    const q = String(query).toLowerCase();
    results = results.filter(s => 
      s.name.toLowerCase().includes(q) || 
      s.hospital.toLowerCase().includes(q) || 
      s.specialty.toLowerCase().includes(q) ||
      s.city.toLowerCase().includes(q)
    );
  }

  res.json(results);
});

// API: Real Doctors Search via Google Search Grounding
app.post('/api/real-doctors', async (req, res) => {
  try {
    const { lat, lng, query } = req.body;
    const searchPrompt = `Find 5 real prominent medical doctors, clinics, or hospitals near coordinates (Latitude: ${lat}, Longitude: ${lng})${query ? ` matching specialty "${query}"` : ''}.
Return strictly as a valid JSON array of objects with keys:
- id (string)
- name (string, real physician or hospital name)
- specialty (string)
- hospital (string)
- address (string, real street address)
- city (string)
- rating (number, e.g. 4.8)
- reviewsCount (number)
- distance (string, e.g. "0.8 miles away")
- phone (string)
- availability (string)
- acceptingNewPatients (boolean)
- lat (number)
- lng (number)`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash-lite',
      contents: searchPrompt,
      config: {
        temperature: 0.2,
        responseMimeType: 'application/json',
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || '[]';
    const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleaned);
    res.json(parsed);
  } catch (error: any) {
    console.error('Real doctors search error:', error);
    res.json(SPECIALISTS);
  }
});

// API: Lab Report & Prescription OCR Scanner
app.post('/api/scan-report', async (req, res) => {
  try {
    const { imageBase64, mimeType, targetLanguage } = req.body;
    if (!imageBase64) {
      return res.status(400).json({ error: 'Image data is required.' });
    }

    const imagePart = {
      inlineData: {
        mimeType: mimeType || 'image/jpeg',
        data: imageBase64,
      },
    };

    const prompt = `You are an expert clinical assistant and OCR medical document analyzer. Analyze this uploaded medical image (blood test lab report, X-ray, prescription, or clinical document) and provide a clear, plain-language breakdown in ${targetLanguage || 'English'}.

Return strictly as valid JSON with the following keys (all text translated to ${targetLanguage || 'English'}):
1. documentType: string ("Lab Report", "Prescription", "X-Ray Scan", "Clinical Summary")
2. keyFindings: array of strings (extracted highlights, values, or findings)
3. plainLanguageExplanation: string (easy to understand summary for the patient)
4. actionableNextSteps: array of strings (what the patient should discuss with their doctor)
5. warningFlags: array of strings (any critical anomalies noted)`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash-lite',
      contents: { parts: [imagePart, { text: prompt }] },
      config: {
        temperature: 0.2,
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '{}';
    const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
    res.json(JSON.parse(cleaned));
  } catch (error: any) {
    console.error('Scan report error:', error);
    res.status(500).json({ error: error.message || 'Failed to analyze medical document.' });
  }
});

// Vite middleware in development
if (process.env.NODE_ENV !== 'production') {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  const distPath = path.join(__dirname, 'dist');
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(port, '0.0.0.0', () => {
  console.log(`PulseCare AI Server running on port ${port}`);
});
