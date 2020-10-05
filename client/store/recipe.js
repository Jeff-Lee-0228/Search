import axios from 'axios'

//ACTION TYPE
export const GOT_RECIPE = 'GOT_RECIPE'
//ACTION CREATOR
export const gotRecipe = (recipe) => ({
  type: GOT_RECIPE,
  recipe,
})
//THUNK CREATOR
export const getRecipe = () => async (dispatch) => {
  try {
    const {data} = await axios.get('/api/recipe')
    dispatch(gotRecipe(data))
  } catch (error) {
    console.error(error)
  }
}
//INITIAL STATE
const initialState = []
//REDUCER
export default function (state = initialState, action) {
  switch (action.type) {
    case GOT_RECIPE:
      return [...state, ...action.recipe]
    default:
      return state
  }
}
