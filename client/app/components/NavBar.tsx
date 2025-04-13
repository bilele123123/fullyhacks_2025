import Image from 'next/image';
const NavBar = () => {
    return (
      <nav className="flex w-[92%] items-center justify-between py-3">
        <div className="flex items-center">
        <Image
  src="/rocket.webp"
  alt="Rocket Icon"
  width={30}
  height={30}
  className="size-13 rounded-full object-cover"
/>
          <h1 className="text-base font-bold md:text-2xl hover:text-gray-500">Quizzit</h1>
        </div>
  
      </nav>
    );
  };

  export default NavBar;