import React, { useEffect, useState } from 'react'
import { Field } from 'react-final-form'
import { Form } from 'react-final-form'
import { useDispatch, useSelector } from 'react-redux'
import { GoogleApi } from '../../redux/actions/LoginAction'
import Loader from '../Components/Loader'
import axios from 'axios'
import { PLACE_API_KEY } from '../../config/config'
import Pagination from 'react-bootstrap/Pagination';
import { toast } from 'react-toastify'
import * as XLSX from 'xlsx';
import { IoMdCloudDownload } from 'react-icons/io'
function Google() {
  


const [getdata, setGetdata] = useState([]);
const dispatch = useDispatch();

const onSubmit = async (values) => {
  console.log(JSON.stringify(values));
  dispatch(GoogleApi({ msg_body: JSON.stringify(values?.search) }));
};

const GooglePlaceData = useSelector((state) => state?.GooglePlaceSearch?.GoogleApi?.place_id);
const statuss = useSelector((state) => state?.GooglePlaceSearch?.GoogleApi?.status);
const isLoading = useSelector((state) => state?.GooglePlaceSearch?.isLoading);
const tokenNext = useSelector((state) => state?.GooglePlaceSearch?.GoogleApi?.next_page);
console.log(isLoading)
const fetchUserData = async (Place_Id) => {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?fields=name,formatted_phone_number,formatted_address,url,photo&place_id=${Place_Id}&key=${PLACE_API_KEY}`;
  try {
    const phoneData = await fetch(url);
    const userData = await phoneData?.json();
    return userData?.result;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};


const handleDataFetching = async () => {
  const promises = GooglePlaceData?.map((item) => fetchUserData(item));
  const userDataArray = await Promise.all(promises);
  
  // Filter out null values (in case of errors)
  const filteredUserData = userDataArray.filter((userData) => userData !== null);
  
  // Set the final data
  setGetdata(filteredUserData);
};

useEffect(() => {
  if (GooglePlaceData?.length > 0) {
    handleDataFetching();
  }

}, [GooglePlaceData]);

// Next Page
const notify = (msg) => toast(msg);

const nextOnclick = () =>{
dispatch(GoogleApi({next_page: tokenNext}))
if(statuss){
  notify(statuss)
}


localStorage.setItem('old_page', tokenNext)
}
const backOnclick = () =>{
  const Old_Token = localStorage.getItem('old_page')
dispatch(GoogleApi({next_page: Old_Token}))
}




  const downloadExcel = (getdata) => {
    const worksheet = XLSX.utils.json_to_sheet(getdata);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "DataSheet_GoogleMap_place.xlsx");
  };


  return (
    <div className='px-4'>
  
{isLoading && <Loader />}
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
                      {getdata && (<button className='Data_export_btn' onClick={()=>downloadExcel(getdata)}>
   <IoMdCloudDownload size={45}/>
</button>) }
                    
                  
                        {getdata?.map((item,index)=>{
                          return(
                            <div key={index} className='place-card d-flex gap-3 mb-3 border py-3 px-3 rounded'>
                            <div className='place-img'>
                            </div>
                            <div className='place-body'>
                            <h5>{item?.name}</h5>
                            <p className='m-auto'>{item?.formatted_address}</p>
                            <p className='m-auto'>{item?.formatted_phone_number}</p>
                            <a  href={item?.url} target="_blank" rel="noopener noreferrer">
                          Direction
                            </a>
                            </div>
                          </div>
                          )
                        })}

<Pagination>
      <Pagination.Prev onClick={backOnclick} />
      <Pagination.Next onClick={nextOnclick} />
    </Pagination>
                    </div>
                  </div>
                </div>
                </div>
  )
}

export default Google