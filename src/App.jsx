import { useState } from "react";
import logo from './assets/small-team-discussing-ideas-2194220-0.svg'
import { Label } from "@/components/ui/label"
import { FaEye, FaEyeSlash } from 'react-icons/fa'

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ email: "", username: "", password: "" , passwordconfirm: "", });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    <div className="flex h-screen bg-gray-50 gap-x-2 items-stretch">
      {/* Left Side - Form */}
      <div className="w-1/2 flex justify-center ml-0.5 items-center p-8">
        <div className="bg-white p-8 h-4/6 rounded-lg shadow-lg w-[500px]">
        <h2 className="text-xl text-left mb-2.5">
          Welcome!
        </h2>
          <h2 className="text-2xl font-bold text-black text-left mb-4">
            {isSignUp ? "Sign Up" : "Sign In"}
          </h2>
           <p className="text-left mb-4.5">
          Lorem ipsum is simply!
        </p>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <Label htmlFor="email" className="mb-2.5">
                  Email
                </Label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border rounded"
                  required
                />
              </div>
            )}
            <div>
              <Label htmlFor="username" className="mb-2.5">
                Username
              </Label>
              <input
                type="username"
                name="username"
                placeholder="Enter your username here"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-3 border rounded"
                required
              />
            </div>
            <div>
              <Label htmlFor="password" className="mb-2.5">
                Password
              </Label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 border rounded"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
            </div>
            {isSignUp && (
              <div>
                <Label htmlFor="passwordconfirm" className="mb-2.5">
                  Confirm Password
                </Label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="passwordconfirm"
                    placeholder="Confirm your password"
                    value={formData.passwordconfirm}
                    onChange={handleChange}
                    className="w-full p-3 border rounded"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-black text-white p-3 rounded hover:bg-gray-700"
              disabled={loading}
            >
              {loading ? "Processing..." : isSignUp ? "Register" : "Login"}
            </button>
          </form>
          
          <p className="text-sm text-center mt-4">
            {isSignUp ? "Already have an account?" : "Don't have an account?"} 
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-black underline ml-1"
            >
              {isSignUp ? "Login" : "Register"}
            </button>
          </p>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="w-[30%] flex items-center justify-center bg-white-100">
        <img src={logo} alt="Authentication" style={{width: "200%", maxWidth: "1200px", height: "auto"}} />
      </div>
    </div>
  );
}