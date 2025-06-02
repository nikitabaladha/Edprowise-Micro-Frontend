import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 text-center">
              All Copyright © {new Date().getFullYear()} EdProwise Tech PVT LTD.
              All Rights Reserved.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
