import { Link, useNavigate } from "react-router-dom"
import Cookies from "js-cookie"

function Navbar() {
    const navigate = useNavigate()
    const token = Cookies.get("jwToken")
    console.log(token)

    function loginBtn(){
        navigate("/login", {replace:true})
        Cookies.remove("jwToken")
    }
    function LogoBtn(){
      navigate("/")
    }
    return (
    <header className="bg-white shadow-md py-6 px-4 md:px-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={LogoBtn} className="flex flex-row"><svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M6.05 17.95l-1.414 1.414m12.728 0l-1.414-1.414M6.05 6.05L4.636 4.636" />
          </svg>
          <span className="text-2xl font-bold text-blue-700">UrbanEASE</span>
          </button>
        </div>
        <nav className="hidden md:flex gap-8 text-gray-600 font-medium">
          <Link to="/services" className="hover:text-blue-600 transition">Services</Link>
          <a href="#about" className="hover:text-blue-600 transition">About</a>
          <a href="#contact" className="hover:text-blue-600 transition">Contact</a>
          <Link to="/viewbookings" className="hover:text-blue-600 transition">Booked Slots</Link>
        </nav>
        <button
          className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition" onClick={loginBtn}
        >
          {token ? "Logout" : "Login"}
         </button>
      </header>
  )
}

export default Navbar
