import { Mail, FileText, Share2 } from 'lucide-react';
import { presets } from '../utils/presets';
import { PresetConfig } from '../lib/types';

interface PresetButtonsProps {
  onPresetClick: (preset: PresetConfig) => void;
  disabled: boolean;
}

const iconMap = {
  Mail: Mail,
  FileText: FileText,
  Share2: Share2,
};

export function PresetButtons({ onPresetClick, disabled }: PresetButtonsProps) {
  return (
    <div className="mb-6">
      <p className="text-sm font-medium text-gray-700 mb-3">Quick Presets</p>
      <div className="flex flex-wrap gap-3">
        {presets.map((preset) => {
          const Icon = iconMap[preset.icon as keyof typeof iconMap];
          return (
            <button
              key={preset.name}
              onClick={() => onPresetClick(preset)}
              disabled={disabled}
              className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:text-gray-700 disabled:hover:bg-white"
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{preset.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
