import { Router, Request, Response } from 'express';
import { generateMockText, FormData } from '../utils/mockGenerator';

const router = Router();

// Health check endpoint
router.get('/health', (req: Request, res: Response) => {
  res.json({ ok: true });
});

// Generate content endpoint
router.post('/generate', (req: Request, res: Response) => {
  try {
    const formData: FormData = req.body;

    // Validate required fields
    if (!formData.topic || !formData.input) {
      return res.status(400).json({
        error: 'Topic and Input are required fields'
      });
    }

    // Validate tone
    const validTones = ['Friendly', 'Professional', 'Direct'];
    if (!validTones.includes(formData.tone)) {
      return res.status(400).json({
        error: 'Invalid tone. Must be Friendly, Professional, or Direct'
      });
    }

    // Validate output length
    const validLengths = ['Short', 'Medium', 'Long'];
    if (!validLengths.includes(formData.outputLength)) {
      return res.status(400).json({
        error: 'Invalid output length. Must be Short, Medium, or Long'
      });
    }

    // Generate mock text
    const generatedText = generateMockText(formData);

    // Simulate slight delay for realism
    setTimeout(() => {
      res.json({ output: generatedText });
    }, 300);
  } catch (error) {
    console.error('Error generating text:', error);
    res.status(500).json({
      error: 'An unexpected error occurred while generating text'
    });
  }
});

// Save endpoint 
router.post("/save", async (req, res) => {
  try {
    const {
      topic = "",
      tone = "",
      outputLength = "",
      input = "",
      output = "",
      notes = "",
      source = "Workspace Generator",
    } = req.body ?? {};

    const runId =
      (globalThis.crypto as any)?.randomUUID?.() ??
      `run_${Date.now()}_${Math.random().toString(16).slice(2)}`;

    const timestamp = new Date().toISOString();

    // A–I columns for: RunID, Timestamp, Topic, Tone, Length, Input, Output, Notes, Source
    const row = [runId, timestamp, topic, tone, outputLength, input, output, notes, source];

    const picaSecret = process.env.PICA_SECRET_KEY;
    const connectionKey = process.env.PICA_SHEETS_CONNECTION_KEY;
    const actionId = process.env.PICA_SHEETS_APPEND_ACTION_ID;
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    const range = process.env.GOOGLE_SHEETS_RANGE;

    if (!picaSecret || !connectionKey || !actionId || !spreadsheetId || !range) {
      return res.status(500).json({
        saved: false,
        error:
          "Missing env vars. Need: PICA_SECRET_KEY, PICA_SHEETS_CONNECTION_KEY, PICA_SHEETS_APPEND_ACTION_ID, GOOGLE_SHEETS_SPREADSHEET_ID, GOOGLE_SHEETS_RANGE",
      });
    }

    // Passthrough base URL: https://api.picaos.com/v1/passthrough/{path}
    // {path} is the underlying third-party API endpoint path (Google Sheets v4 append). :contentReference[oaicite:0]{index=0}
    const encodedRange = encodeURIComponent(range).replace(/'/g, "%27");
    const path =
      `v4/spreadsheets/${spreadsheetId}/values/${encodedRange}:append` +
      `?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;

    const url = `https://api.picaos.com/v1/passthrough/${path}`;

    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-pica-secret": picaSecret,
        "x-pica-connection-key": connectionKey,
        "x-pica-action-id": actionId,
      },
      body: JSON.stringify({
        majorDimension: "ROWS",
        values: [row],
      }),
    });

    if (!resp.ok) {
      const details = await resp.text();
      return res.status(500).json({
        saved: false,
        error: `Pica passthrough failed: ${resp.status} ${resp.statusText}`,
        details,
      });
    }

    const data = await resp.json();
    return res.json({ saved: true, runId, apiResponse: data });
  } catch (err: any) {
    return res.status(500).json({ saved: false, error: err?.message ?? String(err) });
  }
});

export default router;
