'use client';

import { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import FloatingUfo from './components/FloatingUfo';
import QuizRenderer from './components/QuizRenderer';
import Loader from "../app/components/Loader";
import { Meteors } from './components/ui/meteors';
import ScrollToTopRocket from './components/ScrollToTopRocket';
import FlashcardRenderer from './components/FlashcardRenderer';

type TodoItem = {
  id: number;
  name: string;
  description: string;
};

export default function Home({}) {
  return (
    <div className="relative h-fit overflow-hidden">
      <div className='flex justify-center items-center flex-col border border-gray-800 bg-gray-900 px-4 py-8 shadow-xl h-max'>
        <Meteors />
        <FloatingUfo />
        <NavBar />
        <ScrollToTopRocket />
        <div className="flex justify-center w-full items-center h-[795px]">
          <Hero />
        </div>
        <QuizRenderer />
        <FlashcardRenderer />
      </div>
      <div className='h-48  border-gray-800 bg-gray-900 px-4 py-8 shadow-xl'></div>
        <Footer />
        <Loader />

    </div>
  );
}




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
