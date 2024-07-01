import { useState } from 'react';
import axios from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [input, setInput] = useState();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.get(`/recipes/search?query=${input}`).then((response) => {
      navigate('/results', { state: { recipes: response.data.results } });
    });
  };
  return (
    <form onSubmit={(event) => handleSubmit(event)} className="w-4/12">
      <input
        type="text"
        style={{ background: '#61757E' }}
        placeholder="Search recipes or ingredients (e.g. apple, banana, egg)"
        className="p-2 w-full"
        onChange={(event) => setInput(event.target.value)}
      />
    </form>
  );
};

export default SearchBar;
