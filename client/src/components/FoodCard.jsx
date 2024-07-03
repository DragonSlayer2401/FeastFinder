import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const FoodCard = ({ image, title, recipe }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/details', { state: { recipe: recipe } });
  };

  return (
    <Card
      className="w-full"
      style={{ cursor: 'pointer' }}
      onClick={() => handleClick()}
    >
      <Card.Img
        variant="top"
        src={image}
        style={{ borderRadius: '0, 0, 0.375rem, 0.375rem' }}
      />
      <Card.Body style={{ background: '#4B6D62' }} className="rounded-b-md">
        <Card.Title
          className="text-white text-center"
          style={{ fontFamily: 'montserrat', fontSize: '18px' }}
        >
          {title}
        </Card.Title>
      </Card.Body>
    </Card>
  );
};

FoodCard.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  recipe: PropTypes.object.isRequired,
};

export default FoodCard;
