import axios from 'axios'

//ACTION TYPE
export const SEARCHED_RECIPE = 'SEARCHED_RECIPE'
export const ADDED_RECIPE = 'ADDED_RECIPE'

//ACTION CREATOR
export const searchedRecipe = (search) => ({
  type: SEARCHED_RECIPE,
  search,
})
export const addedRecipe = (search) => ({
  type: ADDED_RECIPE,
  search,
})

//THUNK CREATOR
export const searchRecipe = (search) => async (dispatch) => {
  //search value should not have white space when passed as REQ.PARAMS
  const recipe = search.replaceAll(' ', '%')
  try {
    const {data} = await axios.get(`/api/recipe/${recipe}`)
    dispatch(searchedRecipe(data))
  } catch (error) {
    console.error(error)
  }
}
export const addRecipe = (search) => async (dispatch) => {
  //search value should not have white space when passed as REQ.PARAMS
  const recipe = search.replaceAll(' ', '%')
  try {
    const {data} = await axios.post(`/api/recipe`, {recipe})
    dispatch(addedRecipe(data))
  } catch (error) {
    console.error(error)
  }
}

//INITIAL STATE
const initialState = {recipe: {}}
//REDUCER
export default function (state = initialState, action) {
  switch (action.type) {
    case SEARCHED_RECIPE:
      return action.search
    case ADDED_RECIPE:
      return {...state, recipe: action.search}
    default:
      return state
  }
}
