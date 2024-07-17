import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axiosConfig';

const CustomModal = ({
  colors,
  title,
  body,
  submitButton,
  closeButton,
  show,
  toggle,
}) => {
  const navigate = useNavigate();

  const deleteUser = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.delete('/users/delete', {
        headers: { Authorization: token },
      });
      alert(response.data.message);
      localStorage.clear();
      navigate('/');
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleSubmit = () => {
    deleteUser();
  };

  return (
    <Modal show={show} onHide={() => toggle()} centered>
      <Modal.Header style={{ background: colors.headerBackground, height:"68px" }}>
        <Modal.Title
          className="text-white mx-auto"
          style={{
            fontFamily: 'montserrat',
            fontWeight: '600',
            color: colors.title,
          }}
        >
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{ background: colors.bodyBackground, color: colors.body, }}
      >
        {body}
      </Modal.Body>
      <Modal.Footer style={{ background: colors.footerBackground, height:"68px" }}>
        <Button className="w-24" onClick={() => handleSubmit()}>
          {submitButton}
        </Button>
        <Button onClick={() => toggle()} className="w-24">
          {closeButton}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

CustomModal.propTypes = {
  show: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  submitButton: PropTypes.string.isRequired,
  closeButton: PropTypes.string.isRequired,
  colors: PropTypes.object.isRequired,
};

export default CustomModal;
