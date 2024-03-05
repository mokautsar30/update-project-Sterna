import React, { useState } from 'react'
import logoImage from "../assets/logo/Sterna.png"
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const Register = () => {
  const navigate = useNavigate()
  const [input, setInput] = useState({
    username: '',
    email: '',
    password: '',
  })

const handleChange = (event) => {
  const {name, value} = event.target;
  setInput({
    ...input,
    [name]: value,
  })
}

const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    const {data} = await axios({
      method: "post",
      url: import.meta.env.VITE_BASE_URL + "/register",
      data: input,
    })
    console.log();
    navigate("/login")
  } catch (error) {
    console.log(error);
  }
}

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
          <h1 className="text-2xl xl:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Sign Up</h1>
          <form onSubmit={handleSubmit}>
          <div className="w-full flex-1 mt-8">

            <div className="mx-auto max-w-xs">
            <input
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-200 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white text-black"
                type="text"
                id="username"
                name="username"
                onChange={handleChange}
                placeholder="Username"
              />

              <input
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 text-black"
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                placeholder="Email"
              />
              <input
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 text-black"
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                placeholder="Password"
              />
              <button className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">

                <span className="ml-3">Sign Up</span>
              </button>

              <div className="mt-6 text-xs text-gray-600 text-center">
                have an account?
                <button onClick={() => {
                  navigate('/login')
                }} className="border-b border-gray-500 border-dotted">LogIn here</button>
              </div>

            </div>
          </div>
          </form>
        </div>
      </div>
      <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
        <div
          className="m-16 xl:m-0 w-full bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1525362081669-2b476bb628c3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
              backgroundSize: "cover",
          }}
        ></div>
      </div>
    </div>
  </div>
  )
}

export default Register