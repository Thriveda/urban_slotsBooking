import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

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

function Services() {
  const navigate = useNavigate()
  function serviceBtn(category){
    navigate(`/${category}`)
  }
  return (
    <div>
      <Navbar />
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
    </div>
  )
}

export default Services
