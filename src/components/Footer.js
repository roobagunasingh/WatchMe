import React from "react";
import '../styles.css';

export default function Footer(){
    const currentYear = 2024;
    return(
        <footer className="footer">
      <p className="footer-text"> © {currentYear} Watchme, All rights reserved. </p>
      </footer>
    )
}