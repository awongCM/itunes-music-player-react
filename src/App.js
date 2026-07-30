import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import MusicList from "./components/MusicList/MusicList";
import MusicController from "./components/MusicController/MusicController";
import Paper from 'material-ui/Paper';

import * as ItunesService from "./services/ItunesService";

const darkTheme = getMuiTheme({
  palette: {
    primary1Color: '#ff2d95',
    accent1Color: '#00e5ff',
    canvasColor: '#080510',
    paperColor: '#0f0a18',
    textColor: '#f0e6ff',
    secondaryTextColor: '#b8a8d4',
    alternateTextColor: '#ffffff',
    borderColor: 'rgba(255, 45, 149, 0.1)',
  },
  appBar: {
    height: 56,
  },
  drawer: {
    color: '#161022',
  },
  listItem: {
    secondaryTextColor: '#b8a8d4',
    leftIconColor: '#b8a8d4',
    rightIconColor: '#b8a8d4',
  },
  slider: {
    trackColor: 'rgba(255, 45, 149, 0.25)',
    selectionColor: '#ff2d95',
    handleFillColor: '#ff2d95',
  },
});

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

  handlePlayStateChange(isCurrentlyPlaying) {
    this.setState({ isCurrentlyPlaying });
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
       currentAudio: this.state.audios[index],
       isCurrentlyPlaying: true
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
       currentAudio: this.state.audios[index],
       isCurrentlyPlaying: true
    })
  }

  handleChangeSong(item){
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
    const hasTrack = !!(this.state.currentAudio && this.state.currentAudio.previewUrl);
    const appClassName = 'App' + (hasTrack ? ' App--player-visible' : '');

    return (
       <MuiThemeProvider muiTheme={darkTheme}>
       	<Paper className={appClassName}>
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
            onPlayStateChange={this.handlePlayStateChange.bind(this)}
            currentAudio={this.state.currentAudio}
            isCurrentlyPlaying={this.state.isCurrentlyPlaying}
           />
        </Paper>
       </MuiThemeProvider>
    );
  }
}

export default App;
