import React, { useEffect, useState } from "react";
import { BiTimeFive } from "react-icons/bi";
import { BsFacebook } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { detelePost, getAllPost } from "../../../redux/actions/LoginAction";
import Dropdown from "react-bootstrap/Dropdown";
import Loader from "../../Components/Loader";
import { SlOptionsVertical } from "react-icons/sl";

function List() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state?.getPosts?.isLoading);
  const dataPost = useSelector((state) => state?.getPosts?.data);
  const AllFacebookPage = useSelector(
    (state) => state?.getPages?.getFacebookPages.data
  );

  useEffect(() => {
    dispatch(getAllPost());
  }, [!dataPost]);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const dayOfWeek = date.getDay();
    const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const abbreviatedDayOfWeek = daysOfWeek[dayOfWeek];

    return `${day}/${month} ${abbreviatedDayOfWeek} ${hours}:${minutes}`;
  };
  const DeletePost = (id,page_name) => {
    AllFacebookPage?.map((item)=>{
      if(item?.name === page_name){

        const deletePayload = {
          post_id: id,
          token: item?.access_token
        }
        console.log(deletePayload)
        dispatch(detelePost(deletePayload)).then((res) => {
          dispatch(getAllPost());
        });
      }
    })

    
  };

  return (
    <div className="list-sections">
      {isLoading ? <Loader /> :""}
      <div className="container px-lg-0">
        <div className="row">
          {dataPost.length === 0 && <div className="col-md-12"> <p className="m-auto text-center fs-5">No Data Found</p> </div>}
          {dataPost
            ?.slice()
            ?.reverse()
            ?.map((item) => {
              return (
                <div key={item?.id} className="col-md-4 mb-4">
                  <div
                    data-post-id={item?.post_id}
                    className="list-card border py-3 px-3 rounded position-relative col" >
                    <div className="row">
                      <div className="col-12">
                        <div className="social-icons-img">
                          <BsFacebook color="#1877F2" size={35} />
                        </div>
                        <div className="d-flex gap-3 mb-2">
                          <button className="btn-publish d-block">
                            {item?.post_status}
                          </button>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="success"
                              id="dropdown-basic"
                              className="bg-white border-0 p-0 "
                            >
                              <SlOptionsVertical color="#000" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item
                                href="#/Delete"
                                onClick={() => DeletePost(item?.post_id,item?.page_name)}
                              >
                                Delete
                              </Dropdown.Item>
                              <Dropdown.Item href="#/Edit">Edit</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="card-body text">
                          {/* <h1>{item?.msg}</h1> */}
                          <p>
                            {item?.link &&  item?.msg === null ? item?.link : item?.msg?.slice(0, 80)}
                            {!item?.link && item?.msg?.length > 50 ? "..." : ""}
                          </p>
                        </div>
                        {item?.media && (
                          <div
                            className="card-img"
                            style={{
                              height: "200px",
                              overflow: "hidden",
                              border: "2px solid #f7f7f7",
                              borderRadius: "10px",
                            }}
                          >
                            <img
                              className="img-fluid"
                              style={{
                                height: "100%",
                                width: "100%",
                                objectFit: "cover",
                                objectPosition: "center",
                              }}
                              src={item?.media}
                              alt=""
                            />
                          </div>
                        )}

                        <div className="card-footer mt-3">
                          <p className="m-0">
                            <BiTimeFive size={24} />{" "}
                            {formatTimestamp(item?.created_at)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default List;
