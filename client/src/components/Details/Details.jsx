import { useLocation } from 'react-router-dom';
import NavBar from '../Navigation/NavBar';
import axios from '../../axiosConfig';
import { useEffect, useState } from 'react';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';

const Details = () => {
  const [recipeInfo, setRecipeInfo] = useState();
  const [changeIcon, setChangeIcon] = useState('outline');
  const token = localStorage.getItem('token');
  const location = useLocation();
  const recipe = location.state.recipe;

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Checks to make sure theres a valid user before maiking request
    axios
      .get('/users/verify-jwt', {
        headers: { Authorization: token },
      })
      .then((response) => {
        if (response.data.authenticated) {
          const userId = response.data.id;
          axios
            .get(`/users/favorites?id=${userId}`, {
              headers: { Authorization: token },
            })
            .then((response) => {
              const matchingRecipe = response.data.some(
                (e) => e.recipeId === recipe.id,
              );

              if (matchingRecipe) {
                setChangeIcon('filled');
              }
            });
        }
      });

    let ingredientDetails;
    let instructionDetails;
    let ingredients;
    let instructions;
    if (!recipe.extendedIngredients && !recipe.analyzedInstructions) {
      axios.get(`/recipes/information?id=${recipe.id}`).then((response) => {
        ingredientDetails = response.data.extendedIngredients;
        instructionDetails = response.data.analyzedInstructions[0].steps;

        ingredients = ingredientDetails.map((ingredient) => {
          return (
            <li
              key={ingredient.id}
              style={{ fontFamily: 'lato' }}
              className="text-white list-disc"
            >
              {ingredient.measures.us.unitShort === 'servings'
                ? `${ingredient.amount} ${ingredient.measures.us.unitShort} ${ingredient.originalName}`
                : ingredient.original}
            </li>
          );
        });

        instructions = instructionDetails.map((instruction) => (
          <li
            key={instruction.number}
            style={{ fontFamily: 'lato' }}
            className="text-white list-decimal mb-2"
          >
            {instruction.step}
          </li>
        ));
        setRecipeInfo({ ingredients, instructions });
      });
    } else {
      ingredientDetails = recipe.extendedIngredients;
      instructionDetails = recipe.analyzedInstructions[0].steps;
      const ingredientMap = new Map();

      ingredients = ingredientDetails.map((ingredient) => {
        if (!ingredientMap.has(ingredient.id)) {
          ingredientMap.set(ingredient.id, ingredient.original);
          return (
            <li
              key={ingredient.id}
              style={{ fontFamily: 'lato' }}
              className="text-white list-disc"
            >
              {ingredient.measures.us.unitShort === 'servings'
                ? `${ingredient.amount} ${ingredient.measures.us.unitShort} ${ingredient.originalName}`
                : ingredient.original}
            </li>
          );
        }
      });

      ingredients = ingredients.filter(
        (ingredient, index) => index === ingredients.indexOf(ingredient),
      );

      instructions = instructionDetails.map((instruction) => (
        <li
          key={instruction.number}
          style={{ fontFamily: 'lato' }}
          className="text-white list-decimal mb-2"
        >
          {instruction.step}
        </li>
      ));
    }
    setRecipeInfo({ ingredients, instructions });
  }, [recipe, token]);

  const handleFavorite = () => {
    const token = localStorage.getItem('token');
    axios
      .get('/users/verify-jwt', {
        headers: { Authorization: token },
      })
      .then((response) => {
        if (response.data.authenticated) {
          const userId = response.data.id;
          if (changeIcon === 'outline') {
            setChangeIcon('filled');
            axios.put(
              '/users/update/favorites',
              {
                id: userId,
                favoritedRecipe: {
                  recipeName: recipe.title,
                  recipeId: recipe.id,
                  recipe: recipe,
                  image: recipe.image,
                },
              },
              {
                headers: { Authorization: token },
              },
            );
          } else {
            setChangeIcon('outline');
            axios.put(
              '/users/update/favorites',
              {
                id: userId,
                favoritedRecipe: {
                  recipeName: recipe.title,
                  recipeId: recipe.id,
                  recipe: recipe,
                  image: recipe.image,
                },
              },
              {
                headers: { Authorization: token },
              },
            );
          }
        } else {
          localStorage.removeItem('token');
        }
      });
  };

  return (
    <>
      <NavBar />
      <div className="grid gap-3  mx-auto mt-20 mb-20 grid-cols-1 w-9/12 md:grid-cols-2 ">
        <img src={recipe.image} alt={recipe.title} className="w-full h-full" />
        <div className="flex flex-col gap-3">
          <div
            className="p-4 flex justify-center gap-2 items-center flex-col"
            style={{ background: '#4B6D62' }}
          >
            <h1
              style={{ fontFamily: 'montserrat' }}
              className="text-white text-2xl text-center font-bold"
            >
              {recipe.title}
            </h1>
            {changeIcon === 'outline' && (
              <IconHeart
                className="text-white cursor-pointer"
                size={35}
                onClick={() => handleFavorite()}
              />
            )}
            {changeIcon === 'filled' && (
              <IconHeartFilled
                className="text-white cursor-pointer"
                size={35}
                onClick={() => handleFavorite()}
              />
            )}
          </div>
          <div style={{ background: '#4B6D62' }} className="p-2 h-full">
            <h2
              style={{ fontFamily: 'montserrat' }}
              className="text-white text-center text-2xl font-semibold"
            >
              Ingredients
            </h2>
            <ul className="w-fit mx-auto">
              {recipeInfo && recipeInfo.ingredients}
            </ul>
          </div>
        </div>
        <div
          style={{ background: '#4B6D62' }}
          className="w-full md:col-span-2 p-2"
        >
          <h2
            className="text-white text-2xl text-center font-semibold"
            style={{ fontFamily: 'montserrat' }}
          >
            Instructions
          </h2>
          <ol className="mx-auto" style={{ maxWidth: '500px' }}>
            {recipeInfo && recipeInfo.instructions}
          </ol>
        </div>
      </div>
    </>
  );
};

export default Details;
