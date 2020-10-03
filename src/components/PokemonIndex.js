import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonPage extends React.Component {
  constructor() {
    super()
    this.state = {
        pokemon: [],
        searchedPokemon: [],
        searchTerm: ''
    }
}

fetchData = () => {
  return fetch('http://localhost:3000/pokemon')
  .then(resp => resp.json())
  .then(data => this.setState({
    pokemon: data,
    searchedPokemon: data,
    searchTerm: data 
  }));
}

// componentDidMount(){
//   fetch('http://localhost:3000/pokemon')
//     .then(resp => resp.json())
//     .then(data => this.setState({
//       pokemon: data,
//       searchedPokemon: data,
//       searchTerm: data 
//     }));
// }
componentDidMount(){
  this.fetchData();
  this.handleSearchChange;
  
  
}

handleSearchChange = (event, props) => {

  this.setState({searchTerm: props.value})
  this.handleFilter(this.state.searchTerm)
}

handleFilter = searchTerm => {
  let pokemonCopy = [...this.state.pokemon]
  let searchedPokemon = pokemonCopy.filter(pokemon => pokemon.name.includes(searchTerm))
  this.setState({searchedPokemon})
}

renderNewPokemon = data => {
  console.log(data)
  let pokemonCopy = [...this.state.pokemon, data]
  this.setState({pokemon: pokemonCopy})
  this.setState({searchedPokemon: pokemonCopy})
}

  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={_.debounce(this.handleSearchChange, 500)} showNoResults={false} />
        <br />
        <PokemonForm renderNewPokemon={this.renderNewPokemon} />
        <br />
        <PokemonCollection pokemon={this.state.searchedPokemon} />
      </div>
    )
  }
}

export default PokemonPage
