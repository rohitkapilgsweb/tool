import React, { useEffect, useState } from "react";
import { UserMebership, users } from "../redux/actions/LoginAction";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit2 } from "react-icons/fi";
import Select from "react-select";
import moment from "moment";
import { toast } from "react-toastify";
function Users() {
  const dispatch = useDispatch();
  const [activeUpdate, SetActiveUpdate] = useState(0);
  const UserData = useSelector((state) => state?.users?.Allusers?.data);

  useEffect(() => {
    dispatch(users());
  }, [!UserData]);

  const colourOptions = [
    { value: "free", label: "Free" },
    { value: "stater", label: "Stater" },
    { value: "business", label: "Business" },
  ];

  const handelChange = (e, id) => {
    const meberUpdate = {
      id: e.value,
      id,
      update: {
        membership: e?.value,
      },
    };
    dispatch(UserMebership(meberUpdate)).then((res) => {
      toast(res?.payload?.message);
      dispatch(users());
      SetActiveUpdate(0);
    });
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="mt-4 mb-5">
            <div className="table-responsive meintable border rounded-2">
              <table className="table position-relative w-100">
                <thead className="bg-light sticky-top top-0">
                  <tr>
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
                  {UserData?.map((item, key) => {
                    return (
                      <tr className="" key={key}>
                        <td>{item?.id}</td>
                        <td scope="row">{item?.name}</td>
                        <td>{item?.email}</td>
                        <td>{item?.phone}</td>
                        <td>{item?.role}</td>
                        <td>
                          {activeUpdate !== item?.id ? (
                            item?.membership
                          ) : (
                            <Select
                              onChange={(e) => handelChange(e, item?.id)}
                              options={colourOptions}
                            />
                          )}

                          {activeUpdate !== item?.id && (
                            <button
                              type="button"
                              className="btn rounded"
                              onClick={() => SetActiveUpdate(item?.id)}
                            >
                              <FiEdit2 />
                            </button>
                          )}
                        </td>
                        <td>
                          {moment(item?.created_at).utc().format("DD-MM-YYYY")}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
