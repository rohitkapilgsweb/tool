import React, { useEffect, useState } from 'react'
import { Field } from 'react-final-form'
import { Form } from 'react-final-form'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../Components/Loader'
import axios from 'axios'

import Pagination from 'react-bootstrap/Pagination';
import { toast } from 'react-toastify'
import * as XLSX from 'xlsx';
import { IoMdCloudDownload } from 'react-icons/io'
import {FaDirections} from 'react-icons/fa'
import {RiContactsBook2Line} from 'react-icons/ri'
import {TbLocationFilled} from 'react-icons/tb'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { PLACE_API_KEY } from '../../../config/config'
import { GoogleApi } from '../../../redux/actions/LoginAction'

function PlaceSearch() {


    

const [getdata, setGetdata] = useState([]);
const [show, setShow] = useState(false);
const dispatch = useDispatch();

const onSubmit = async (values) => {
  console.log(JSON.stringify(values));
  dispatch(GoogleApi({ msg_body: JSON.stringify(values?.search) }));

  setShow(true)
};

const GooglePlaceData = useSelector((state) => state?.GooglePlaceSearch?.GoogleApi?.place_id);
const statuss = useSelector((state) => state?.GooglePlaceSearch?.GoogleApi?.status);
const isLoading = useSelector((state) => state?.GooglePlaceSearch?.isLoading);
const tokenNext = useSelector((state) => state?.GooglePlaceSearch?.GoogleApi?.next_page);
console.log(isLoading)
const fetchUserData = async (Place_Id) => {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?fields=name,formatted_phone_number,formatted_address,url,photo,business_status&place_id=${Place_Id}&key=${PLACE_API_KEY}`;
  try {
    const phoneData = await fetch(url,{

    });
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
    <div className=''>{isLoading && <Loader />}


    <div className="container">
      <div className="row">
        <div className="col-md-12">
        <Form
              onSubmit={onSubmit}
              render={({ handleSubmit, form, submitting, pristine, values }) => (
                <form onSubmit={handleSubmit}>

<h1 className='text-center mb-4'>
  Extract Google Place Data
  </h1>
             <div className='d-flex gap-3 align-item-center justify-content-center mt-2 mb-4'>
             <Field
                        className="form-control w-50 "
                        name="search"
                        component="input"
                        type="search"
                        placeholder="Search Business"
                      />
                  <button  className=" bg-black btn text-white" type="submit" disabled={submitting || pristine}>
                      Search
                    </button>
             </div>
                </form>
                
              )}/>
              
        </div>
      </div>
    </div>

              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    {show && (<button className='Data_export_btn' onClick={()=>downloadExcel(getdata)}>
 <IoMdCloudDownload color='#fff' size={45}/>
</button>) }
                  
                
                      {getdata?.map((item,index)=>{
                        return(
                          <div key={index} className='place-card d-flex gap-3 mb-3 border py-3  rounded shadow-sm'>
                          <div className='place-img'>
                          </div>
                          <div className='place-body'>
                         <lable className="btn  mb-3 fs-1 py-1 pointer-event-none px-2 ">{item?.business_status}</lable>
                          <h5>{item?.name}</h5>
                          <p className='m-auto'><span><TbLocationFilled color='#F7634C' size={20}/></span>&nbsp; {item?.formatted_address}</p>
                         {item?.formatted_phone_number && ( <p className='m-auto mt-2'><span><BsFillTelephoneFill color='#32D3E4' size={20}/></span>&nbsp; {item?.formatted_phone_number}</p>)}
                          <a className='mt-2 d-block'  href={item?.url} target="_blank" rel="noopener noreferrer">
                      <FaDirections color='#4DDA4A' size={20}/>&nbsp; Direction
                          </a>
                          </div>
                        </div>
                        )
                      })}

                      {show ? (
                        <Pagination>
    <Pagination.Prev onClick={backOnclick} />
    <Pagination.Next onClick={nextOnclick} />
  </Pagination>
                      ) :""}


                  </div>
                </div>
              </div></div>
  )
}

export default PlaceSearch