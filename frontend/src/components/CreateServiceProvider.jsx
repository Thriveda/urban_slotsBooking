import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



function AddProviderForm() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    category: "",
    experience: "",
    price:"",
    phoneNo:""
  });
  const [result, setResult] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  
  function submitProvider(e){
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
            const data = await fetch("https://urban-slotsbooking-backend.onrender.com/serviceprovider/register", opt)
            const jsonData =  await data.json()
            console.log(data)
            setResult(data.ok)
            console.log(result)

        }
        fn()
        
        
    }

  function onClose(){
    navigate("/", {replace: true})
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
            <span className="text-blue-800">Add</span>{" "}
            <span className="text-cyan-600">Service Provider</span>
          </h2>

          {result ? (
            <div className="text-center text-green-600 font-semibold">
              Provider created successfully!
            </div>
          ) : (
            <form onSubmit={submitProvider} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Full Name"
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
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-gray-700 font-medium mb-1">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  <option value="Electrician">Electrician</option>
                  <option value="Plumber">Plumber</option>
                  <option value="Carpenter">Carpenter</option>
                  <option value="Car Washer">Car Washer</option>
                </select>
              </div>

              <div>
                <label htmlFor="experience" className="block text-gray-700 font-medium mb-1">
                  Experience
                </label>
                <input
                  id="experience"
                  name="experience"
                  type="number"
                  min="0"
                  step="1"
                  value={form.experience}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Years of experience"
                  required
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-gray-700 font-medium mb-1">
                  Price 
                </label>
                <input
                  id="price"
                  name="price"
                  type="text"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Price"
                  required
                />
              </div>

              <div>
                <label htmlFor="phoneNo" className="block text-gray-700 font-medium mb-1">
                  Phone Number 
                </label>
                <input
                  id="phoneNo"
                  name="phoneNo"
                  type="text"
                  value={form.phoneNo}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Phone Number"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-cyan-600 text-white py-2 rounded-lg font-semibold shadow-lg hover:bg-cyan-700 transition"
              >
                Create
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddProviderForm