import { Sparkles, Sheet } from 'lucide-react';

interface ActionButtonsProps {
  onGenerate: () => void;
  onSave: () => void;
  isGenerateDisabled: boolean;
  isLoading: boolean;
  isSaveDisabled?: boolean;
}

export function ActionButtons({
  onGenerate,
  onSave,
  isGenerateDisabled,
  isLoading,
  isSaveDisabled = true,
}: ActionButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <button
        onClick={onGenerate}
        disabled={isGenerateDisabled || isLoading}
        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
      >
        <Sparkles className="w-5 h-5" />
        {isLoading ? 'Generating...' : 'Generate'}
      </button>

      <button
        onClick={onSave}
        disabled={isSaveDisabled}
        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors font-medium"
        title={isSaveDisabled ? 'Generate content first' : 'Save to sheets'}
      >
        <Sheet className="w-5 h-5" />
        Save to Sheets
      </button>
    </div>
  );
}
