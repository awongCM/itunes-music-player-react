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
      this.attemptPlay();
    } else {
      audio.pause();
    }
  }

  attemptPlay() {
    const audio = this.refs.audios;
    if (!audio) {
      return;
    }

    const playPromise = audio.play();
    if (playPromise && typeof playPromise.then === 'function') {
      playPromise.catch(() => {
        if (this.props.isCurrentlyPlaying) {
          this.props.onPlayStateChange(false);
        }
      });
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
    if (!audio) {
      return;
    }

    if (audio.paused) {
      const playPromise = audio.play();
      if (playPromise && typeof playPromise.then === 'function') {
        playPromise
          .then(() => this.props.onPlayStateChange(true))
          .catch(() => this.props.onPlayStateChange(false));
      } else {
        this.props.onPlayStateChange(!audio.paused);
      }
    } else {
      audio.pause();
      this.props.onPlayStateChange(false);
    }
  }

  render() {
    const { isCurrentlyPlaying, currentAudio, isDesktop } = this.props;
    const hasTrack = !!(currentAudio && currentAudio.previewUrl);
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
          isDesktop={isDesktop}
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
