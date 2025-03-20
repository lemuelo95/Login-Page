import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'



export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log (formData)
    // alert(isSignUp ? "Sign Up Successful" : "Sign In Successful");
  };

  return (
    <>
      <header>
        <h1 className='text-green-700 text-2xl font-bold'>RydeSync</h1>
      </header>
          <div className="flex justify-center items-center h-screen bg-gray-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-100">
            <h2 className="text-xl text-green-700 font-bold mb-4 text-center">
              {isSignUp ? "Sign Up" : "Sign In"}
            </h2>
            <form onSubmit={handleSubmit}>
              {isSignUp && (
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 mb-2 border rounded"
                  required
                />
              )}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 mb-2 border rounded"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <button
                type="submit"
                className="w-full bg-green-700 text-white p-2 rounded hover:bg-blue-600"
              >
                {isSignUp ? "Sign Up" : "Sign In"}
              </button>
            </form>
            <p className="text-sm text-center mt-4">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-green-700 underline"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>
        </div>
        <footer>
          <p className='text-xs'>@ 2025 Show Working Dev. All Rights Reserved</p>
        </footer>
    </>
  );
}


// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
