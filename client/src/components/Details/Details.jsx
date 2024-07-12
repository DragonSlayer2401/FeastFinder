import { useLocation } from 'react-router-dom';
import NavBar from '../Navigation/NavBar';
import axios from '../../utils/axiosConfig';
import { useCallback, useEffect, useState } from 'react';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { Helmet } from 'react-helmet';
import { verifyJWT } from '../../utils/utils';

const Details = () => {
  const token = localStorage.getItem('token');
  const [recipeInfo, setRecipeInfo] = useState();
  const [changeIcon, setChangeIcon] = useState('outline');
  const location = useLocation();
  const recipe = location.state.recipe;

  // Checks if recipe is favorited or not
  const checkFavoriteStatus = useCallback(
    (userId) => {
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
    },
    [token, recipe.id],
  );

  // Updates the user's favorites in the database
  const updateUserFavorites = (userId) => {
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
  };

  // Handles whether to add or remove a recipe from the user's favorites
  const handleFavorite = async () => {
    const { authenticated, id } = await verifyJWT();
    if (authenticated) {
      if (changeIcon === 'outline') {
        setChangeIcon('filled');
        // Adds the recipe to the user's favorites
        updateUserFavorites(id);
      } else {
        setChangeIcon('outline');
        // Removes the recipe from the user's favorites
        updateUserFavorites(id);
      }
    }
  };

  const extractRecipeInfo = async (
    extendedIngredients,
    analyzedInstructions,
    dishTypes,
  ) => {
    const ingredientDetails = extendedIngredients;
    const instructionDetails = analyzedInstructions;
    let dishes = `${dishTypes[0]},`;
    const ingredientMap = new Map();
    let ingredients;
    let instructions;

    // Extracts and formats the dish types
    for (let i = 1; i < dishTypes.length; i++) {
      if (i === dishTypes.length - 1) {
        dishes = `${dishes} or ${dishTypes[i]}`;
      } else {
        dishes = `${dishes} ${dishTypes[i]},`;
      }
    }

    // Puts each ingredient into a list item
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

    // Puts each intruction into a list item
    instructions = instructionDetails.map((instruction) => (
      <li
        key={instruction.number}
        style={{ fontFamily: 'lato' }}
        className="text-white list-decimal mb-2"
      >
        {instruction.step}
      </li>
    ));
    setRecipeInfo({ ingredients, instructions, dishes });
  };

  useEffect(() => {
    (async () => {
      // Gets the user ID from the JWT
      const { id } = await verifyJWT();
      checkFavoriteStatus(id, token);
    })();

    if (!recipe.extendedIngredients && !recipe.analyzedInstructions) {
      (async () => {
        const response = await axios.get(
          `/recipes/information?id=${recipe.id}`,
        );

        extractRecipeInfo(
          response.data.extendedIngredients,
          response.data.analyzedInstructions[0].steps,
          response.data.dishTypes,
        );
      })();
    } else {
      extractRecipeInfo(
        recipe.extendedIngredients,
        recipe.analyzedInstructions[0].steps,
        recipe.dishTypes,
      );
    }
  }, [recipe, token, checkFavoriteStatus]);

  return (
    <>
      <Helmet>
        <title>{recipe.title} | Delicious and Easy Recipe</title>
        <meta
          name="description"
          content={`Learn how to make ${recipe.title} with our easy to follow recipe. Perfect for ${recipeInfo && recipeInfo.dishes} this dish will hit with everyone.`}
        />
      </Helmet>
      <NavBar />
      <div
        className="row gap-3 mx-auto mb-20 w-9/12 sm:w-3/5 md:w-5/12"
        style={{ marginTop: '80px' }}
      >
        <div
          className="py-4 px-0 flex justify-center gap-2 items-center flex-col"
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
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full px-0"
        />
        <div style={{ background: '#4B6D62' }} className="py-2 h-full">
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
        <div style={{ background: '#4B6D62' }} className="w-full py-2">
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
