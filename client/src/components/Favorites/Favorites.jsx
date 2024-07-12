import NavBar from '../Navigation/NavBar';
import FoodCard from '../FoodCard';
import { useEffect, useState } from 'react';
import axios from '../../utils/axiosConfig';
import { verifyJWT } from '../../utils/utils';

const Favorites = () => {
  const [favorites, setFavorites] = useState();

  const getFavorites = async (userId) => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`/users/favorites?id=${userId}`, {
      headers: { Authorization: token },
    });

    return response.data;
  };

  useEffect(() => {
    (async () => {
      const { authenticated, id } = await verifyJWT();
      if (authenticated) {
        setFavorites(await getFavorites(id));
      }
    })();
  }, []);

  return (
    <>
      <NavBar />
      <div className="grid gap-3 mx-auto mb-20 grid-cols-2 w-full lg:grid-cols-4 lg:w-10/12">
        <h2
          style={{
            color: '#4B6D62',
            fontFamily: 'montserrat',
            marginTop: '136px',
          }}
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
