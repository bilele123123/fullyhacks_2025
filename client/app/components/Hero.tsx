import Image from 'next/image';

const Hero = () => {
  return (
    <section className="bg-[#0f172a] w-[92%] text-gray-100 py-10 px-0 ">
      <div className=" mx-auto flex flex-col md:flex-row items-center justify-between ">
        {/* Text Content */}
        <div className="max-w-[70%] text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight text-white">
            <span className="text-blue-400 uppercase">Supercharge</span> Your Studying with AI
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-8">
            Our smart flashcard generator helps you learn faster, remember more, and stay focused.
            Just input your notes or upload material — and let AI create custom flashcards to boost your study sessions.
          </p>
          <a
            href="#generate-form"
            className="inline-block scroll-smooth transition duration-300 ease-in-out bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-blue-700"
          >
            Generate Flashcards
          </a>
        </div>

        {/* Rocket Image */}
        <div className="">
          <Image
            src="/rocket.webp" // ✅ updated image name
            alt="Rocket Book Icon"
            width={250}
            height={250}
            className="object-contain drop-shadow-lg"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;

