import { Button, Dropdown, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import LoginModal from '../Modals/LoginModal';
import SignupModal from '../Modals/SignupModal';
import { useEffect, useState } from 'react';
import { IconUserCircle } from '@tabler/icons-react';
import DOMPurify from 'dompurify';
import axios from '../../axiosConfig';

const NavBar = () => {
  const [loginShow, setLoginShow] = useState(false);
  const [signupShow, setSignupShow] = useState(false);
  const [loginStatus, setLoginStatus] = useState({
    loggedIn: false,
    username: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get('/users/verify-jwt', {
        headers: { Authorization: token },
      })
      .then((response) => {
        if (response.data.authenticated) {
          setLoginStatus({
            loggedIn: true,
            username: DOMPurify.sanitize(response.data.username),
          });
        }
      });
  }, [setLoginStatus]);

  const toggleLoginModal = () => {
    setLoginShow(!loginShow);
  };

  const toggleSignupModal = () => {
    setSignupShow(!signupShow);
  };

  const handleLogout = () => {
    //logout logic
    localStorage.clear();
    //Refreshes the page to show the updated state
    window.location.reload();
  };

  return (
    <>
      <Navbar
        expand="xl"
        style={{ background: '#4B6D62', justifyContent: 'space-between' }}
        className="flex p-2"
      >
        <Navbar.Brand
          as={Link}
          to="/"
          className="text-white font-bold"
          style={{ fontFamily: 'montserrat' }}
        >
          FeastFinder
        </Navbar.Brand>
        <Navbar.Toggle className="" />
        <Navbar.Collapse className="flex xl:justify-between">
          <div></div>
          <SearchBar id="search-bar" />
          <div className="flex gap-2">
            {!loginStatus.loggedIn && (
              <Button className="w-28" onClick={() => toggleLoginModal()}>
                Login
              </Button>
            )}
            {!loginStatus.loggedIn && (
              <Button className="w-28" onClick={() => toggleSignupModal()}>
                Signup
              </Button>
            )}
            {loginStatus.loggedIn && (
              <Dropdown>
                <div className="flex justify-center items-center">
                  <IconUserCircle color="white" size={40} />
                  <Dropdown.Toggle
                    style={{
                      fontSize: '18px',
                      background: 'transparent',
                      fontWeight: 'bold',
                    }}
                  >
                    {loginStatus.username}
                  </Dropdown.Toggle>
                </div>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/settings">
                    Settings
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/favorites">
                    Favorites
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleLogout()}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>
        </Navbar.Collapse>
      </Navbar>
      {!loginStatus.loggedIn && loginShow && (
        <LoginModal
          show={loginShow}
          toggle={toggleLoginModal}
          status={setLoginStatus}
        />
      )}
      {!loginStatus.loggedIn && signupShow && (
        <SignupModal
          show={signupShow}
          toggle={toggleSignupModal}
          status={setLoginStatus}
        />
      )}
    </>
  );
};

export default NavBar;
