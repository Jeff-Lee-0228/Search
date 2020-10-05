const axios = require('axios')

const params = {
  access_key: process.env.SERPSTACK_ACCESS_KEY,
  query: 'pad thai recipe',
  num: 30,
}

async function SerpRecipe(params) {
  try {
    const response = await axios.get('http://api.serpstack.com/search', {
      params,
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}

SerpRecipe(params).then((response) => console.log(response))
