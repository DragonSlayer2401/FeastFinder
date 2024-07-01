import NavBar from '../Navigation/NavBar';
import FoodCard from '../FoodCard';
import { useLocation } from 'react-router-dom';

const Results = () => {
  const location = useLocation();
  const results = location.state;
  const recipes = results.recipes;
  

  return (
    <>
      <NavBar />
      <div className="grid gap-3 mx-auto mt-20 mb-20 grid-cols-2 w-full lg:grid-cols-4 lg:w-10/12 ">
        <h2
          style={{ color: '#4B6D62', fontFamily: 'montserrat' }}
          className="font-semibold text-2xl col-span-2 lg:col-span-4"
        >
          Search Results
        </h2>
        {recipes.map((recipe) => (
          <FoodCard
            image={recipe.image}
            title={recipe.title}
            recipe={recipe}
            key={recipe.id}
          />
        ))}
      </div>
    </>
  );
};

export default Results;
