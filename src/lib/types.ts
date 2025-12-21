export type Tone = 'Friendly' | 'Professional' | 'Direct';
export type OutputLength = 'Short' | 'Medium' | 'Long';

export interface FormData {
  topic: string;
  tone: Tone;
  outputLength: OutputLength;
  input: string;
}

export interface PresetConfig {
  name: string;
  topic: string;
  input: string;
  icon: string;
}

export interface GenerateResponse {
  output: string;
}

export type UIState = 'idle' | 'loading' | 'success' | 'error';
