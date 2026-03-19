import { useState } from 'react'
import { Link } from 'react-router'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitForm = (event) => {
    event.preventDefault()

  }

  return (
    <div className="min-h-screen bg-[#1c1c1c] text-neutral-200 font-sans selection:bg-teal-500/30 flex items-center justify-center relative overflow-hidden px-4">
      {/* Minimal Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16 items-center">
                  <Link to="/" className="shrink-0 flex items-center">
                      <span className="text-xl font-semibold tracking-tight text-white flex items-center gap-2 hover:opacity-80 transition-opacity">
                          <svg className="w-6 h-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
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
            Create Account
          </h1>
          <p className="text-center text-sm text-neutral-400 mb-8">
            Join Perplexity Clone to start exploring.
          </p>

          <form onSubmit={submitForm} className="space-y-5">
            <div>
              <label htmlFor="username" className="mb-2 block text-sm font-medium text-neutral-300">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Choose a username"
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-neutral-500 outline-none transition-all duration-300 focus:border-teal-500/50 focus:bg-white/10 focus:ring-1 focus:ring-teal-500/50"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-neutral-300">
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
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-neutral-300">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Create a password"
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-neutral-500 outline-none transition-all duration-300 focus:border-teal-500/50 focus:bg-white/10 focus:ring-1 focus:ring-teal-500/50"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-teal-500 px-4 py-3 font-semibold text-white transition-all duration-300 hover:bg-teal-400 shadow-[0_0_20px_rgba(20,184,166,0.2)] hover:shadow-[0_0_30px_rgba(20,184,166,0.4)] transform hover:-translate-y-0.5 mt-2"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-neutral-400">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-teal-400 transition hover:text-teal-300 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register