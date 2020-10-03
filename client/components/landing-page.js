import React, {Component} from 'react'
import {connect} from 'react-redux'
import {searchRecipe} from '../store/index.js'

export class LandingPage extends Component {
  constructor() {
    super()
    this.state = {search: ''}

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    console.log('search term submitted ---> ', this.state.search)
    const search = this.state.search
    //if recipe exists in database, use searchRecipe thunk creator
    //if recipe does not exist, use addRecipe thunk creator
    this.props.searchRecipe(search)
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
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    recipe: state.recipe,
  }
}

const mapDispatch = (dispatch) => {
  return {
    searchRecipe: (search) => dispatch(searchRecipe(search)),
  }
}
export default connect(mapState, mapDispatch)(LandingPage)
