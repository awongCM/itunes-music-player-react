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
  ToolbarGroup
} from "material-ui/Toolbar";

import DesktopDrawer from "../../components/DesktopDrawer/DesktopDrawer";

import "./MusicController.css";

class MusicController extends Component {
  componentDidUpdate(prevProps) {
    const audio = this.refs.audios;
    if (!audio) {
      return;
    }

    const trackChanged =
      prevProps.currentAudio.previewUrl !== this.props.currentAudio.previewUrl;
    const playStateChanged =
      prevProps.isCurrentlyPlaying !== this.props.isCurrentlyPlaying;

    if (!trackChanged && !playStateChanged) {
      return;
    }

    if (this.props.isCurrentlyPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }

  handleSkipPrevTap() {
    this.props.onSkipPrev(this.props.currentAudio);
  }

  handleSkipNextTap() {
    this.props.onSkipNext(this.props.currentAudio);
  }

  handlePlayTap() {
    const audio = this.refs.audios;
    const playingNow = audio.paused;

    if (playingNow) {
      audio.play();
    } else {
      audio.pause();
    }

    this.props.onPlayStateChange(playingNow);
  }

  render() {
    const { isCurrentlyPlaying, currentAudio } = this.props;
    const hasTrack = !!(currentAudio && currentAudio.previewUrl);
    const isDesktop = typeof window !== "undefined" && window.innerWidth > 700;
    const showMobilePlayer = hasTrack && !isDesktop;

    const button = isCurrentlyPlaying ? <PauseButton /> : <PlayButton />;

    return (
      <Paper className={"MusicController" + (showMobilePlayer ? " jsShow" : "")}>
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
          isCurrentlyPlaying={isCurrentlyPlaying}
          currentAudio={currentAudio}
          onSkipPrevTap={this.handleSkipPrevTap.bind(this)}
          onPlayTap={this.handlePlayTap.bind(this)}
          onSkipNextTap={this.handleSkipNextTap.bind(this)}
        />
        <audio src={currentAudio.previewUrl} ref="audios" />
      </Paper>
    );
  }
}

export default MusicController;
