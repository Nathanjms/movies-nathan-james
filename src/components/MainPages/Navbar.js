import React, { useReducer } from "react";
import { FaBars } from "react-icons/fa";
import navItems from "./NavItems";

function NavBar() {
  const [hideNav, toggle] = useReducer((hideNav) => !hideNav, true);

  return (
    <nav className="navBar">
      <ul className={hideNav ? "links hide-nav" : "links"}>
        {navItems.map((objLink, i) => {
          return (
            <li key={i}>
              <a className="button-shape" href={objLink.link}>
                {objLink.icon}
                <span>{objLink.text}</span>
              </a>
            </li>
          );
        })}
      </ul>
      <li onClick={toggle}>
        {" "}
        <button
          className={
            hideNav
              ? "btn button-shape mobile-button"
              : "btn button-shape mobile-button btn-clicked"
          }
        >
          <FaBars />
        </button>
      </li>
    </nav>
  );
}

export default NavBar;
