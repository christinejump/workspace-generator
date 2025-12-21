import { CheckCircle2, AlertCircle, FileText } from 'lucide-react';
import { UIState } from '../lib/types';
import { LoadingSpinner } from './LoadingSpinner';

interface ResultsPanelProps {
  state: UIState;
  result: string;
  error: string;
}

export function ResultsPanel({ state, result, error }: ResultsPanelProps) {
  if (state === 'idle') {
    return (
      <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">Your generated content will appear here</p>
        <p className="text-gray-400 text-sm mt-2">Fill out the form and click Generate to start</p>
      </div>
    );
  }

  if (state === 'loading') {
    return (
      <div className="bg-white border border-gray-300 rounded-lg p-12">
        <LoadingSpinner />
        <p className="text-center text-gray-600 mt-4">Generating your content...</p>
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-red-900 font-semibold mb-1">Error</h3>
            <p className="text-red-700">{error || 'An unexpected error occurred'}</p>
          </div>
        </div>
      </div>
    );
  }

  if (state === 'success') {
    return (
      <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
        <div className="bg-green-50 border-b border-green-200 px-6 py-3 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          <h3 className="text-green-900 font-semibold">Generated Content</h3>
        </div>
        <div className="p-6">
          <div className="prose max-w-none">
            {result.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-gray-700 leading-relaxed mb-4 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
