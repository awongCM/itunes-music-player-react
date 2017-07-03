import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import MusicList from "./components/MusicList/MusicList";
import MusicController from "./components/MusicController/MusicController";
import Paper from 'material-ui/Paper';

import * as ItunesService from "./services/ItunesService";


class App extends Component {

  state = {
    filterText: '',
    audios: [],
    currentAudio: {},
    isCurrentlyPlaying: false
  };

  componentDidMount() {
      this.fetchItunesData();
  }

  handleFilterTextInput(filterText) {
    this.setState({
      filterText: filterText
    })
  }

  handlePrevTrack(item){
    let index = this.state.audios.map((audio) => {
      return audio.previewUrl;
    }).indexOf(item.previewUrl);

    if (index === 0) {
        index = this.state.audios.length - 1;
    } else {
        index = index - 1;
    }

    this.setState({
       currentAudio: this.state.audios[index]
    })
  }

  handleNextTrack(item) {
    let index = this.state.audios.map((audio) => {
      return audio.previewUrl;
    }).indexOf(item.previewUrl);


    if (index === this.state.audios.length - 1) {
        index = 0;
    } else {
        index = index + 1;
    }

    this.setState({
       currentAudio: this.state.audios[index]
    }) 
  }

  handleChangeSong(item){
    console.log(item.trackName);

    this.setState({
      currentAudio: item,
      isCurrentlyPlaying: true
    })
  }

  fetchItunesData() {
    let search_params = {
          term: '80s',
          limit: 25,
          media: 'music'
      };

      ItunesService.request('GET', search_params, 'search').then((res) => {
        this.setState({
          audios: res.results
        });
        
      }).catch((err) => {
        console.log(err);//can't get any...
      })
  }
  
  render() {
    return (
       <MuiThemeProvider>
       	<Paper>
          <Header currentAudio={this.state.currentAudio} />
          <SearchBar 
            filterText={this.state.filterText}
            onFilterTextInput={this.handleFilterTextInput.bind(this)}
          />
          <MusicList 
            musicItems={this.state.audios}
            currentAudio={this.state.currentAudio}
            isCurrentlyPlaying={this.state.isCurrentlyPlaying}
            filterText={this.state.filterText}
            onChangeSong={this.handleChangeSong.bind(this)}
          />
          <MusicController
            onSkipPrev={this.handlePrevTrack.bind(this)}
            onSkipNext={this.handleNextTrack.bind(this)}
            currentAudio={this.state.currentAudio}
            filterText={this.state.filterText}
            isCurrentlyPlaying={this.state.isCurrentlyPlaying}
           />
        </Paper>
       </MuiThemeProvider>
    );
  }
}

export default App;
