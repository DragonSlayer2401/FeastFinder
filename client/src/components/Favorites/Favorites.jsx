import NavBar from '../Navigation/NavBar';
import FoodCard from '../FoodCard';
import { useEffect, useState } from 'react';
import axios from '../../axiosConfig';

const Favorites = () => {
  const [favorites, setFavorites] = useState();

  useEffect(() => {
    const userId = JSON.parse(sessionStorage.getItem('user'))?.id;
    const token = localStorage.getItem('token');

    axios
      .get(`/users/favorites?id=${userId}`, {
        headers: { Authorization: token },
      })
      .then((response) => {
        setFavorites(response.data);
      });
  }, []);

  return (
    <>
      <NavBar />
      <div className="grid gap-3 mx-auto mt-20 mb-20 grid-cols-2 w-full lg:grid-cols-4 lg:w-10/12">
        <h2
          style={{ color: '#4B6D62', fontFamily: 'montserrat' }}
          className="font-semibold text-2xl col-span-2 lg:col-span-4"
        >
          Favorite Recipes
        </h2>
        {favorites &&
          favorites.map((favorite) => (
            <FoodCard
              image={favorite.image}
              title={favorite.recipeName}
              recipe={favorite.recipe}
              key={favorite.recipeId}
            />
          ))}
      </div>
    </>
  );
};

export default Favorites;
