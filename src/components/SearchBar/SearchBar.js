import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import './SearchBar.css';

class SearchBar extends Component {

  handleFilterTextInputChange(e){
    this.props.onFilterTextInput(e.target.value);
  }

  render() {
		return (
      <Paper className="SearchBar" >
      	<TextField
          hintText="By Artist"
          floatingLabelText="Search 80s Music"
          fullWidth={true}
          onChange={this.handleFilterTextInputChange.bind(this)}
          value={this.props.filterText}
        />
      </Paper>
		);
	}
}

export default SearchBar;