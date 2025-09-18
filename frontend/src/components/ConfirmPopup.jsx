import Cookies from "js-cookie"
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function ConfirmPopup(props) {
    const {providerData, slotDetail, setBookBtn} = props

    const [confirm, setConfirm] = useState(false)
    const navigate = useNavigate()
    const user = Cookies.get("user")
    const parsedUser = user ? JSON.parse(user) : null;
    const userId = parsedUser?._id;
   
    console.log(parsedUser)
    const idDetails = {
        providerId:providerData?._id,
        slotId:slotDetail?._id,
        userId: userId
    }
    console.log(idDetails)

    async function confirmBooking(){
      setConfirm(true)
        const opt = {
        method: "POST",
        headers:{
          "Content-Type" : "application/json",
          Accept : "application/json"
        }, 
        body: JSON.stringify(idDetails)
      }
      const response = await fetch("https://urban-slotsbooking-backend.onrender.com/slot/confirm", opt)
      const jsonResponse = await response.json()
      console.log(jsonResponse)

      
    }
    function cancelBtn(){
      setBookBtn(false)
    }
    
   
  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
    <div className="bg-white w-full max-w-md mx-4 rounded-2xl shadow-2xl border border-blue-100">
      {confirm ? <div className="p-6 flex flex-col justify-center items-center">
        <h1 className="text-xl font-bold text-blue-800 mb-4">Booked Successfully !!</h1>
        <p>Thankyou for Booking 😊😊</p>
        <button className={`w-full py-2.5 rounded-lg font-semibold transition-colors mt-6 ${
                "bg-cyan-600 text-white hover:bg-cyan-700"
            }`} onClick={()=>navigate("/viewbookings")}>View Booking</button>
      </div>
      :<div className="p-6">
        <h3 className="text-xl font-bold text-blue-800 mb-4">Confirm Booking</h3>

        <div className="space-y-3 text-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Provider</span>
            {providerData && <span className="font-semibold">{providerData.name}</span>}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Email</span>
            {providerData && <span className="font-semibold">{providerData.email}</span>}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Selected Slot</span>
            {providerData && <span className="font-semibold">{slotDetail.startTime}</span>}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            onClick={cancelBtn}
            className="w-full py-2.5 rounded-lg font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={confirmBooking}
            className={`w-full py-2.5 rounded-lg font-semibold transition-colors ${
                "bg-cyan-600 text-white hover:bg-cyan-700"
            }`}
          >
           Confirm Booking
          </button>
        </div>
      </div>}
    </div>
  </div>
  )
}

export default ConfirmPopup
