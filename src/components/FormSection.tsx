import { FormData, Tone, OutputLength } from '../lib/types';

interface FormSectionProps {
  formData: FormData;
  onChange: (field: keyof FormData, value: string) => void;
  disabled: boolean;
}

const toneOptions: Tone[] = ['Friendly', 'Professional', 'Direct'];
const lengthOptions: OutputLength[] = ['Short', 'Medium', 'Long'];

export function FormSection({ formData, onChange, disabled }: FormSectionProps) {
  return (
    <div className="space-y-5">
      <div>
        <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1.5">
          Topic
        </label>
        <input
          id="topic"
          type="text"
          value={formData.topic}
          onChange={(e) => onChange('topic', e.target.value)}
          disabled={disabled}
          placeholder="Enter your topic..."
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="tone" className="block text-sm font-medium text-gray-700 mb-1.5">
            Tone
          </label>
          <select
            id="tone"
            value={formData.tone}
            onChange={(e) => onChange('tone', e.target.value as Tone)}
            disabled={disabled}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors bg-white"
          >
            {toneOptions.map((tone) => (
              <option key={tone} value={tone}>
                {tone}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="length" className="block text-sm font-medium text-gray-700 mb-1.5">
            Output Length
          </label>
          <select
            id="length"
            value={formData.outputLength}
            onChange={(e) => onChange('outputLength', e.target.value as OutputLength)}
            disabled={disabled}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors bg-white"
          >
            {lengthOptions.map((length) => (
              <option key={length} value={length}>
                {length}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="input" className="block text-sm font-medium text-gray-700 mb-1.5">
          Input
        </label>
        <textarea
          id="input"
          value={formData.input}
          onChange={(e) => onChange('input', e.target.value)}
          disabled={disabled}
          placeholder="Enter your input text..."
          rows={6}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors resize-none"
        />
      </div>
    </div>
  );
}
