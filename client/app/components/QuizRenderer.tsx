"use client";

import React, { useState } from "react";

type QuizOption = {
  id: number;
  option_key: string;
  option_text: string;
  is_correct: boolean;
};

type QuizQuestion = {
  id: number;
  question: string;
  question_type: string;
  options: QuizOption[];
};

type Quiz = {
  id: number;
  title: string;
  created_at: string;
  questions: QuizQuestion[];
};

const QuizRenderer = () => {
  const [notes, setNotes] = useState("");
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:8000/api/generate-quiz-text/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notes }),
      });

      if (!res.ok) {
        throw new Error("Failed to generate quiz");
      }

      const data = await res.json();
      setQuiz(data);
    } catch (err: any) {
      setError(err.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[80%] mx-full">
      <h1 className="text-2xl font-bold mb-4">Generate a Quiz from Notes</h1>

    <div id="generate-form">
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Paste your notes here..."
          className="w-full h-32 p-3 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Quiz"}
        </button>
      </form>
    </div>
      {error && <p className="text-red-500">{error}</p>}

      {quiz && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">{quiz.title}</h2>

          {quiz.questions.map((q) => (
            <div key={q.id} className="border p-4 rounded shadow-sm">
              <p className="font-medium">{q.question}</p>
              <ul className="mt-2 space-y-1">
                {q.options.map((opt) => (
                  <li key={opt.id}>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        value={opt.option_key}
                        className="accent-blue-500"
                      />
                      <span>
                        ({opt.option_key.toUpperCase()}) {opt.option_text}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizRenderer;
