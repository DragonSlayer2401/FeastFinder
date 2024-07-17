import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from '../../utils/axiosConfig';
import DOMPurify from 'dompurify';

const AuthModal = ({ show, toggle, status, title }) => {
  const [userDetails, setUserDetails] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  // Finds and authenticates user
  const loginUser = async () => {
    try {
      const response = await axios.post('/users/login', {
        username: DOMPurify.sanitize(userDetails.username),
        password: DOMPurify.sanitize(userDetails.password),
      });

      alert(response.data.message);
      if (response.data.message === 'Login successful') {
        localStorage.setItem('token', response.data.token), toggle();
        status({
          loggedIn: true,
          username: DOMPurify.sanitize(response.data.username),
        });
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  // Adds user to database
  const addUser = async () => {
    try {
      const response = await axios.post('/users/register', {
        username: DOMPurify.sanitize(userDetails.username),
        password: DOMPurify.sanitize(userDetails.password),
      });

      if (response.data === 'User added to the database') {
        loginUser();
      }
    } catch (error) {
      const message = error.response.data.message;
      // Server-side password check
      if (message === 'Invalid Password') {
        alert(
          'Invalid Password. Your password must include the following:\n\n- At least one uppercase letter\n- At least one lowercase letter\n- At least one number\n- At least 8 characters long',
        );
      } else {
        alert(message);
      }
    }
  };

  // Updates the userDetails state
  const handleInputChange = (event) => {
    if (event.target.placeholder === 'Username') {
      setUserDetails({ ...userDetails, username: event.target.value });
    } else if (event.target.placeholder === 'Password') {
      setUserDetails({ ...userDetails, password: event.target.value });
    } else if (event.target.placeholder === 'Confirm Password') {
      setUserDetails({ ...userDetails, confirmPassword: event.target.value });
    }
  };

  // Handles the submit logic for logging in
  const handleLogin = () => {
    loginUser();
  };

  // Handles the submit logic for signing up
  const handleSignup = () => {
    if (userDetails.password === userDetails.confirmPassword) {
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      // Client-side password check
      if (!passwordPattern.test(userDetails.password)) {
        alert(
          'Invalid Password. Your password must include the following:\n\n- At least one uppercase letter\n- At least one lowercase letter\n- At least one number\n- At least 8 characters long',
        );
        return;
      }
      addUser();
    } else {
      alert('Passwords do not match.');
    }
  };

  const handleSubmit = () => {
    if (title === 'Login') {
      handleLogin();
    } else {
      handleSignup();
    }
  };

  return (
    <Modal show={show} onHide={() => toggle()} centered>
      <Modal.Header style={{ background: '#4B6D62', height: '140.67px' }}>
        <Modal.Title
          className="text-white mx-auto"
          style={{ fontFamily: 'montserrat', fontWeight: '600' }}
        >
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ height: '248px', background: '#F0F7F' }}>
        <form
          className="flex flex-col gap-3 items-center h-full justify-center"
          onSubmit={() => handleSubmit()}
        >
          <input
            type="text"
            placeholder="Username"
            required
            className="p-2 w-11/12"
            style={{ borderRadius: '0' }}
            onChange={(event) => handleInputChange(event)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="p-2 w-11/12"
            style={{ borderRadius: '0' }}
            onChange={(event) => handleInputChange(event)}
          />
          {title === 'Signup' && (
            <input
              type="password"
              placeholder="Confirm Password"
              required
              className="p-2 w-11/12"
              style={{ borderRadius: '0' }}
              onChange={(event) => handleInputChange(event)}
            />
          )}
        </form>
      </Modal.Body>
      <Modal.Footer style={{ background: '#4B6D62', height: '140.67px' }}>
        <Button className="w-24" onClick={() => handleSubmit()}>
          {title}
        </Button>
        <Button onClick={() => toggle()} className="w-24">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

AuthModal.propTypes = {
  show: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  status: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default AuthModal;
