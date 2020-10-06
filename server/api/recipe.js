const router = require('express').Router()
const axios = require('axios')
const {Recipe} = require('../db/models')

module.exports = router

// GET: api/recipe route
// allowed admins only
router.get('/', async (req, res, next) => {
  try {
    //find all recipes
    const recipes = await Recipe.findAll({
      attributes: ['id', 'food', 'ingredients'],
    })
    res.json(recipes)
  } catch (error) {
    console.error(error)
  }
})

// GET: api/recipe/:recipe route
router.get('/:recipe', async (req, res, next) => {
  try {
    //find table with corresponding recipe and return data in json
    const recipe = await Recipe.findAll({
      where: {
        food: req.params.recipe,
      },
      attributes: ['id', 'food', 'ingredients'],
    })
    res.json(recipe)
  } catch (error) {
    console.error(error)
  }
})

// POST : api/recipe route
router.post('/', async (req, res, next) => {
  try {
    //converting REQ.PARAMS with white space when running SERP api
    const recipe = req.body.recipe
    const userId = req.body.userId
    const newRecipe = recipe.split('%').join(' ') + ' recipe'

    //default params setting before running SERP API
    const params = {
      access_key: process.env.SERPSTACK_ACCESS_KEY,
      query: newRecipe,
      num: 15,
    }

    //run SERP api
    //using serpStack api
    const {data} = await axios.get('http://api.serpstack.com/search', {
      params,
    })
    //run web parsing api with 'result.organic_results'
    const organicResults = data.organic_results
    const urls = organicResults.map((result) => result.url)
    const addedRecipe = urls.map((url) =>
      ingredientParser(url, newRecipe, userId)
    )
    Promise.all(addedRecipe).then(async () => {
      const response = await Recipe.findAll({where: {food: req.body.recipe}})
      res.status(201).json(response)
    })
  } catch (error) {
    console.error(error)
  }
})

//website parsing api
//REFERENCE: https://github.com/schollz/ingredients
// save data to the database
async function ingredientParser(url, recipe, userId) {
  const food = recipe.split(' ').slice(0, -1).join(' ')
  try {
    const response = await axios.get(
      `https://ingredients.schollz.now.sh/?url=${url}`
    )

    //create recipe table
    if (response.data.ingredients.length !== 0) {
      const addedOneRecipe = await Recipe.create({
        food: food,
        ingredients: response.data.ingredients,
        userId: userId,
      })
      console.log('created a recipe!')
      return addedOneRecipe
    }
  } catch (error) {
    console.error(error)
  }
}
