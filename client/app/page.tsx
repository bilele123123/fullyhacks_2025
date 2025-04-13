'use client';

// import Image from 'next/image';
import { useEffect, useState } from 'react';
import NavBar from './components/NavBar';


type TodoItem = {
  id: number;
  name: string;
  description: string;
};

export default function Home({}) {
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
        <NavBar /> 
        
      </div>
        <h1 className="text-xl font-bold mb-4">Todo List</h1>

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
