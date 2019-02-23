import React, { Component } from "react";
import IconButton from "material-ui/IconButton";
import PlayButton from "material-ui/svg-icons/av/play-arrow";
import PauseButton from "material-ui/svg-icons/av/pause";
import SkipNextButton from "material-ui/svg-icons/av/skip-next";
import SkipPrevButton from "material-ui/svg-icons/av/skip-previous";
import Slider from "material-ui/Slider";
import Paper from "material-ui/Paper";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle
} from "material-ui/Toolbar";

import DesktopDrawer from "../../components/DesktopDrawer/DesktopDrawer";

import "./MusicController.css";

class MusicController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCurrentlyPlaying: true,
      currentAudio: this.props.currentAudio,
      filterText: this.props.filterText
    };
    // i dont want to render the controller for this small css tweak
    this.jsClassName = "";
  }

  shouldComponentUpdate(nextProps, nextState) {
    //TODO - for playing music when switching music items in the list when clicked
    // console.log('will it update? ', nextProps, nextState);

    return true;
  }

  componentWillUpdate(nextProps, nextState) {
    if (!this.state.isCurrentlyPlaying) {
      this.refs.audios.pause();
    } else {
      this.refs.audios.play();
    }

    if (window.innerWidth > 700) {
      console.log("we''re in desktop mode now ");
      return;
    }

    if (nextProps.isCurrentlyPlaying === this.state.isCurrentlyPlaying) {
      this.jsClassName = nextProps.isCurrentlyPlaying ? "jsShow" : "";
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isCurrentlyPlaying) {
      this.refs.audios.play();
    } else {
      this.refs.audios.pause();
    }
  }

  handleSkipPrevTap() {
    this.props.onSkipPrev(this.props.currentAudio);
  }

  handleSkipNextTap() {
    this.props.onSkipNext(this.props.currentAudio);
  }

  handlePlayTap() {
    let playingNow = false;

    if (this.refs.audios.duration > 0 && !this.refs.audios.paused) {
      this.refs.audios.pause();
      playingNow = false;
    } else {
      this.refs.audios.play();
      playingNow = true;
    }

    this.setState({
      isCurrentlyPlaying: playingNow
    });
  }

  render() {
    const button = this.state.isCurrentlyPlaying ? (
      <PauseButton />
    ) : (
      <PlayButton />
    );

    return (
      <Paper className={"MusicController " + this.jsClassName}>
        <Toolbar>
          <ToolbarGroup>
            <IconButton onTouchTap={this.handleSkipPrevTap.bind(this)}>
              <SkipPrevButton />
            </IconButton>
          </ToolbarGroup>
          <ToolbarGroup>
            <IconButton onTouchTap={this.handlePlayTap.bind(this)}>
              {button}
            </IconButton>
          </ToolbarGroup>

          <ToolbarGroup>
            <IconButton onTouchTap={this.handleSkipNextTap.bind(this)}>
              <SkipNextButton />
            </IconButton>
          </ToolbarGroup>
        </Toolbar>

        <Slider className="SliderToolbar" defaultValue={0.5} />

        <DesktopDrawer
          isCurrentlyPlaying={this.state.isCurrentlyPlaying}
          currentAudio={this.props.currentAudio}
          onSkipPrevTap={this.handleSkipPrevTap.bind(this)}
          onPlayTap={this.handlePlayTap.bind(this)}
          onSkipNextTap={this.handleSkipNextTap.bind(this)}
        />
        <audio src={this.props.currentAudio.previewUrl} ref="audios" />
      </Paper>
    );
  }
}

export default MusicController;
