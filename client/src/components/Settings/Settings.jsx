import NavBar from '../Navigation/NavBar';
import { IconUserCircle } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from '../../utils/axiosConfig';
import DOMPurify from 'dompurify';
import { useNavigate } from 'react-router-dom';
import { verifyJWT } from '../../utils/utils';
import CustomModal from '../Modals/CustomModal';

const Settings = () => {
  const token = localStorage.getItem('token');
  const [username, setUsername] = useState();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [fieldValues, setFieldValues] = useState({
    username: '',
    confirmUsername: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    (async () => {
      const { authenticated, username } = await verifyJWT();
      if (authenticated) {
        setUsername(username);
      }
    })();
  }, []);

  const toggleCustomModal = () => {
    setShow(!show);
  };

  const handleInput = (event) => {
    const placeholder = event.target.placeholder;
    if (placeholder === 'Username') {
      setFieldValues({ ...fieldValues, username: event.target.value });
    } else if (placeholder === 'Confirm Username') {
      setFieldValues({ ...fieldValues, confirmUsername: event.target.value });
    } else if (placeholder === 'Password') {
      setFieldValues({ ...fieldValues, password: event.target.value });
    } else if (placeholder === 'Confirm Password') {
      setFieldValues({ ...fieldValues, confirmPassword: event.target.value });
    }
  };

  const updateUser = async () => {
    const response = await axios.put(
      '/users/update',
      {
        username: DOMPurify.sanitize(fieldValues.username),
        password: DOMPurify.sanitize(fieldValues.password),
      },
      {
        headers: { Authorization: token },
      },
    );

    // Checks if the username is taken
    if (response.data.exists) {
      alert(response.data.message);
      return;
    }

    alert(response.data.message);
  };

  const handleSubmit = () => {
    if (fieldValues.username === '' && fieldValues.password === '') {
      alert('You need to either provide a username or password to change');
      return;
    }

    if (
      fieldValues.username === fieldValues.confirmUsername &&
      fieldValues.password === fieldValues.confirmPassword
    ) {
      updateUser();
      //Logs out the user and clears their JWT
      localStorage.clear();

      //Navigates to homepage
      navigate('/');
    } else {
      if (fieldValues.username !== fieldValues.confirmUsername) {
        alert('Usernames do not match!');
      } else if (fieldValues.password !== fieldValues.confirmPassword) {
        alert('Passwords do not match!');
      }
    }
  };

  const clearFields = () => {
    setFieldValues({
      username: '',
      confirmUsername: '',
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <>
      <NavBar />
      <form
        className="flex flex-col gap-3 items-center justify-center h-screen"
        onSubmit={() => handleSubmit()}
      >
        <IconUserCircle color="black" size={200} />
        <h2 style={{ color: '#4B6D62' }}>{username}</h2>
        <div className="flex gap-3 items-center justify-center w-full">
          <input
            type="text"
            placeholder="Username"
            required
            className="p-2 w-1/2 sm:w-1/3 md:w-1/5"
            style={{ borderRadius: '0' }}
            value={fieldValues.username}
            onChange={(event) => handleInput(event)}
          />
          <input
            type="text"
            placeholder="Confirm Username"
            required
            className="p-2 w-1/2 sm:w-1/3 md:w-1/5"
            style={{ borderRadius: '0' }}
            value={fieldValues.confirmUsername}
            onChange={(event) => handleInput(event)}
          />
        </div>
        <div className="flex items-center justify-center gap-3 w-full">
          <input
            type="password"
            placeholder="Password"
            required
            className="p-2 w-1/2 sm:w-1/3 md:w-1/5"
            style={{ borderRadius: '0' }}
            value={fieldValues.password}
            onChange={(event) => handleInput(event)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            required
            className="p-2 w-1/2 sm:w-1/3 md:w-1/5"
            style={{ borderRadius: '0' }}
            value={fieldValues.confirmPassword}
            onChange={(event) => handleInput(event)}
          />
        </div>
        <Button
          className="w-2/3 md:w-2/5"
          style={{ background: '#30846B' }}
          onClick={() => handleSubmit()}
        >
          Save Changes
        </Button>
        <Button
          className="w-2/3 md:w-2/5"
          style={{ background: '#507C8C' }}
          onClick={() => clearFields()}
        >
          Discard Changes
        </Button>
        <Button
          className="w-2/3 md:w-2/5"
          style={{ background: '#dc3545' }}
          onClick={() => toggleCustomModal()}
        >
          Delete Account
        </Button>
        {show && (
          <CustomModal
            show={show}
            toggle={toggleCustomModal}
            colors={{
              headerBackground: '#4B6D62',
              bodyBackground: '#F0F7F',
              footerBackground: '#4B6D62',
              title: '#ffffff',
              body: '#4B6D62',
            }}
            title="Confirmation"
            body="Are you sure you want to delete your account?"
            submitButton="Yes"
            closeButton="No"
          />
        )}
      </form>
    </>
  );
};

export default Settings;
