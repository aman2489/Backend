import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hook/useAuth";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin } = useAuth();
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector(state => state.auth.error)

  const navigate = useNavigate();

  const submitForm = async (event) => {
    event.preventDefault();

    const payload = {
      email,
      password,
    };

    const data = await handleLogin(payload);
    // console.log(data);
    if(error){
      console.log(error);
    }
    navigate("/dashboard");
  };

  if (!loading && user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-[#1c1c1c] text-neutral-200 font-sans selection:bg-teal-500/30 flex items-center justify-center relative overflow-hidden px-4">
      {/* Minimal Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="shrink-0 flex items-center">
              <span className="text-xl font-semibold tracking-tight text-white flex items-center gap-2 hover:opacity-80 transition-opacity">
                <svg
                  className="w-6 h-6 text-teal-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Agentra AI
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="p-8 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-xl shadow-2xl">
          <h1 className="text-3xl font-bold text-white mb-2 text-center">
            Welcome Back
          </h1>
          <p className="text-center text-sm text-neutral-400 mb-8">
            Sign in to continue to Perplexity Clone.
          </p>

          <form onSubmit={submitForm} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-neutral-300"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-neutral-500 outline-none transition-all duration-300 focus:border-teal-500/50 focus:bg-white/10 focus:ring-1 focus:ring-teal-500/50"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-neutral-300"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-neutral-500 outline-none transition-all duration-300 focus:border-teal-500/50 focus:bg-white/10 focus:ring-1 focus:ring-teal-500/50"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-teal-500 px-4 py-3 font-semibold text-white transition-all duration-300 hover:bg-teal-400 shadow-[0_0_20px_rgba(20,184,166,0.2)] hover:shadow-[0_0_30px_rgba(20,184,166,0.4)] transform hover:-translate-y-0.5 mt-2"
            >
              Sign In
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-neutral-400">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-teal-400 transition hover:text-teal-300 hover:underline"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
