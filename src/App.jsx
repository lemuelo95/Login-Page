import { useState } from "react";
import logo from './assets/small-team-discussing-ideas-2194220-0.svg'

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const endpoint = isSignUp ? "/api/signup" : "/api/login";
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Something went wrong");
      alert(isSignUp ? "Sign Up Successful" : "Sign In Successful");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Side - Form */}
      <div className="w-1/2 flex justify-center ml-0.5 items-center p-8">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold text-black text-center mb-4">
            {isSignUp ? "Sign Up" : "Sign In"}
          </h2>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border rounded"
                required
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border rounded"
              required
            />
            <button
              type="submit"
              className="w-full bg-black text-white p-3 rounded hover:bg-green-800"
              disabled={loading}
            >
              {loading ? "Processing..." : isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </form>
          
          <p className="text-sm text-center mt-4">
            {isSignUp ? "Already have an account?" : "Don't have an account?"} 
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-black underline ml-1"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="w-1/2 flex items-center justify-center bg-white-100">
        <img src={logo} alt="Authentication" className="max-w-xs md:max-w-md lg:max-w-lg rounded-lg" />
      </div>
    </div>
  );
}
