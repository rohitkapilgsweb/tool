import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Getwhatsapprequest } from "../redux/actions/LoginAction";
import { getUserId } from "../utils/auth";


function WhatsappRequest() {
  const [status, setStatus] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Getwhatsapprequest({ userObjectId: getUserId()?.id })).then(
      (res) => {
        console.log(res?.payload?.status, "resresrers");
        setStatus(res?.payload);
      }
    );
  }, [getUserId()]);
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
                      <th scope="col">Email</th>
                      <th scope="col">Role</th>
                      <th scope="col">Created Date</th>
                      <th scope="col">Updated Date</th>
                    </tr>
                  </thead>
                  <tbody className={status?.status === false ? "w-100 d-flex h-100 justify-content-center align-items-center": ""}>
                   
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
