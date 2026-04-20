import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { useNavigate, Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { setError } from "../state/auth.slice";
import ContinueWithGoogle from "../components/ContinueWithGoogle";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { handleLogin } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(setError(null));
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);
  const handleFormSubmit = async (data) => {
    try {
      const user = await handleLogin(data);
      if(user.role == "buyer"){
        navigate("/");
      }else if(user.role == "seller"){
        navigate("/seller/dashboard");
      }else{
        navigate("/login")
      }
      reset();
      
    } catch(err) {
      console.log(err);
    }
  };

  return (
    <main className="w-full flex items-center justify-center py-6 px-6 bg-background text-on-background min-h-screen font-body selection:bg-primary-container selection:text-on-primary-container relative">
      {/* Error Pill */}
      {error && (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-300 w-[90%] md:w-max max-w-lg">
          <div className="w-full bg-[#FF3B30]/10 border border-[#FF3B30]/30 text-[#FF3B30] px-5 py-3.5 rounded-2xl md:rounded-full flex items-center justify-center space-x-3 shadow-[0_4px_24px_rgba(255,59,48,0.2)] backdrop-blur-md">
            <span className="material-symbols-outlined text-[20px] flex-shrink-0">
              error_outline
            </span>
            <p className="text-[11px] font-label uppercase tracking-[0.15em] leading-relaxed mt-0.5 text-center">
              {error}
            </p>
          </div>
        </div>
      )}

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Hero / Branding Side (Asymmetric Layout) */}
        <div className="hidden lg:flex lg:col-span-7 flex-col justify-center space-y-6 pr-12">
          <h1 className="text-5xl md:text-7xl font-headline font-extrabold tracking-tighter leading-none text-on-background">
            WELCOME <br />
            <span className="text-primary-container">BACK.</span>
          </h1>
          <p className="text-on-surface-variant max-w-md text-base leading-relaxed font-light">
            Log in to continue exploring your premium destination for modern
            apparel and exclusive collections.
          </p>
          <div className="w-32 h-0.5 bg-primary-container"></div>
        </div>

        {/* Login Form Canvas */}
        <div className="lg:col-span-5 w-full mt-4 lg:mt-0">
          {/* Progress Indicator (The Gold Thread) */}
          <div className="w-full h-0.5 bg-surface-container-high mb-6 overflow-hidden">
            <div className="w-1/3 h-full bg-primary shadow-[0_0_10px_rgba(255,246,223,0.5)]"></div>
          </div>
          <div className="space-y-6">
            <header>
              <h2 className="text-xs font-label uppercase tracking-[0.2rem] text-primary-container mb-1">
                Authentication
              </h2>
              <h3 className="text-2xl font-headline font-bold text-on-surface">
                Sign in to your account
              </h3>
            </header>
            <form
              className="space-y-4"
              onSubmit={handleSubmit(handleFormSubmit)}
            >
              {/* Email */}
              <div className="group">
                <label className="block text-[10px] font-label uppercase tracking-[0.15rem] text-on-surface-variant mb-1 group-focus-within:text-primary-container transition-colors duration-300">
                  Email Address
                </label>
                <input
                  className="w-full bg-surface-container-lowest border-none rounded-md px-4 py-3 text-sm text-on-surface placeholder:text-surface-variant focus:ring-1 focus:ring-outline transition-all duration-300 carved-inset"
                  placeholder="VANCE@NOCTURNAL.COM"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address.",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-primary-container pt-2 text-xs">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="group">
                <label className="block text-[10px] font-label uppercase tracking-[0.15rem] text-on-surface-variant mb-1 group-focus-within:text-primary-container transition-colors duration-300">
                  Security Password
                </label>
                <div className="relative">
                  <input
                    className="w-full bg-surface-container-lowest border-none rounded-md px-4 py-3 text-sm text-on-surface placeholder:text-surface-variant focus:ring-1 focus:ring-outline transition-all duration-300 carved-inset pr-12"
                    placeholder="••••••••••••"
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required.",
                      minLength: {
                        value: 6,
                        message: "password should be atleast 6 characters.",
                      },
                    })}
                  />
                  {errors.password && (
                    <p className="text-primary-container pt-2 text-xs">
                      {errors.password.message}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary-container transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>


              {/* Login Button */}
              <button
                className="w-full py-4 rounded-full bg-gradient-to-br from-[#E9C400] to-[#FFD700] text-[#3A3000] font-headline font-extrabold uppercase tracking-[0.2em] text-sm hover:opacity-90 active:scale-[0.98] transition-all duration-300 shadow-[0_20px_40px_rgba(233,196,0,0.15)] mt-4"
                type="submit"
              >
                Sign In
              </button>
              <ContinueWithGoogle/>

              <p className="text-center text-[10px] font-label uppercase tracking-widest text-on-surface-variant mt-4">
                Not a member yet?{" "}
                <Link
                  className="text-primary-container hover:underline"
                  to="/register"
                >
                  Create an account
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
