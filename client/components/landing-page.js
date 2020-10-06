import React, {Component} from 'react'
import {connect} from 'react-redux'
import {searchRecipe, addRecipe, getRecipe} from '../store/index.js'

export class LandingPage extends Component {
  constructor() {
    super()
    this.state = {search: ''}

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.props.getRecipe()
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const food = this.state.search
    //if recipe exists in database, use searchRecipe thunk creator
    //if recipe does not exist, use addRecipe thunk creator
    const allRecipes = this.props.recipe
    const foods = allRecipes.map((singleRecipe) => singleRecipe.food)
    if (!foods.includes(food)) this.props.addRecipe(food, this.props.user.id)
    else this.props.searchRecipe(food)
    this.setState({
      search: '',
    })
  }

  handleChange(evt) {
    this.setState({
      search: evt.target.value,
    })
  }

  render() {
    return (
      <div>
        <div className="landing-page">
          <form
            className="form-inline active-purple-2"
            onSubmit={this.handleSubmit}
          >
            <input
              value={this.state.search}
              required
              className="form-control form-control-sm mr-3 w-75"
              type="text"
              placeholder="Search"
              aria-label="Search"
              onChange={this.handleChange}
            />
            <button type="submit" className="submit-button">
              <span className="fa fa-search" aria-hidden="true"></span>
            </button>
          </form>
        </div>
        {this.props.search ? (
          this.props.search.map((food) => (
            <div key={food.id}>
              <h5>{food.food}</h5>
              <div>
                {food.ingredients.map((ingredient) => (
                  <div>
                    <ul>
                      <li>
                        {ingredient.measure.amount +
                          ' ' +
                          ingredient.measure.name +
                          ' ' +
                          ingredient.name}
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <h4>Loading...</h4>
        )}
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    search: state.search,
    user: state.user,
    recipe: state.recipe,
  }
}

const mapDispatch = (dispatch) => {
  return {
    searchRecipe: (search) => dispatch(searchRecipe(search)),
    addRecipe: (search, userId) => dispatch(addRecipe(search, userId)),
    getRecipe: () => dispatch(getRecipe()),
  }
}
export default connect(mapState, mapDispatch)(LandingPage)
