import React, { useEffect, useState } from "react";
import logoImage from "../assets/logo/Sterna.png"
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const Login = () => {
  const navigate = useNavigate()
  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const {name, value} = event.target;
    setInput({
      ...input,
      [name]:value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const {data} = await axios({
        method: "post",
        url: import.meta.env.VITE_BASE_URL + "/login",
        data: input,
      })
      localStorage.setItem("access_token", data.access_token)
      console.log(data);
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  }

  const handleCredentialResponse = async ({credential}) => {

    event.preventDefault()
    try {
      const {data} = await axios.post(import.meta.env.VITE_BASE_URL + "/google-login", {}, {
        headers: {
          ['google-token']: credential
        }
      })
      localStorage.setItem("access_token", data.access_token)
      console.log(data);
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("google-login"),
      { theme: "outline", size: "large" }  // customization attributes
    );
    // google.accounts.id.prompt(); // also display the One Tap dialog
  }, [])
  console.log(input);
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-800 via-purple-700 to-gray-900 text-gray-100 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <img
              src={logoImage}
              className="w-60 mx-auto"
              alt="Logo"
            />
          </div>
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Log In</h1>
           
            <div className="w-full flex-1 mt-8">
              <div className="flex flex-col items-center">
                <button id="google-login" className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                  <div className="bg-white p-2 rounded-full">
                    <svg className="w-4" viewBox="0 0 533.5 544.3">
                      <path
                        d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                        fill="#4285f4"
                      />
                      <path
                        d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                        fill="#34a853"
                      />
                      <path
                        d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                        fill="#fbbc04"
                      />
                      <path
                        d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                        fill="#ea4335"
                      />
                    </svg>
                  </div>
                  <span className="ml-4">Sign in with Google</span>
                </button>
              </div>

              <div className="my-12 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  Or sign In with e-mail
                </div>
              </div>
              <div className="mx-auto max-w-xs">
              <form onSubmit={handleSubmit}>
                <input
                  className="text-black w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="Email"
                />
                <input
                  className=" text-black w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  id="password"
                  name="password"
                  onChange={handleChange}
                  placeholder="Password"
                />
                <button className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                  <span className="ml-3">Sign In</span>
                </button>

                <div className="mt-6 text-xs text-gray-600 text-center">
                  Dont'have an account?
                  <button onClick={() => {
                    navigate('/register')
                  }}className="border-b border-gray-500 border-dotted">Sign up for free</button>
                </div>
                </form>
              </div>
            </div>
           
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-16 xl:m-0 w-full bg-contain bg-center bg-no-repeat rounded"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1619983081563-430f63602796?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                backgroundSize: "cover",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
