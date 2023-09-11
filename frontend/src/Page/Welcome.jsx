import React, { useEffect, useState } from "react";
import Toast from "react-bootstrap/Toast";
import { BsFacebook, BsShieldFillCheck, BsTelegram } from "react-icons/bs";
import{BiSolidLock,BiSolidLockOpen} from 'react-icons/bi'
import { FcGoogle } from "react-icons/fc";
import ReadMoreReact from "read-more-react";
import { IoLogoWhatsapp } from "react-icons/io";
import{ImFeed}from 'react-icons/im'
function Welcome() {
  const [showA, setShowA] = useState(true);
  const toggleShowA = () => setShowA(!showA);
  useEffect(() => {
    setShowA(true);
  }, []);
  return (
    <div className="container px-lg-5 mt-3">
      <div className="row justify-content-start">
        <div className="col-md-12">
          <h4 className="active-h4"> <ImFeed color="rgb(255 102 102)"/> Active Service</h4>
          <Toast
            position="top-end"
            className="toast-end-notification"
            show={showA}
            onClose={toggleShowA}
          >
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Alert</strong>
              {/* <small>11 mins ago</small> */}
            </Toast.Header>
            <Toast.Body>
              "Welcome to our platform! 🌟 Please note that we're currently in
              beta, so some features are limited. We appreciate your feedback as
              we work to improve your experience. Enjoy your stay! 🚀
              #BetaVersion #NewUser"
            </Toast.Body>
          </Toast>
        </div>
        <div className="col-md-4 mb-3 d-flex">
          <div className="product-card  px-3 py-2 border rounded ">
            <div className="d-flex align-items-center justify-content-start gap-1 m-0">
              <FcGoogle size={25} />
              <span className="fs-5 ml-3 d-block m-0">Google</span>
            </div>
            <hr className="mt-1 mb-1" />
            <ul>
              <li className="mt-2 d-flex gap-2 ">
                <BsShieldFillCheck size={20} color="#8099df" />
                <div>
                Google Place
                Serch
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-4  mb-3 d-flex">
          <div className="product-card  px-3 py-2 border rounded ">
            <div className="d-flex align-items-center justify-content-start gap-1 m-0">
              <BsTelegram color="#0088cc" size={25} />
              <span className="fs-5 ml-3 d-block m-0">Telegram</span>
            </div>
            <hr className="mt-1 mb-1" />
            <ul>
              <li className="mt-2 d-flex gap-2">
                <BsShieldFillCheck size={20} color="#8099df" /> <div>
                Send Messege using Telegram Bot</div> 
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-12  mb- 4 mt-5">
          <hr className="mb-4 mt-0" />
          <h4>Cooming Soon</h4>
          </div>
        <div className="col-md-4  mb-3 d-flex">
          <div className="product-card lock border  px-3 py-2 rounded ">
            <div className="d-flex align-items-center justify-content-between gap-1 m-0">
              <div className="d-flex align-items-center  gap-1">
              <IoLogoWhatsapp color="#075e54" size={25} />
              <span className="fs-5 ml-3 d-block m-0">WhatsApp</span>
              </div>
              <span><BiSolidLock size={25}/></span>
            </div>
            <hr className="mt-1 mb-1" />
            <ul>
              <li className="mt-2">
                <BsShieldFillCheck size={20} color="#8099df" /> Whatsapp Bot
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-4  mb-3 d-flex">
          <div className="product-card lock border  px-3 py-2 rounded ">
            <div className="d-flex align-items-center justify-content-between gap-1 m-0">
              <div className="d-flex align-items-center  gap-1">
              <BsFacebook color="#1877F2" size={25} />
              <span className="fs-5 ml-3 d-block m-0">Facebook</span>
              </div>
              <span><BiSolidLock size={25}/></span>
            </div>
            <hr className="mt-1 mb-1" />
            <ul>
              <li className="mt-2">
                <BsShieldFillCheck size={20} color="#8099df" /> Facebook Automations
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
