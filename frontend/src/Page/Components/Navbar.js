import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Offcanvas from 'react-bootstrap/Offcanvas';
import { BsFacebook, BsFillFileEarmarkPostFill, BsTelegram } from 'react-icons/bs';
import { IoLogoWhatsapp } from 'react-icons/io';
import { FcGoogle } from 'react-icons/fc';
import { getUserId } from '../../utils/auth';
import IconImg from '../../assets/img/optimizsync.jpg'

function Navbar() {

  const navigate = useNavigate()

  const [show, setShow] = useState(false);
  const role = getUserId() ? getUserId()?.role : null;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const Logut = () =>{
    localStorage.clear()
    navigate('/')
    window.location.reload()
  }
  return (

    
    <header className="app-header shadow-sm">
          <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
        <ul id="sidebarnav">
        {!role === "tempuser" ? (
              <>
                <li className="nav-small-cap">
                  <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                  <span className="hide-menu">Home</span>
                </li>
                <li className="sidebar-item">
                  <Link
                        onClick={handleClose}
                    className="sidebar-link"
                    to="/dashboard"
                    aria-expanded="false"
                  >
                    <span>
                      <i className="ti ti-layout-dashboard"></i>
                    </span>
                    <span className="hide-menu">Dashboard</span>
                  </Link>
                </li>
                <li className="nav-small-cap">
                  <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                  <span className="hide-menu">Post Managment</span>
                </li>
                <li className="sidebar-item">
                  <Link
                        onClick={handleClose}
                    className="sidebar-link"
                    to="/create_post"
                    aria-expanded="false"
                  >
                    <span>
                      <BsFillFileEarmarkPostFill size={23} />
                    </span>
                    <span className="hide-menu">Create Post</span>
                  </Link>
                </li>
                <li className="nav-small-cap">
                  <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                  <span className="hide-menu">Automations</span>
                </li>
                <li className="sidebar-item">
                  <Link
                        onClick={handleClose}
                    className="sidebar-link"
                    to="/google"
                    aria-expanded="false"
                  >
                    <span>
                      <FcGoogle size={23} />
                    </span>
                    <span className="hide-menu">Google</span>
                  </Link>
                </li>
                <li className="sidebar-item">
                  <Link
                        onClick={handleClose}
                    className="sidebar-link"
                    to="/telegram"
                    aria-expanded="false"
                  >
                    <span>
                      <BsTelegram color="#0088cc" size={23} />
                    </span>
                    <span className="hide-menu">Telegram</span>
                  </Link>
                </li>
                <li className="sidebar-item">
                  <Link
                        onClick={handleClose}
                    className="sidebar-link"
                    to="/whatsapp"
                    aria-expanded="false"
                  >
                    <span>
                      <IoLogoWhatsapp color="#075e54" size={23} />
                    </span>
                    <span className="hide-menu">Whatsapp</span>
                  </Link>
                </li>
                <li className="sidebar-item">
                  <Link
                        onClick={handleClose}
                    className="sidebar-link"
                    to="/facebook"
                    aria-expanded="false"
                  >
                    <span>
                      <BsFacebook color="#1877F2" size={23} />
                    </span>
                    <span className="hide-menu">Facebook</span>
                  </Link>
                </li>
              </>
            ) : (
              <>
              <li className="nav-small-cap">
                 <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                 <span className="hide-menu">Home</span>
               </li>
               <li className="sidebar-item">
                 <Link
                 onClick={handleClose}
                   className={`sidebar-link ${Location === "/dashboard" ? "active-menu" :""}`}
                   to="/dashboard"
                   aria-expanded="false"
                 >
                   <span>
                     <i className="ti ti-layout-dashboard"></i>
                   </span>
                   <span className="hide-menu">Welcome</span>
                 </Link>
               </li>
               <li className="nav-small-cap">
                 <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                 <span className="hide-menu">Automations</span>
               </li>
               <li className="sidebar-item">
                 <Link
                  onClick={handleClose}
                   className={`sidebar-link ${Location === "/google" ? "active-menu" :""}`}
                   to="/google"
                   aria-expanded="false"
                 >
                   <span>
                     <FcGoogle size={23} />
                   </span>
                   <span className="hide-menu">Google</span>
                 </Link>
               </li>
               <li className="sidebar-item">
                 <Link
                  onClick={handleClose}
                   className={`sidebar-link ${Location === "/telegram" ? "active-menu" :""}`}
                   to="/telegram"
                   aria-expanded="false"
                 >
                   <span>
                     <BsTelegram color="#0088cc" size={23} />
                   </span>
                   <span className="hide-menu">Telegram</span>
                 </Link>
               </li>
             </>
            )}
          
        </ul>

      </nav>
        </Offcanvas.Body>
      </Offcanvas>
          
    <nav className="navbar navbar-expand-lg navbar-light">
      <ul className="navbar-nav">
        <li className="nav-item d-block d-xl-none">
          <Link onClick={handleShow} className="nav-link sidebartoggler nav-icon-hover" id="headerCollapse" >
            <i className="ti ti-menu-2"></i>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link nav-icon-hover" >
            <i className="ti ti-bell-ringing"></i>
            <div className="notification bg-primary rounded-circle"></div>
          </Link>
        </li>
      </ul>
      <div className="navbar-collapse justify-content-end px-0" id="navbarNav">
        <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-end">

            <li className="nav-item ">
            <Link className="nav-link nav-icon-hover"  id="drop2" data-bs-toggle="dropdown"
              aria-expanded="false">
              <img src={IconImg} alt="" width="35" height="35" className="rounded-circle border"/>
            </Link>
          </li>
            <li className="nav-item ">
            <Link onClick={Logut}  className="btn btn-outline-primary mx-3 mt-2 d-block">Logout</Link>
            </li>
        </ul>
      </div>
    </nav>
  </header>
  )
}

export default Navbar