import React, { useEffect } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { Chart } from "react-google-charts";
import { users } from '../redux/actions/LoginAction';
import moment from "moment";
import Loader from '../Page/Components/Loader';
function AdminDashboard() {
const dispatch = useDispatch()


const UserData = useSelector((state)=> state?.users?.Allusers)
const IsLoadings = useSelector((state)=> state?.users?.isLoading)
useEffect(()=>{
    dispatch(users()) 
},[!UserData])

const data = [
  [
    "Date",
    "Users",
  ],
  ["",0]
];

const counts = {};

for (let i = 0; i < UserData.length; i++) {
  const date = moment(UserData[i]?.createdAt).utc().format('YYYY-MM-DD');

  if (counts[date]) {
    counts[date]++; // Increment the count for this date
  } else {
    counts[date] = 1; // Initialize the count to 1 for this date
  }
}

for (const date in counts) {
  data.push([date, counts[date]]);
}

console.log(data);



 const options = {
    chart: {
      title: "User Report",
      subtitle: `Total Users: ${UserData.length}`,
    },
  };
  
  return (
    <div className="container">
      {IsLoadings && <Loader/>}
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
              <th scope="col">Role</th>
              <th scope="col">Created Date</th>
              <th scope="col">Updated Date</th>
            </tr>
          </thead>
          <tbody>
            {console.log(UserData)}
            {UserData.map((item,key)=>{
return(
  <tr className="" key={key}>
    <td>{key+1}</td>
  <td scope="row">{item.username}</td>
  <td>{item.email}</td>
  <td>{item.role}</td>
  <td>{moment(item.createdAt).utc().format('DD-MM-YYYY')}</td>
  <td>{moment(item.updatedAt).utc().format('DD-MM-YYYY')}</td>
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
