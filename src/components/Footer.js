import React from 'react'
import { Link } from 'gatsby'


const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <hr />
          <div style={styles.footerBox}>
            <ul style={styles.navi}>
              <li style={styles.naviItem}>
                <Link to="/" style={styles.linkText}>Home</Link>
              </li>
              <li style={styles.naviItem}>
                <Link to="/about" style={styles.linkText}>About</Link>
              </li>
              <li style={styles.naviItem}>
                <Link to="/blog" style={styles.linkText}>Blog</Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    )
  }
}

const styles = {
  footerBox: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end'
  },
  navi: {
    listStyle: 'none',
    display: 'flex',
    padding: 20,
    marginBottom: 20
  },
  naviItem: {
    width: 100,
    textAlign: 'right'
  },
  linkText: {
    color: '#2b2523'
  }
}

export default Footer
