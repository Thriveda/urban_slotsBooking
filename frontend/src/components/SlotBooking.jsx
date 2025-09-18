import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ConfirmPopup from "./ConfirmPopup";

function ServiceProviderBooking() {
  const {category, id } = useParams();
  const navigate = useNavigate();
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [providerData, setProviderData] = useState(null);
  const [slotDetail, setSlotDetail] = useState(null)
  const [bookBtn, setBookBtn] = useState(false)
  const [bookedslots, setBookedSlots] = useState([])

 
  
const providerId = providerData?._id
console.log(providerId)

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 18; hour++) {
      const time = hour >= 12 ?  `${hour}:00 PM` : 
                   `${hour}:00 AM`;
      slots.push({
        id: hour,
        time: time,
        
      });
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();


  const handleSlotSelect = (slot) => {
      setSelectedSlot(slot);
  };
  function getDetails(){
    async function fn(){
      const response = await fetch(`https://urban-slotsbooking-backend.onrender.com/serviceprovider/${category}/${id}`)
      const jsonResponse = await response.json()
      console.log(jsonResponse)
      if(response.ok){
        setProviderData(jsonResponse.provider)
      }
    }
    fn()
  }

  useEffect(getDetails, [])

  console.log(providerData)

  function bookedSlots(){
    async function fn(){
      if(providerData){
          const response =await fetch(`https://urban-slotsbooking-backend.onrender.com/slot/${providerId}`)
          const jsonResponse = await response.json()
          console.log(jsonResponse)
          setBookedSlots(jsonResponse)
      }
      
    }
    fn()
  }
  // console.log(slots)
  console.log(JSON.stringify(bookedslots, null, 2))


  useEffect(bookedSlots,[providerData])


  async function handleBookSlot () {
    if (selectedSlot) {      
      const slotDetails = {
        providerId:`${id}`,
        startTime: selectedSlot.time,
        endTime: selectedSlot.id >11 ?`${selectedSlot.id+1}:00 PM` : `${selectedSlot.id+1}:00 PM`,
        price: 600
      }

      const opt = {
        method: "POST",
        headers:{
          "Content-Type" : "application/json",
          Accept : "application/json"
        }, 
        body: JSON.stringify(slotDetails)
      }
      const response = await fetch("https://urban-slotsbooking-backend.onrender.com/provider/createslot", opt)
      const jsonResponse = await response.json()
      console.log(jsonResponse)
      setSlotDetail(jsonResponse)
      setBookBtn(true)

    }
  };

  

  

// console.log(selectedSlot)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-100">
      <div className="bg-white shadow-sm max-w-screen mx-auto px-4 sm:px-6 lg:px-8">        
          <div className="flex justify-between items-center py-6">
            <button
              onClick={() => navigate(`/${category}`)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
            >
              ← Back
            </button>
          </div>    
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
          <div className="bg-white rounded-xl shadow-lg p-8">
           {providerData && <h1 className="text-3xl font-bold text-blue-800 mb-6">Book with {providerData.name}</h1>}
            <div className="space-y-4 mb-6">
              <div className="flex items-center">
                <div className="bg-cyan-100 rounded-full p-2 mr-3">
                  <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Experience</p>
                  {providerData && <p className="font-semibold text-gray-800">{providerData.experience} years</p>}
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-blue-100 rounded-full p-2 mr-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  {providerData && <p className="font-semibold text-gray-800">{providerData.email}</p>}
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-cyan-100 rounded-full p-2 mr-3">
                  <svg  fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-cyan-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone Number</p>
                  {providerData && <p className="font-semibold text-gray-800">{providerData.phoneNo}</p>}
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-blue-100 rounded-full p-2 mr-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Price</p>
                  {providerData && <p className="font-semibold text-gray-800">{providerData.price}</p>}
                </div>
              </div>
            </div>    
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-blue-800 mb-6">Available Time Slots</h2>
            <p className="text-gray-600 mb-6">Select a time slot for your appointment</p>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
              {timeSlots.map((slot) => {
                const isBooked = bookedslots.some(
                  (booked) => booked.slotId.startTime === slot.time
                );

                return (
                  <button
                    key={slot.id}
                    onClick={() => handleSlotSelect(slot)}
                    disabled={isBooked} 
                    className={`p-3 rounded-lg font-semibold transition-colors duration-200 ${
                      isBooked
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : selectedSlot?.id === slot.id
                        ? "bg-cyan-600 text-white shadow-lg"
                        : "bg-blue-50 text-blue-800 hover:bg-blue-100 border border-blue-200"
                    }`}
                  >
                    {slot.time}
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleBookSlot}
              disabled={!selectedSlot}
              className={`w-full py-3 rounded-lg font-semibold transition-colors duration-200 ${
                selectedSlot
                  ? 'bg-cyan-600 text-white shadow-lg hover:bg-cyan-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Book Slot
            </button>
          </div>
        </div>
      </div>
      {bookBtn && <ConfirmPopup providerData ={providerData} slotDetail={slotDetail} setBookBtn={setBookBtn}/>}
    </div>
  );
}

export default ServiceProviderBooking;