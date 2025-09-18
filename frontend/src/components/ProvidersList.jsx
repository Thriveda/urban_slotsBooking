import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ServiceProviderDetail() {
  const { servicename } = useParams();
  const [providerList, setProviderList] = useState([])
  const navigate = useNavigate();

  function getProviders(){
    async function fn(){
        const response = await fetch(`https://urban-slotsbooking-backend.onrender.com/serviceprovider/${servicename}`)
        const jsonResponse = await response.json()
        console.log(jsonResponse)
        if (response.ok){
            setProviderList(jsonResponse.list)
        }
    }
    fn()
  }

  useEffect(getProviders, [])

  function slotDetailBtn(providerId, category){
    navigate(`/serviceprovider/${category}/${providerId}`)
  }
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-100">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
        <button onClick={() => navigate("/services")}
            className="bg-cyan-600 text-white px-6 py-2 rounded-lg font-semibold hover:hover:bg-cyan-700 transition-colors duration-200"
        >← Back
        </button>
        </div>
      </div>

      {/* Provider Details */}
      <div className="flex flex-col justify-center items-center  max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h3 className="text-2xl font-semibold text-blue-700 mb-3">{servicename}'s List</h3>
        {/* Provider Info */}
        <div className="">
            {providerList.map((each)=>{
                return(
                    <div className="flex flex-col justify-center items-center gap-4 bg-white rounded-xl shadow-lg p-8 w-[300px] mb-4">
                        <h2 className="text-xl font-bold">{each.name}</h2>                        
                        <p className="font-semibold">Experience: <span className="font-bold">{each.experience} </span>years</p>
                        <p className="font-semibold">Price: ₹<span className="font-bold">{each.price} </span></p>
                        <p className="font-semibold">Phone Number: <span className="font-bold">{each.phoneNo} </span></p>
                        <button className="bg-cyan-600 text-white px-3 py-2 rounded-lg font-semibold shadow-lg hover:bg-cyan-700 transition-colors duration-200 w-full md:w-auto"
                        onClick={()=>slotDetailBtn(each._id, each.category)}>
                            Book Now
                        </button>                    
                    </div>
                )
            })

            }
        </div>    
      </div>
    </div>

  );
}

export default ServiceProviderDetail;