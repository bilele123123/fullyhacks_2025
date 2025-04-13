"use client";

import React, { useState } from "react";

type Flashcard = {
  id: number;
  term: string;
  definition: string;
};

type FlashcardSet = {
  id: number;
  title: string;
  created_at: string;
  cards: Flashcard[];
};

const FlashcardRenderer = () => {
  const [notes, setNotes] = useState("");
  const [flashcardSet, setFlashcardSet] = useState<FlashcardSet | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setFlashcardSet(null);
    setCurrentIndex(0);
    setIsFlipped(false);

    try {
      const res = await fetch("http://localhost:8000/api/generate-flashcards/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notes }),
      });

      if (!res.ok) {
        throw new Error("Failed to generate flashcards");
      }

      const data = await res.json();
      setFlashcardSet(data);
    } catch (err: any) {
      setError(err.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (!flashcardSet) return;
    setCurrentIndex((prev) => (prev + 1) % flashcardSet.cards.length);
    setIsFlipped(false);
  };

  const handlePrev = () => {
    if (!flashcardSet) return;
    setCurrentIndex((prev) => (prev - 1 + flashcardSet.cards.length) % flashcardSet.cards.length);
    setIsFlipped(false);
  };

  return (
    <div id="generate-flashcard" className="w-[80%] mt-24">
      <h1 className="text-2xl font-bold">Generate Flashcards from Notes</h1>

      <form onSubmit={handleSubmit}  className="w-full mb-8 space-y-4">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Paste your notes here..."
          className="w-full h-32 p-3 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white hover:bg-blue-700 cursor-pointer scroll-smooth transition duration-300 ease-in-out rounded-xl font-semibold shadow mr-5 px-6 py-3"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Flashcards"}
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>}

      {flashcardSet && flashcardSet.cards.length > 0 && (
        <div className="w-full flex flex-col items-center space-y-4">
          <h2 className="text-xl font-semibold">{flashcardSet.title}</h2>

          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-96 h-60 bg-blue-900 rounded-xl shadow-lg border-2 border-blue-500 flex items-center justify-center cursor-pointer transition-transform duration-500 transform hover:scale-105 text-xl text-white text-center px-4"
          >
            {isFlipped
              ? flashcardSet.cards[currentIndex].definition
              : flashcardSet.cards[currentIndex].term}
          </div>

          <div className="flex gap-4">
            <button
              onClick={handlePrev}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Next
            </button>
          </div>

          <p className="text-sm text-gray-500">
            Card {currentIndex + 1} of {flashcardSet.cards.length}
          </p>
        </div>
      )}
    </div>
  );
};

export default FlashcardRenderer;
