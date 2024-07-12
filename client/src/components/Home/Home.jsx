import { useEffect, useState } from 'react';
import NavBar from '../Navigation/NavBar';
import axios from '../../utils/axiosConfig';
import FoodCard from '../FoodCard';
import { Helmet } from 'react-helmet';

const Home = () => {
  const [recipes, setRecipes] = useState(
    JSON.parse(localStorage.getItem('recipes')),
  );

  useEffect(() => {
    if (!recipes) {
      axios.get(`/recipes/random`).then((response) => {
        const recipes = response.data.recipes;
        localStorage.setItem('recipes', JSON.stringify(recipes));
        setRecipes(recipes);
      });
    }
  }, [recipes]);

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta
          name="description"
          content="Discover the best recipes with our top 10 delicious and easy-to-make dishes. Perfect for home cooks looking to create amazing meals. Find your next favorite recipe today!"
        />
      </Helmet>
      <NavBar />
      <div className="grid gap-3 mx-auto mt-20 mb-20 grid-cols-2 w-full lg:grid-cols-4 lg:w-10/12">
        <h2
          style={{
            color: '#4B6D62',
            fontFamily: 'montserrat',
            marginTop: '136px',
          }}
          className="font-semibold text-2xl col-span-2 lg:col-span-4 "
        >
          Try Some of These Recipes
        </h2>
        {recipes &&
          recipes.map((recipe) => (
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

export default Home;
