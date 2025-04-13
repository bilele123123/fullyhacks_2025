import Image from 'next/image';

const Hero = () => {
  return (
    <section className="flex bg-gray-900 w-[80%] text-gray-100 items-center justify-center flex-col md:flex-row">
      {/* Text Content */}
      <div className="md:w-1/2 lg:w-4/5 p-4 md:p-0 text-center md:text-left">
        <h1 className="text-3xl md:text-3xl lg:text-5xl sm:text-5xl font-extrabold mb-6 leading-tight text-white">
          <span className="text-blue-400 uppercase">Supercharge</span> your learning with AI
        </h1>
        <p className="text-2xl sm:text-1xl md:text-2xl text-gray-300 mb-8">
          Need a quick resource to reinforce your learning?
        </p>

        <p className="text-3xl sm:text-1xl text-gray-300 mb-8">
          Our smart flashcard generator helps you learn faster, remember more, and stay focused.
          Just input your notes or upload material — and let AI create custom flashcards to boost your study sessions.
        </p>
        <div className="flex justify-center md:justify-start">
          <a
            href="#generate-form"
            className="inline-block scroll-smooth transition duration-300 ease-in-out bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-blue-700"
          >
            Generate Flashcards
          </a>
        </div>
      </div>

      {/* Rocket Image */}
      <div className="invisible lg:visible md:w-1/2 lg:w-2/5 flex justify-center items-center">
        <Image
          src="/rocket.webp" // ✅ updated image name
          alt="Rocket Book Icon"
          width={600}
          height={600}
          className="object-contain drop-shadow-lg w-[320px] max-w-none md:block hidden"
          priority
        />
      </div>
    </section>
  );
};

export default Hero;
