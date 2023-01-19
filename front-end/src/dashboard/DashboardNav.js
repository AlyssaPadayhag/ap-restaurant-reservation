import React from "react";

function DashboardNav() {
    return (
        <div className="container sticky-top">
        <nav className="navbar navbar-expand-md dashbaord-header-nav">
            
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
            <li className="nav-item">
                <a className="nav-link" href="#reservations">Reservations</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#tables">Tables</a>
            </li>
            </ul>
            </div>
            </nav>
        </div>


    );
}

export default DashboardNav;