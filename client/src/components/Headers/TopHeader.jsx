import { Navbar, Container } from "react-bootstrap";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa"; // Importing React Icons
import "./TopHeader.css"; // Custom CSS file

const TopHeader = () => {
  return (
    <Navbar className="headertop sticky-top">
      <Container>
        {/* Mobile Icon and Phone Number */}
        <Navbar.Text className="navbar-text">
          <FaPhoneAlt className="navbar-icon" /> +123456789
        </Navbar.Text>

        {/* Collapse Button for mobile */}
        <Navbar.Toggle />

        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="navbar-text">
            <FaEnvelope className="navbar-icon" /> info.bhilearning@gmail.com
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopHeader;
