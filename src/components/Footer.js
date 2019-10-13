import React from 'react'
import { Link } from 'gatsby'


const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <hr />
          <div className="footer-box">
            <ul>
              <li>
                <Link to="/" className="footer-text">Home</Link>
              </li>
              <li>
                <Link to="/about" className="footer-text">About</Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
