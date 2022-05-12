import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';
import logo from './logo.png';
import "./navbar.css"
//import "bulma/css/bulma.css";
 
const Navbar = () => {
    //const history = useHistory();
    const navigate = useNavigate();
    const Logout = async () => {
        try {
            await axios.delete('http://localhost:5000/logout');
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }
    // const [toggleMenu, setToggleMenu] = useState(false);
 
    return (
        // <nav className="navbar is-light" role="navigation" aria-label="main navigation">
        //     <div className="container">
        //         <div className="navbar-brand">
        //             {/* <a className="navbar-item" href="https://bulma.io">
        //                 <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" alt="logo" />
        //             </a> */}
 
        //             <a href="/" role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        //                 <span aria-hidden="true"></span>
        //                 <span aria-hidden="true"></span>
        //                 <span aria-hidden="true"></span>
        //             </a>
        //         </div>
 
        //         <div id="navbarBasicExample" className="navbar-menu">
        //             <div className="navbar-start">
        //                 <a href="/" className="navbar-item">
        //                     Home
        //                 </a>
        //             </div>
 
        //             <div className="navbar-end">
        //                 <div className="navbar-item">
        //                     <div className="buttons">
        //                         <button onClick={Logout} className="button is-light">
        //                             Log Out
        //                         </button>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </nav>
        <div className="nav-bar-container-light">
              <img
                src= {logo}
                className="website-logo"
                alt="website logo"
              />
              {/* <ul className="middle-items">
                <li className="list-item">
                  <NavLink to="/" className="link-light">
                    Home
                  </NavLink>
                </li>
                <li className="list-item">
                  <NavLink to="/about" className="link-light">
                    About
                  </NavLink>
                </li>
              </ul> */}
              <button
                type="button"
                className="theme-button"
                testid="theme"
                onClick={Logout}
              >
               Log Out 
              </button>
            </div>
    )
}
 
export default Navbar