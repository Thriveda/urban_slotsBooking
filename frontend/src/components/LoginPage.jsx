import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import Cookies from "js-cookie"

function LoginPage() {
    const[email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [submitted, setSubmitted] = useState(null);
    const [success, setSuccess] = useState(null)
    const navigate = useNavigate()

    function onClose(){
    navigate("/", {replace:true})
    }

    function emailInput(e){
    setEmail(e.target.value)
    }
    function passwordInput(e){
    setPassword(e.target.value)
  }

    const loginDetails = {
      email:email,
      password:password
    }

    function submitLogin(e){
        e.preventDefault()  
        async function fn(){
          const opt = {
            method: "POST", 
            headers:{
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(loginDetails)
          }
          const loginData = await fetch("https://urban-slotsbooking-backend.onrender.com/user/login", opt)
          const jsonLoginData = await loginData.json()
          console.log(jsonLoginData.message)
          setSubmitted(loginData.ok)
          setSuccess(jsonLoginData.message)
          if (jsonLoginData.jwtToken){
            Cookies.set("jwToken", jsonLoginData.jwtToken, {expires:1})
            Cookies.set("role",  jsonLoginData.role)
            Cookies.set("user", JSON.stringify(jsonLoginData.user), { expires: 1 })

          }
        }
    fn() 
    
  }
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 relative">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8">
          <h2 className="text-2xl font-extrabold text-center mb-6">
            <span className="text-blue-800">User</span>{" "}
            <span className="text-cyan-600">Login</span>
          </h2>

          {submitted ? (
            <div className={`text-center text-green-600 font-semibold`}>
              Login successful!
            </div>
          ) : (
            <form onSubmit={submitLogin}className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={emailInput}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="email@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={passwordInput}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Your password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-cyan-600 text-white py-2 rounded-lg font-semibold shadow-lg hover:bg-cyan-700 transition"
              >
                Login
              </button>
              {!submitted && <p className='font-semibold text-red-500'> {success}</p>}
              <p className=''>If you're not registered <Link to="/register" className='underline text-blue-600'>register here</Link></p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
  
}

export default LoginPage
