import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <div className="container text-left">
      <div className="row">
        <div className="col-md-6">
          <h4 style={{ paddingBottom: "20px" }}>Contact</h4>
          <div className="contact">
            <ul className="footerList list-unstyled">
              <li>Nathan James</li>
              <li>nathan@nathanjms.co.uk</li>
              <li>
                <a className="footerLogos" href="https://github.com/Nathanjms/">
                  <FaGithub />
                </a>
                <a
                  className="footerLogos"
                  href="https://www.youtube.com/channel/UCWL6DjV5c8oMBhOSzpvilmw"
                >
                  <FaYoutube />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-6">
          <h4 style={{ paddingBottom: "20px" }}>Extras</h4>
          <div className="contact">
            <ul className="footerList list-unstyled">
              <li><a href="https://www.nathanjms.co.uk">Main Site</a></li>
              <li><a href="https://www.movies.nathanjms.co.uk">Movies</a></li>
              <li>Last updated: 28th June 2021</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
