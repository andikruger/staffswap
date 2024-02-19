import { AiOutlineUnlock } from "react-icons/ai";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { signIn, signUp } from "../actions/auth";

function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();

  const toggleIsSignUp = () => setIsSignUp(!isSignUp);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (isSignUp) {
      const firstName = data.get("firstName");
      const lastName = data.get("lastName");
      const email = data.get("email");
      const password = data.get("password");
      dispatch(signUp({ firstName, lastName, email, password }));
    } else {
      const email = data.get("email");
      const password = data.get("password");
      dispatch(signIn({ email, password }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <AiOutlineUnlock className="mx-auto h-12 w-auto text-indigo-600" />
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900">
            {isSignUp ? "Sign up" : "Sign in"}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {isSignUp && (
              <>
                <div>
                  <input
                    autoComplete="given-name"
                    name="firstName"
                    type="text"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="First Name"
                  />
                </div>
                <div>
                  <input
                    autoComplete="family-name"
                    name="lastName"
                    type="text"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Last Name"
                  />
                </div>
              </>
            )}
            <div>
              <input
                autoComplete="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email Address"
              />
            </div>
            <div>
              <input
                autoComplete="new-password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isSignUp ? "Sign up" : "Sign in"}
            </button>
          </div>
          <div className="text-center">
            <button
              onClick={toggleIsSignUp}
              className="text-sm text-indigo-600 hover:text-indigo-500"
            >
              {isSignUp
                ? "Already have an account? Sign in"
                : "Don't have an account? Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
