import NavBar from '../Navigation/NavBar';
import FoodCard from '../FoodCard';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Results = () => {
  const location = useLocation();
  const results = location.state;
  const recipes = results.recipes;

  return (
    <>
      <Helmet>
        <title>Recipe Search Results | Find Your Favorite Dishes</title>
        <meta
          name="description"
          content="Search for your favorite recipes and discover new dishes. Browse through our extensive collection of recipes to find the perfect meal for any occasion."
        />
      </Helmet>
      <NavBar />
      <div className="grid gap-3 mx-auto mb-20 grid-cols-2 w-full lg:grid-cols-4 lg:w-10/12 ">
        <h2
          style={{
            color: '#4B6D62',
            fontFamily: 'montserrat',
            marginTop: '136px',
          }}
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
