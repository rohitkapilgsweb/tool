import React from 'react';
import {BsTelegram} from 'react-icons/bs';
import {IoLogoWhatsapp} from 'react-icons/io';
import {BsFacebook} from 'react-icons/bs';
import { Link } from 'react-router-dom';
function Sidebar() {

  const Logut = () =>{
    localStorage.clear()
    window.location.reload()
  }
  return (
    <aside className="left-sidebar">
    <div>
      <div className="brand-logo d-flex align-items-center justify-content-between">
        <a href="./index.html" className="text-nowrap logo-img">
          <img src="https://gswebtech.in/gswebtech.in/assets/img/site-logo.png" width="180" alt="" />
        </a>
        <div className="close-btn d-xl-none d-block sidebartoggler cursor-pointer" id="sidebarCollapse">
          <i className="ti ti-x fs-8"></i>
        </div>
      </div>
      <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
        <ul id="sidebarnav">
          <li className="nav-small-cap">
            <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
            <span className="hide-menu">Home</span>
          </li>
          <li className="sidebar-item">
            <Link className="sidebar-link" to="/dasboard" aria-expanded="false">
              <span>
                <i className="ti ti-layout-dashboard"></i>
              </span>
              <span className="hide-menu">Dashboard</span>
            </Link>
          </li>
          <li className="nav-small-cap">
            <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
            <span className="hide-menu">Automations</span>
          </li>
          <li className="sidebar-item">
            <Link className="sidebar-link" to="/telegram" aria-expanded="false">
              <span>
                <BsTelegram size={23}/>
              </span>
              <span className="hide-menu">Telegram</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link className="sidebar-link" to="/whatsapp" aria-expanded="false">
              <span>
                <IoLogoWhatsapp size={23}/>
              </span>
              <span className="hide-menu">Whatsapp</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link className="sidebar-link" to="/facebook" aria-expanded="false">
              <span>
                <BsFacebook size={23}/>
              </span>
              <span className="hide-menu">Facebook</span>
            </Link>
          </li>
        
          
          <li className="nav-small-cap">
            <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
            <span className="hide-menu">AUTH</span>
          </li>
          <li className="sidebar-item">
            <Link onClick={Logut} className="sidebar-link" to="/" aria-expanded="false">
              <span>
                <i className="ti ti-login"></i>
              </span>
              <span className="hide-menu">Log out</span>
            </Link>
          </li>
          
      
    
        </ul>

      </nav>
    </div>
  </aside>
  )
}

export default Sidebar