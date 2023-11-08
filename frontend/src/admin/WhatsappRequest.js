import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Getwhatsapprequest } from "../redux/actions/LoginAction";
import { getUserId } from "../utils/auth";


function WhatsappRequest() {
  const [status, setStatus] = useState(false);
console.log(getUserId()?.id)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Getwhatsapprequest({ userObjectId: getUserId()?.id })).then(
      (res) => {
        console.log(res?.payload?.status, "resresrers");
        setStatus(res?.payload);
      }
    );
  }, []);
  return (
    <div className="container">
      <div className="row justify-content-center align-items-center g-2">
        <div className="col-12">
            <div className="mt-4 mb-5">
              <div className="table-responsive meintable border rounded-2">
                <table className="table position-relative w-100">
                  <thead className="bg-light sticky-top top-0">
                    <tr>
                      <th scope="col">Sr no.</th>
                      <th scope="col">Name</th>
                      <th scope="col">Mobile</th>
                      <th scope="col">Business Type</th>
                    </tr>
                  </thead>
                  <tbody className={status?.status === false ? "w-100 d-flex h-100 justify-content-center align-items-center": ""}>
                 
                   {status?.data?.map((item, index)=>{
                    return (
                      <>
                       <tr>
                      <td key={index}>{index + 1}</td>
                      <td key={index}>{item?.fullName}</td>
                      <td key={index}>{item?.number}</td>
                      <td key={index}>{item?.businessType}</td>
                      </tr>
                      </>
                    )
                   })}
                      {status?.status === false && ( 
                      <>
                      {status?.message}
                      </>
                    )}
                    
                  </tbody>
                </table>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default WhatsappRequest;
