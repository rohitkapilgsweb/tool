import React from "react";
import PostImgs from "../../../assets/img/Rectangle 43.jpg";
import { BiTimeFive } from "react-icons/bi";
import { BsFacebook } from "react-icons/bs";

function List() {
  return (
    <div className="list-sections">
      <div className="container px-lg-0">
        <div className="row">
          <div className="col-md-4">
            <div className="list-card border py-3 px-3 rounded position-relative col">
              <div className="row">
                <div className="col-12">
                  <div className="social-icons-img">
                    <BsFacebook color="#1877F2" size={35} />
                  </div>
                  <button className="btn-publish d-block">Published</button>
                </div>
                <div className="col-md-12">
                  <div className="card-body text">
                    <h1>Want to save time and increase your productivity?</h1>
                    <p>
                      To save time, increase productivity, and contribute to job
                      growth, here are so...
                    </p>
                  </div>
                  <div className="card-img">
                    <img className="img-fluid" src={PostImgs} alt="" />
                  </div>
                  <div className="card-footer mt-3">
                    <p className="m-0">
                      {" "}
                      <BiTimeFive size={24} /> 18/08 TUE 10:15
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
