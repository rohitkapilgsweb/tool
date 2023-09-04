import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


function Navbar() {

  const navigate = useNavigate()

  const Logut = () =>{
    localStorage.clear()
    navigate('/')
    window.location.reload()
  }
  return (
    <header className="app-header">
    <nav className="navbar navbar-expand-lg navbar-light">
      <ul className="navbar-nav">
        <li className="nav-item d-block d-xl-none">
          <Link className="nav-link sidebartoggler nav-icon-hover" id="headerCollapse" >
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
            <Link  className="d-flex align-items-center gap-2 dropdown-item">
                  <i className="ti ti-list-check fs-6"></i>
                  <p className="mb-0 fs-3">My Task</p>
                </Link>
            </li>
            <li className="nav-item ">
            <Link className="nav-link nav-icon-hover"  id="drop2" data-bs-toggle="dropdown"
              aria-expanded="false">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnLIAdirdy3gzcHmeioowS6Ga0uvAIgry0gN_Kg17FBj7zjDs-VuFdN8rvA_ja6LrF77o&usqp=CAU" alt="" width="35" height="35" className="rounded-circle"/>
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