// pages/AuthPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * AuthPage
 * - Tabbed Login / Register UI
 * - Register stores user in localStorage under "users" (simple demo)
 * - On successful register, navigates to /address to collect address
 * - On login, checks against stored users
 *
 * Note: Replace localStorage logic with real API calls in production.
 */

export default function AuthPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("login"); // 'login' or 'register'

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Register state
  const [name, setName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");
  const [regError, setRegError] = useState("");

  // Simple helpers
  const getUsers = () => {
    try {
      return JSON.parse(localStorage.getItem("users") || "[]");
    } catch {
      return [];
    }
  };

  const saveUsers = (users) => {
    localStorage.setItem("users", JSON.stringify(users));
  };

  // LOGIN
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError("");

    if (!loginEmail || !loginPassword) {
      setLoginError("Please provide both email and password.");
      return;
    }

    const users = getUsers();
    const user = users.find(
      (u) => u.email.toLowerCase() === loginEmail.toLowerCase() && u.password === loginPassword
    );

    if (!user) {
      setLoginError("Invalid credentials. Please check email/password.");
      return;
    }

    // Save "currentUser" (simple)
    localStorage.setItem("currentUser", JSON.stringify(user));
    // Navigate to builder page (or dashboard)
    navigate("/PCBuilderPage");
  };

  // REGISTER
  const handleRegister = (e) => {
    e.preventDefault();
    setRegError("");

    if (!name.trim() || !regEmail.trim() || !regPassword || !regConfirm) {
      setRegError("Please fill all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(regEmail)) {
      setRegError("Please enter a valid email address.");
      return;
    }

    if (regPassword.length < 6) {
      setRegError("Password must be at least 6 characters.");
      return;
    }

    if (regPassword !== regConfirm) {
      setRegError("Passwords do not match.");
      return;
    }

    const users = getUsers();
    if (users.some((u) => u.email.toLowerCase() === regEmail.toLowerCase())) {
      setRegError("An account with this email already exists.");
      return;
    }

    const newUser = {
      id: Date.now(),
      name: name.trim(),
      email: regEmail.trim().toLowerCase(),
      password: regPassword, // in prod: hash it!
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    saveUsers(users);

    // auto-login / set currentUser
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    // redirect to address page to collect address
    navigate("/address");
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
        <div className="flex">
          {/* Left - Visual / brand */}
          <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-gradient-to-br from-gray-800 to-gray-700 p-10">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold">Welcome</h2>
              <p className="mt-2 text-gray-300">Build your dream PC — fast & easy.</p>
            </div>
          </div>

          {/* Right - Forms */}
          <div className="w-full lg:w-1/2 p-8">
            {/* Tabs */}
            <div className="flex items-center space-x-4 mb-6">
              <button
                onClick={() => setTab("login")}
                className={`px-4 py-2 rounded-md font-semibold ${
                  tab === "login" ? "bg-blue-600" : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setTab("register")}
                className={`px-4 py-2 rounded-md font-semibold ${
                  tab === "register" ? "bg-blue-600" : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                Register
              </button>
            </div>

            {tab === "login" ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <h3 className="text-2xl font-bold">Sign in</h3>
                {loginError && <div className="text-red-400 text-sm">{loginError}</div>}

                <div>
                  <label className="text-sm text-gray-300">Email</label>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="mt-1 w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 focus:outline-none"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-300">Password</label>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="mt-1 w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 focus:outline-none"
                    placeholder="********"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-400">Forgot password?</div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded font-semibold"
                  >
                    Sign In
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <h3 className="text-2xl font-bold">Create account</h3>
                {regError && <div className="text-red-400 text-sm">{regError}</div>}

                <div>
                  <label className="text-sm text-gray-300">Full name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 focus:outline-none"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-300">Email</label>
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="mt-1 w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 focus:outline-none"
                    placeholder="you@example.com"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-300">Password</label>
                    <input
                      type="password"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      className="mt-1 w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 focus:outline-none"
                      placeholder="Min 6 characters"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-300">Confirm</label>
                    <input
                      type="password"
                      value={regConfirm}
                      onChange={(e) => setRegConfirm(e.target.value)}
                      className="mt-1 w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 focus:outline-none"
                      placeholder="Confirm password"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-400">By registering you agree to terms</div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded font-semibold"
                  >
                    Create Account
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
