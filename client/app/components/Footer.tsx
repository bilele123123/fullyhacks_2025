const Footer = () => {
    return (
      <footer className="w-full bg-black-800 text-gray-600 py-6 border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <p className="text-sm">&copy; {new Date().getFullYear()} FullyHacks 2025. Strawhat pirates.</p>
          <div className="flex space-x-6 text-sm">
            <a href="https://www.linkedin.com/in/2770341b7/" className="hover:text-gray-900 transition-colors">Thai</a>
            <a href="https://github.com/Nineiota0" className="hover:text-gray-900 transition-colors">Brian</a>
            <a href="http://linkedin.com/in/minhleenlam" className="hover:text-gray-900 transition-colors">Minh</a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  