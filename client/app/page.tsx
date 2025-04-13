'use client';

// import Image from 'next/image';
import { useEffect, useState } from 'react';

type TodoItem = {
  id: number;
  name: string;
  description: string;
};

export default function Home() {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/todos/')
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error('Failed to fetch todos:', err));
  }, []);

  return (
    <div className="">
      <div className='flex '>
        <Navbar /> 
        
      </div>
        <h1 className="text-xl font-bold mb-4">Todo List</h1>

    </div>
  );
}

const Navbar = () => {
  return (
    <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
      <div className="flex items-center gap-2">
        <div className="size-7 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
        <h1 className="text-base font-bold md:text-2xl">Quizzit</h1>
      </div>

      <ul className='flex items-center justify-center space-x-4'>
        <li><a href="#home" className='hover:text-gray-500'>home</a> </li>
        <li><a href="#about" className='hover:text-gray-500'>about</a> </li>
        <li><a href="#x" className='hover:text-gray-500'>x</a> </li>
        <li><a href="#y" className='hover:text-gray-500'>y</a> </li>
      </ul>
      
      <button className="w-24 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200">
        Login.
      </button>
    </nav>
  );
};


// original state:
// return (
//   <div className="">
//     <div>
//       <h1 className="text-xl font-bold mb-4">Todo List</h1>
//       {/* {todos.length > 0 ? (
//         <ul className="space-y-2">
//           {todos.map((todo) => (
//             <li key={todo.id} className="bg-white p-4 rounded shadow">
//               <h2 className="text-lg font-semibold">{todo.name}</h2>
//               <p className="text-gray-600">{todo.description}</p>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p className="text-gray-500">No todos found.</p>
//       )} */}
//       <h2>hello world</h2>
//     </div>


//   </div>
// );
