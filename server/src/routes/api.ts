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

// Save endpoint (stub)
router.post('/save', (req: Request, res: Response) => {
  try {
    // TODO: Implement actual save logic (e.g., to database or Google Sheets)
    const { content } = req.body;
    
    console.log('Save request received:', { contentLength: content?.length || 0 });
    
    // Return success
    res.json({ saved: true });
  } catch (error) {
    console.error('Error saving:', error);
    res.status(500).json({
      error: 'An unexpected error occurred while saving'
    });
  }
});

export default router;
