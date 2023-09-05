import React from 'react'
import { Field } from 'react-final-form'
import { Form } from 'react-final-form'
import { useDispatch, useSelector } from 'react-redux'
import { GoogleApi } from '../../redux/actions/LoginAction'
import axios from 'axios'
import { PLACE_API_KEY } from '../../config/config'

function Google() {

  const dispatch = useDispatch()
  const onSubmit = async values => {
    console.log(JSON.stringify(values))
    dispatch(GoogleApi({msg_body:JSON.stringify(values.search)}))
    GooglePlaceData.map((item)=>{
      getUserData(item.place_id)
    })

  
  }
  const GooglePlaceData =  useSelector((state)=>state?.GooglePlaceSearch?.GoogleApi?.results)
  const tokenNext =  useSelector((state)=>state?.GooglePlaceSearch?.GoogleApi?.next_page_token) 

  async function getUserData(Place_Id) { 
   
  const url = `https://maps.googleapis.com/maps/api/place/details/json?fields=formatted_phone_number&place_id=${Place_Id}&key=${PLACE_API_KEY}`
  try{
    const phoneData = await  fetch(url);
    const userData = await phoneData.json();
    console.log(userData?.result?.formatted_phone_number,"details")
  }
  catch (error){
    console.error("Error fetching user data:", error);
  }
}

  console.log(GooglePlaceData)
  return (
    <div className='px-4'>
  

      <div className="container">
        <div className="row">
          <div className="col-md-12">
          <Form
                onSubmit={onSubmit}
                render={({ handleSubmit, form, submitting, pristine, values }) => (
                  <form onSubmit={handleSubmit}>

                <Field
                          className="form-control w-50"
                          name="search"
                          component="input"
                          type="search"
                          placeholder="Search Business"
                        />
                    <button  className="mt-3 mb-3 bg-black btn text-white" type="submit" disabled={submitting || pristine}>
                        Search
                      </button>
                  </form>
                  
                )}/>
                
          </div>
        </div>
      </div>

                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                
                      {GooglePlaceData?.map((item,index)=>{
                        return(
                          <div key={index} className='place-card d-flex gap-3 mb-4'>
                          <div className='place-img'>
                            <img src={item?.icon} alt="" />
                          </div>
                          <div className='place-body'>
                          <h5>{item?.name}</h5>
                          <p className='m-auto'>{item?.formatted_address}</p>
                          {item?.formatted_phone_number}
                          <a  href={`https://www.google.com/search?q=${item?.name.replace(/\s+/g, '+')}+${item?.formatted_address.replace(/\s+/g, '+')}`} target="_blank" rel="noopener noreferrer">
                         Direction
                          </a>
                          </div>
                        </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
                </div>
  )
}

export default Google