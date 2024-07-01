// import React from 'react';

// interface Msg_FormProps {
//   onFormSubmit: () => void;
// }

// const Msg_Form: React.FC<Msg_FormProps> = ({ onFormSubmit }) => {
//   const handleSubmit = (event: React.FormEvent) => {
//     event.preventDefault();
//     onFormSubmit();
//   };

//   return (
//     <section className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
//       <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8 space-y-6">
//         <div className="space-y-4">
//           <input
//             type="text"
//             placeholder="Full name"
//             className="w-full p-3 rounded-md bg-gray-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
//             required
//           />
//           <select
//             name="class"
//             className="w-full p-3 rounded-md bg-gray-200 border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
//             required
//           >
//             <option value="">Select grade level</option>
//             <option value="Kg">1</option>
//             <option value="Lp">2</option>
//             <option value="Up">3</option>
//             <option value="Hs">4</option>
//             <option value="Hss">5</option>
//             <option value="Kg">6</option>
//             <option value="Lp">7</option>
//             <option value="Up">8</option>
//             <option value="Hs">9</option>
//             <option value="Hss">10</option>
//             <option value="Hs">11</option>
//             <option value="Hss">12</option>
//           </select>
//           <select
//             name="div"
//             className="w-full p-3 rounded-md bg-gray-200 border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
//             required
//           >
//             <option value="">Select division</option>
//             <option value="A">A</option>
//             <option value="B">B</option>
//             <option value="C">C</option>
//           </select>
//           <select
//             name="subject"
//             className="w-full p-3 rounded-md bg-gray-200 border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
//             required
//           >
//             <option value="">Select subject</option>
//             <option value="Math">Math</option>
//             <option value="Science">Science</option>
//             <option value="English">English</option>
//             <option value="History">History</option>
//             <option value="Geography">Geography</option>
//             <option value="Computer Science">Computer Science</option>
//           </select>
//         </div>
//         <button
//           type="submit"
//           className="w-full p-3 rounded-md bg-indigo-600 text-white text-lg hover:bg-indigo-700 transition duration-300"
//         >
//           Submit
//         </button>
//       </form>
//     </section>
//   );
// };

// export default Msg_Form;
