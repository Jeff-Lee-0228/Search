const axios = require('axios')
const {Recipe} = require('../db/models')

// async function ingredientParser(url) {
//   try {
//     const response = await axios.get(
//       `https://ingredients.schollz.now.sh/?url=${url}`
//     )
//     console.log(response)
//   } catch (error) {
//     console.error
//   }
// }

// ingredientParser(`https://www.recipetineats.com/vietnamese-pho-recipe/`)
const getResponse = async () => {
  try {
    const response = await Recipe.findAll({where: {food: 'pho'}})
    console.log(response)
  } catch (error) {
    console.error(error)
  }
}

getResponse()
