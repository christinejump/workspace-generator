import { useState } from 'react';
import { FormSection } from './components/FormSection';
import { PresetButtons } from './components/PresetButtons';
import { ActionButtons } from './components/ActionButtons';
import { ResultsPanel } from './components/ResultsPanel';
import { FormData, UIState, PresetConfig } from './lib/types';
import { generateText } from './lib/api';
import { Zap } from 'lucide-react';

function App() {
  const [formData, setFormData] = useState<FormData>({
    topic: '',
    tone: 'Professional',
    outputLength: 'Medium',
    input: '',
  });

  const [uiState, setUiState] = useState<UIState>('idle');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleFieldChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePresetClick = (preset: PresetConfig) => {
    setFormData((prev) => ({
      ...prev,
      topic: preset.topic,
      input: preset.input,
    }));
  };

  const handleGenerate = async () => {
    if (!formData.topic.trim() || !formData.input.trim()) {
      setUiState('error');
      setError('Please fill in both Topic and Input fields');
      return;
    }

    setUiState('loading');
    setError('');
    setResult('');

    try {
      const response = await generateText(formData);
      setResult(response.output);
      setUiState('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate content');
      setUiState('error');
    }
  };

  const handleSave = () => {
    // Placeholder for future Save to Sheets functionality
  };

  const isGenerateDisabled = !formData.topic.trim() || !formData.input.trim();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Workspace Generator</h1>
          </div>
          <p className="text-gray-600">
            Generate professional content with customizable tone and length
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 mb-6">
          <PresetButtons onPresetClick={handlePresetClick} disabled={uiState === 'loading'} />

          <FormSection
            formData={formData}
            onChange={handleFieldChange}
            disabled={uiState === 'loading'}
          />

          <div className="mt-6">
            <ActionButtons
              onGenerate={handleGenerate}
              onSave={handleSave}
              isGenerateDisabled={isGenerateDisabled}
              isLoading={uiState === 'loading'}
            />
          </div>
        </div>

        <ResultsPanel state={uiState} result={result} error={error} />

        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>Version v0.1 • December 18, 2025</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
