import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function RegisterForm() {
  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
    phoneNo: "",
    role:""
  });

 
  const [result, setResult] = useState("")
  const [password , setPassword] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const onChangePassword = () =>{
    setPassword(prev => !prev)
  }

  function submitRegister(e){
        e.preventDefault()
        async function fn(){
            const opt={
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(form)
            }
            const data = await fetch("https://urban-slotsbooking-backend.onrender.com/user/register", opt)
            const jsonData =  await data.json()
            console.log(data)
            setResult(data.ok)
            console.log(result)

        }
        fn()
        
        
    }
    console.log(result)
  function onClose(){
    navigate("/", {replace:true})
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
            <span className="text-cyan-600">Register</span>
          </h2>

          {result ? (
            <div className="text-center">
              <h3 className="text-green-600 font-semibold">Register successful!</h3>
              <Link to="/login" className='underline text-blue-600'>Login here</Link>
            </div>
          ) : (
            <form onSubmit={submitRegister} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-gray-700 font-medium mb-1">
                  Username
                </label>
                <input
                  id="username"
                  name="userName"
                  type="text"
                  value={form.userName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Your username"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="email@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
                  Password
                </label>
              <div className="relative">
              
                <input
                  id="password"
                  name="password"
                  type={password ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Your password"
                  required
                /> 

              
              <div className="absolute top-2 right-3">
                {password ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6" onClick={onChangePassword}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6" onClick={onChangePassword}>
                           <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                        }
              </div>
              </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phoneNo"
                  type="text"
                  value={form.phoneNo}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="e.g. 9876543210"
                  required
                />
              </div>
              <div>
                <label htmlFor="role" className="block text-gray-700 font-medium mb-1">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                >
                  <option value="" disabled>
                    Select the Role
                  </option>
                  <option value="Customer">Customer</option>
                  <option value="Provider">Provider</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-cyan-600 text-white py-2 rounded-lg font-semibold shadow-lg hover:bg-cyan-700 transition"
              >
                Register
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default RegisterForm