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
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setScore(null);
    setSelectedAnswers({});
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

  const handleOptionSelect = (questionId: number, selectedKey: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: selectedKey,
    }));
  };

  const gradeQuiz = () => {
    if (!quiz) return;

    let correct = 0;

    quiz.questions.forEach((question) => {
      const selected = selectedAnswers[question.id];
      const correctOption = question.options.find((opt) => opt.is_correct);

      if (selected && correctOption?.option_key === selected) {
        correct += 1;
      }
    });

    setScore(correct);
  };

  return (
    <div id="generate-form" className="w-[80%] mx-auto">
      <h1 className="text-2xl font-bold mb-4">Generate a Quiz from Notes</h1>

      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Paste your notes here..."
          className="w-full h-32 p-3 border rounded"
        />
        <button
          type="submit"
          className=" bg-blue-600 text-white hover:bg-blue-700 cursor-pointer scroll-smooth transition duration-300 ease-in-out rounded-xl font-semibold shadow mr-5 px-6 py-3 "
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Quiz"}
        </button>
      </form>

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
                        checked={selectedAnswers[q.id] === opt.option_key}
                        onChange={() => handleOptionSelect(q.id, opt.option_key)}
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

          <button
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={gradeQuiz}
          >
            Submit Answers
          </button>

          {score !== null && (
            <div className="mt-4 text-lg font-semibold text-blue-700">
              Score: {score} / {quiz.questions.length}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizRenderer;
