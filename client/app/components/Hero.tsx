const Hero = () => {
    return (
      <section className="bg-white text-gray-800 py-20 px-6 sm:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight text-gray-600">
            Supercharge Your Studying with AI
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Our smart flashcard generator helps you learn faster, remember more, and stay focused. 
            Just input your notes or upload material — and let AI create custom flashcards to boost your study sessions.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="/generate"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-blue-700 transition"
            >
              Generate Flashcards
            </a>
          </div>
        </div>
      </section>
    );
  };
  
  export default Hero;