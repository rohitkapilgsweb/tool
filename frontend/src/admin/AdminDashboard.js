import React, { useEffect, useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { Chart } from "react-google-charts";
import { UserMebership, users } from '../redux/actions/LoginAction';
import moment from "moment";
import Select from 'react-select';
import { FiEdit, FiEdit2 } from "react-icons/fi";
import { toast } from 'react-toastify';
import Loader from '../Page/Components/Loader';
function AdminDashboard() {
const dispatch = useDispatch()

const [activeUpdate, SetActiveUpdate] =useState(0)

const IsUpdating = useSelector((state)=> state?.updateUser?.isLoading)
const IsLoadings = useSelector((state)=> state?.users?.isLoading)
const UserData = useSelector((state)=> state?.users?.Allusers?.data)


useEffect(()=>{
    dispatch(users()).then((res)=>{
      console.log(UserData)
    })

},[!UserData])
const data = [
  [
    "Date",
    "Users",
  ],
  ["",0]
];

console.log(UserData)
const counts = {};


for (let i = 0; i < UserData?.length; i++) {
  const date = moment(UserData[i]?.created_at).utc().format('YYYY-MM-DD');

  if (counts[date]) {
    counts[date]++; // Increment the count for this date
  } else {
    counts[date] = 1; // Initialize the count to 1 for this date
  }
}

for (const date in counts) {
  data.push([date, counts[date]]);
}



 const options = {
    chart: {
      title: "User Report",
      subtitle: `Total Users: ${UserData?.length}`,
    },
  };

  const colourOptions = [
    { value: 'free', label: 'Free'},
    { value: 'stater', label: 'Stater'},
    { value: 'business', label: 'Business'}
  ]

  const handelChange=(e,id)=>{
    const meberUpdate = {
      id:e.value,id,
      update:{
        membership:e?.value
      }
    }
    dispatch(UserMebership(meberUpdate)).then((res)=>{
      toast(res?.payload?.message)
      dispatch(users())
      SetActiveUpdate(0)
    })
  }
  return (
    <div className="container">
      {IsLoadings || IsUpdating &&  <Loader/>}

     <div className="row justify-content-center align-items-center g-2">
      <div className="col-12">
    <div className='userFlow shadow-sm border mt-3 rounded-5 p-5 '>
    <Chart
      chartType="Line"
      width="100%"
      height="300px"
      data={data}
      options={options}
    />
    </div>
    <div className='mt-4 mb-5'>
      <div className="table-responsive meintable border rounded-2">
        <table className="table position-relative w-100">
          <thead className='bg-light sticky-top top-0'>
            <tr >
              <th scope="col">Sr no.</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile</th>
              <th scope="col">Role</th>
              <th scope="col">Member Ship</th>
              <th scope="col">Created Date</th>
            </tr>
          </thead>
          <tbody>
            {UserData?.map((item,key)=>{
            return(
              <tr className="" key={key}>
                <td>{item?.id}</td>
              <td scope="row">{item?.name}</td>
              <td>{item?.email}</td>
              <td>{item?.phone}</td>
              <td>{item?.role}</td>
              <td>
              {activeUpdate !== item?.id ? item?.membership : 
               <Select
               onChange={(e)=>handelChange(e,item?.id)}
                options={colourOptions}
              /> 
               }
             
             {activeUpdate !== item?.id && <button type="button" className="btn rounded" onClick={()=>SetActiveUpdate(item?.id)}><FiEdit2  /></button>}
              </td>
              <td>{moment(item?.created_at).utc().format('DD-MM-YYYY')}</td>
            </tr>
            )
            })}
           
          </tbody>
        </table>
      </div>
      
    </div>
      </div>
      
     </div>
    </div>
  )
}

export default AdminDashboard
