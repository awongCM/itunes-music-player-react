import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import MusicList from "./components/MusicList/MusicList";
import MusicController from "./components/MusicController/MusicController";
import Paper from 'material-ui/Paper';
import {
  applyColorMode,
  createMuiTheme,
  getInitialColorMode,
  isDesktopViewport,
  persistColorMode,
} from './theme';

import * as ItunesService from "./services/ItunesService";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      audios: [],
      currentAudio: {},
      isCurrentlyPlaying: false,
      colorMode: getInitialColorMode(),
      isDesktop: isDesktopViewport(),
    };
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    applyColorMode(this.state.colorMode);
    this.fetchItunesData();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    const isDesktop = isDesktopViewport();
    if (isDesktop !== this.state.isDesktop) {
      this.setState({ isDesktop });
    }
  }

  handleFilterTextInput(filterText) {
    this.setState({
      filterText: filterText
    })
  }

  handlePlayStateChange(isCurrentlyPlaying) {
    this.setState({ isCurrentlyPlaying });
  }

  handleToggleColorMode() {
    const colorMode = this.state.colorMode === 'dark' ? 'light' : 'dark';
    persistColorMode(colorMode);
    applyColorMode(colorMode);
    this.setState({ colorMode });
  }

  handlePrevTrack(item){
    let index = this.state.audios.map((audio) => {
      return audio.previewUrl;
    }).indexOf(item.previewUrl);

    if (index === -1) {
      return;
    }

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

    if (index === -1) {
      return;
    }

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
    const muiTheme = createMuiTheme(this.state.colorMode);

    return (
       <MuiThemeProvider muiTheme={muiTheme}>
       	<Paper className={appClassName}>
          <Header
            currentAudio={this.state.currentAudio}
            colorMode={this.state.colorMode}
            onToggleColorMode={this.handleToggleColorMode.bind(this)}
          />
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
            isDesktop={this.state.isDesktop}
           />
        </Paper>
       </MuiThemeProvider>
    );
  }
}

export default App;
