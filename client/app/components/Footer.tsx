const Footer = () => {
    return (
      <footer className="w-full bg-black-800 text-gray-600 py-6 mt-10 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <p className="text-sm">&copy; {new Date().getFullYear()} FullyHacks. All rights reserved.</p>
          <div className="flex space-x-6 text-sm">
            <a href="/about" className="hover:text-gray-900 transition-colors">About</a>
            <a href="/contact" className="hover:text-gray-900 transition-colors">Contact</a>
            <a href="/privacy" className="hover:text-gray-900 transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  