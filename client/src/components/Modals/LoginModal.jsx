import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from '../../axiosConfig';
import DOMPurify from 'dompurify';

const LoginModal = ({ show, toggle, status }) => {
  const [userDetails, setUserDetails] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (event) => {
    if (event.target.placeholder === 'Username') {
      setUserDetails({ ...userDetails, username: event.target.value });
    } else if (event.target.placeholder === 'Password') {
      setUserDetails({ ...userDetails, password: event.target.value });
    }
  };

  const handleSubmit = async () => {
    await axios
      .post('/users/login', {
        username: DOMPurify.sanitize(userDetails.username),
        password: DOMPurify.sanitize(userDetails.password),
      })
      .then((response) => {
        alert(response.data.message);
        if (response.data.message === 'Login successful') {
          sessionStorage.setItem(
            'user',
            JSON.stringify({
              username: response.data.username,
              id: response.data.id,
            }),

            localStorage.setItem('token', response.data.token),
          );
          toggle();
          status({
            loggedIn: true,
            username: JSON.parse(sessionStorage.getItem('user')).username,
          });
        }
      })
      .catch((err) => alert(err.response.data.message));
  };

  return (
    <Modal show={show} onHide={() => toggle()}>
      <Modal.Header style={{ background: '#4B6D62', height: '140.67px' }}>
        <Modal.Title
          className="text-white mx-auto font-semibold"
          style={{ fontFamily: 'montserrat', fontWeight: '600' }}
        >
          Login
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ height: '248px', background: '#F0F7F' }}>
        <form
          className="flex flex-col gap-3 items-center h-full"
          style={{ justifyContent: 'center' }}
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
        </form>
      </Modal.Body>
      <Modal.Footer style={{ background: '#4B6D62', height: '140.67px' }}>
        <Button className="w-24" onClick={() => handleSubmit()}>
          Login
        </Button>
        <Button onClick={() => toggle()} className="w-24">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

LoginModal.propTypes = {
  show: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  status: PropTypes.func.isRequired,
};

export default LoginModal;
