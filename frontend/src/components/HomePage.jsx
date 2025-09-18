import Navbar from "./Navbar";
import Services from "./Services";
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom";


const services = [
  {
    name: "Electrician",
    description: "Expert electrical repairs, installations, and maintenance.",
    icon: (
      <svg className="w-10 h-10 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    name: "Carpenter",
    description: "Custom woodwork, furniture repair, and installations.",
    icon: (
      <svg className="w-10 h-10 text-amber-700" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-2a4 4 0 014-4h10a4 4 0 014 4v2M16 3.13a4 4 0 010 7.75M8 3.13a4 4 0 000 7.75" />
      </svg>
    ),
  },
  {
    name: "Plumber",
    description: "Leak repairs, pipe installations, and bathroom fittings.",
    icon: (
      <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 014-4h2a4 4 0 014 4v2M7 7V5a4 4 0 014-4h2a4 4 0 014 4v2" />
      </svg>
    ),
  },
  {
    name: "Car Washer",
    description: "Professional car cleaning and detailing at your doorstep.",
    icon: (
      <svg className="w-10 h-10 text-cyan-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 17v-2a4 4 0 014-4h8a4 4 0 014 4v2M9 7V5a4 4 0 014-4h2a4 4 0 014 4v2" />
      </svg>
    ),
  },
];


function HomePage() {

  const navigate = useNavigate()
 
  function addProvider(){
    navigate("/serviceprovider/register", {replace:true})
  }
  const role = Cookies.get("role")

  function serviceBtn(category){
    navigate(`/:${category}`)
  }
  
  
  console.log(role)
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-100">
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-4 md:px-16 py-16 bg-gradient-to-r from-blue-100 to-cyan-100">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-4">
            Book Trusted <span className="text-cyan-600">Home Services</span> Instantly
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Electricians, Carpenters, Plumbers, Car Washers & more. Reliable professionals at your doorstep, just a click away!
          </p>
          <div className="flex flex-row">
            <a href="#services"
              className="inline-block bg-cyan-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-cyan-700 transition m-3"
            >
              Explore Services
            </a>
            {role === "Provider" ?<button className="inline-block bg-cyan-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-cyan-700 transition m-3" onClick={addProvider}>
              Add Service Provider
            </button> : "" }
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80"
          alt="Home Services"
          className="w-full md:w-1/2 rounded-2xl shadow-lg mt-10 md:mt-0"
        />
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 px-4 md:px-16">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-10">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {services.map((service) => (
            <div
              key={service.name} onClick={()=>serviceBtn(service.name)}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform cursor-pointer group"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-blue-800 mb-2 group-hover:text-cyan-600 transition">{service.name}</h3>
              <p className="text-gray-600 text-center">{service.description}</p>
            </div>
          ))}
        </div>
      </section>
      

      {/* About Section */}
      <section id="about" className="py-16 px-4 md:px-16 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-700 mb-4">Why Choose HandyBook?</h2>
          <p className="text-gray-700 text-lg mb-6">
            We connect you with verified and experienced professionals for all your home service needs. Enjoy hassle-free booking, transparent pricing, and top-notch service quality.
          </p>
          <div className="flex flex-col md:flex-row gap-8 justify-center mt-8">
            <div className="flex-1 bg-blue-50 rounded-lg p-6 shadow">
              <h3 className="font-semibold text-blue-800 mb-2">Verified Experts</h3>
              <p className="text-gray-600">All our professionals are background-checked and highly rated.</p>
            </div>
            <div className="flex-1 bg-blue-50 rounded-lg p-6 shadow">
              <h3 className="font-semibold text-blue-800 mb-2">Easy Booking</h3>
              <p className="text-gray-600">Book your service in just a few clicks, anytime, anywhere.</p>
            </div>
            <div className="flex-1 bg-blue-50 rounded-lg p-6 shadow">
              <h3 className="font-semibold text-blue-800 mb-2">Customer Support</h3>
              <p className="text-gray-600">Our team is here to help you 24/7 with any queries or issues.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 md:px-16 bg-gradient-to-r from-cyan-100 to-blue-100">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-700 mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-6">
            Have questions or need help? Reach out to us and we'll get back to you as soon as possible.
          </p>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <textarea
              placeholder="Your Message"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={4}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

     

      {/* Footer */}
      <footer className="bg-white py-6 text-center text-gray-500 mt-8 shadow-inner">
        &copy; {new Date().getFullYear()} HandyBook. All rights reserved.
      </footer>
    </div>
  );
}

export default HomePage