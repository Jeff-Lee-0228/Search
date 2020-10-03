// const router = require('express').Router()
// const axios = require('axios')

// module.exports = router

// // GET: api/recipe route
// // allowed admins only
// router.get('/', async (req, res, next) => {
//   try {
//     //find all recipes
//     console.log(req, res)
//   } catch (error) {
//     console.error(error)
//   }
// })

// // GET: api/recipe/:recipe route
// router.get('/:recipe', async (req, res, next) => {
//   try {
//     //find table with corresponding recipe and return data in json
//     console.log(req, res)
//   } catch (error) {
//     console.error(error)
//   }
// })

// // POST : api/recipe route
// router.post('/', async (req, res, next) => {
//   //converting REQ.PARAMS with white space when running SERP api
//   const {recipe} =
//     (await req.body.recipe.replaceAll('%', ' ')) + ' sauce recipe'

//   //default params setting before running SERP API
//   const params = {
//     access_key: process.env.SERPSTACK_ACCESS_KEY,
//     query: recipe,
//     num: 30,
//   }

//   //run SERP api
//   const result = serpRecipe(params)

//   //run web parsing api with 'result.organic_results'
//   const urls = result.organic_results
//   const data = urls.map((url) => ingredientParser(url))
//   console.log(data, res)
// })

// //SERP function
// //using serpStack api
// async function serpRecipe(params) {
//   try {
//     const response = await axios.get('http://api.serpstack.com/search', {
//       params,
//     })
//     return response.data
//   } catch (error) {
//     console.error(error)
//   }
// }

// //website parsing api
// //REFERENCE: https://github.com/schollz/ingredients
// //save data to the database
// async function ingredientParser(url) {
//   try {
//     const response = await axios.get(
//       `https://ingredients.schollz.now.sh/?url=${url}`
//     )
//     console.log(response.data)

//     //create recipe table
//   } catch (error) {
//     console.error
//   }
// }
