"use client";

import { useState } from "react";
import type { QuizQuestion } from "@/content/track-content";

function Question({ q, index }: { q: QuizQuestion; index: number }) {
  const [picked, setPicked] = useState<number | null>(null);
  const answered = picked !== null;

  return (
    <fieldset className="space-y-3 rounded-xl border border-line bg-surface p-5">
      <legend className="sr-only">Question {index + 1}</legend>
      <p className="font-medium">
        <span className="mr-2 font-mono text-xs text-fg2">Q{index + 1}</span>
        {q.question}
      </p>
      <div className="grid gap-2">
        {q.options.map((option, i) => {
          const isAnswer = i === q.answerIndex;
          const isPicked = i === picked;
          let tone = "border-line hover:border-ink/40";
          if (answered && isAnswer) tone = "border-emerald-600 bg-emerald-600/10";
          else if (answered && isPicked) tone = "border-red-500 bg-red-500/10";
          return (
            <button
              key={option}
              type="button"
              disabled={answered}
              onClick={() => setPicked(i)}
              className={`rounded-lg border px-3 py-2 text-left text-sm transition-colors disabled:cursor-default ${tone}`}
            >
              {option}
            </button>
          );
        })}
      </div>
      {answered && (
        <p className="text-sm text-fg2">
          <span className="font-medium text-ink">{picked === q.answerIndex ? "Correct. " : "Not quite. "}</span>
          {q.explanation}
        </p>
      )}
    </fieldset>
  );
}

export function Quiz({ questions }: { questions: QuizQuestion[] }) {
  return (
    <div className="space-y-4">
      {questions.map((q, i) => (
        <Question key={q.question} q={q} index={i} />
      ))}
    </div>
  );
}
