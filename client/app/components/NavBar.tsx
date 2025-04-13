const NavBar = () => {
    return (
      <nav className="flex w-full items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="size-7 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
          <h1 className="text-base font-bold md:text-2xl">Quizzit</h1>
        </div>
  
        <ul className='hidden md:flex items-center justify-center space-x-4'>
          <li><a href="#home" className='hover:text-gray-500'>home</a> </li>
          <li><a href="#about" className='hover:text-gray-500'>about</a> </li>
          <li><a href="#x" className='hover:text-gray-500'>x</a> </li>
          <li><a href="#y" className='hover:text-gray-500'>y</a> </li>
        </ul>
        
        {/* <button className="w-24 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200">
          Login
        </button> */}
      </nav>
    );
  };

  export default NavBar;