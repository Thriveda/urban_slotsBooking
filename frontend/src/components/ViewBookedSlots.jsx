import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"

function ViewBookings() {
  const navigate = useNavigate();
  
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  const user =  Cookies.get("user")
  const parsedUser = user ? JSON.parse(user) : null;
  const user_id = parsedUser?._id;
  console.log(user_id)

  async function fetchBookings() {
    try {    
      setError(null)      
      const response = await fetch(`https://urban-slotsbooking-backend.onrender.com/viewbooking/${user_id}`)
      const jsonResponse = await response.json()
      console.log(jsonResponse)     
      if (!response.ok) {
        throw new Error("Failed to load bookings");
      }     
      setBookings(jsonResponse.booking)
    } 
    catch (err) {
      setError(err.message || "Something went wrong");
    } 
  }

  useEffect(() => {
    fetchBookings()
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-100">
      <div className="bg-white shadow-sm max-w-screen mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold text-blue-800">Your Bookings</h1>
          <div className="w-[96px]" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          
          {error && <p className="text-red-600 font-medium">{error}</p>}
          {bookings.length === 0 && (
            <p className="text-gray-600">No confirmed bookings yet.</p>
          )}

          <div className="space-y-4">
            {bookings.map((b) => (
              <div
                key={`${b?.providerId?.email}`}
                className="border border-blue-100 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between hover:shadow-md transition"
              >
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-blue-800">
                    {b?.providerId?.name || "Service Provider"}
                  </h3>

                  <div className="flex items-center text-sm text-gray-700">
                    <div className="bg-blue-100 rounded-full p-1.5 mr-2">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="font-medium">{b?.providerId?.email || "-"}</span>
                  </div>

                  <div className="flex items-center text-sm text-gray-700">
                    <div className="bg-cyan-100 rounded-full p-1.5 mr-2">
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-cyan-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                      </svg>
                    </div>
                    <span className="font-medium">{b?.providerId?.phone || "9876543210"}</span>
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-700">
                  <div className="bg-purple-100 rounded-full p-1.5 mr-2">
                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-7 8h8a2 2 0 002-2V6a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="font-medium">
                    {b?.providerId?.category || b?.category || "-"}
                  </span>
                </div>

                <div className="flex items-center text-sm text-gray-700">
                  <div className="bg-emerald-100 rounded-full p-1.5 mr-2">
                    <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-10v-2m0 12v2" />
                    </svg>
                  </div>
                  <span className="font-medium">
                    {b?.slotId?.price ?? b?.price ?? 600}
                  </span>
                </div>
                
                <div className="mt-4 sm:mt-0">
                  <div className="flex items-center">
                    <div className="bg-cyan-100 rounded-full p-2 mr-3">
                      <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Slot Time</p>
                      <p className="font-semibold text-gray-800">
                        {b?.slotId?.startTime} {b?.endTime ? `- ${b?.slotId?.endTime}` : ""}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export default ViewBookings;