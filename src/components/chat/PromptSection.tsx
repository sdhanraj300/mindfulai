import React from 'react'
import { PromptSuggestion } from '../ui/prompt-suggestion'

const promptStarters = [
  "I'm feeling anxious.",
  "I need help with stress management.",
  "Can you guide me through a meditation?",
  "I'm having trouble sleeping.",
  "How can I practice mindfulness?",
  "I'm feeling overwhelmed.",
];
interface PromptSectionProps {
    handlePromptClick: (prompt: string) => void;
}
const PromptSection = ({ handlePromptClick } : PromptSectionProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {promptStarters.map((prompt, i) => (
            <PromptSuggestion
                key={i}
                variant="outline"
                className="rounded-full dark:hover:text-primary hover:cursor-pointer"
                onClick={() => handlePromptClick(prompt)}
            >
                {prompt}
            </PromptSuggestion>
        ))}
    </div>
    )
}

export default PromptSection
