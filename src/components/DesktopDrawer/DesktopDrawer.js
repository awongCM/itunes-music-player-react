import React, { Component } from "react";
import IconButton from "material-ui/IconButton";
import PlayButton from "material-ui/svg-icons/av/play-arrow";
import PauseButton from "material-ui/svg-icons/av/pause";
import SkipNextButton from "material-ui/svg-icons/av/skip-next";
import SkipPrevButton from "material-ui/svg-icons/av/skip-previous";
import Paper from "material-ui/Paper";
import Drawer from "material-ui/Drawer";
import Avatar from "material-ui/Avatar";
import { List, ListItem } from "material-ui/List";

import * as ItunesService from "../../services/ItunesService";

import "./DesktopDrawer.css";

/*
 * Styling attributes for Icon Buttons
 * as per Material UIdocumentation
 */

const IconStyles = {
  height: 60,
  width: 60
};

const IconStylesLayout = {
  height: 120,
  width: 120,
  padding: 30
};

class DesktopDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albumSongs: []
    };
  }

  componentWillReceiveProps(nextProps) {
    const prevArtistId = this.props.currentAudio && this.props.currentAudio.artistId;
    const nextArtistId = nextProps.currentAudio && nextProps.currentAudio.artistId;

    if (nextArtistId && nextArtistId !== prevArtistId) {
      this.lookupAlbumSongs(nextProps.currentAudio);
    }
  }

  componentDidUpdate() {}

  lookupAlbumSongs(currentAudio) {
    const audio = currentAudio || this.props.currentAudio;

    if (!audio || !audio.artistId) {
      return;
    }

    let search_params = {
      id: audio.artistId,
      limit: 10,
      entity: "album"
    };

    ItunesService.request("GET", search_params, "lookup")
      .then(res => {
        this.setState({
          albumSongs: res.results
        });
      })
      .catch(err => {
        console.log("Error when fetching request", err);
      });
  }

  handleSkipPrevTap() {
    if (
      Object.keys(this.props.currentAudio).length === 0 &&
      this.props.currentAudio.constructor === Object
    ) {
      return;
    }
    this.props.onSkipPrevTap(this.props.currentAudio);
  }

  handleSkipNextTap() {
    if (
      Object.keys(this.props.currentAudio).length === 0 &&
      this.props.currentAudio.constructor === Object
    ) {
      return;
    }
    this.props.onSkipNextTap(this.props.currentAudio);
  }

  handlePlayTap() {
    if (
      Object.keys(this.props.currentAudio).length === 0 &&
      this.props.currentAudio.constructor === Object
    ) {
      return;
    }
    this.props.onPlayTap(this.props.currentAudio);
  }

  shouldOpenSideDrawer() {
    if (!this.props.isDesktop) {
      return false;
    }

    if (
      Object.keys(this.props.currentAudio).length === 0 &&
      this.props.currentAudio.constructor === Object
    ) {
      return false;
    }

    return true;
  }

  render() {
    let shouldOpen = this.shouldOpenSideDrawer();
    let songsList = null;

    songsList = this.state.albumSongs.map((item, i) => {
      return (
        <ListItem
          className="DrawerListItem"
          key={item.collectionId || i}
          primaryText={item.collectionName}
        />
      );
    });

    let button = this.props.isCurrentlyPlaying ? (
      <PauseButton />
    ) : (
      <PlayButton />
    );

    return (
      <Drawer width={"70%"} openSecondary={true} open={shouldOpen}>
        <Paper className="DesktopDrawer">
          <Avatar
            className="DesktopDrawerAvatar"
            src={this.props.currentAudio.artworkUrl60}
            size={200}
          />
          <Paper className="DesktopDrawer__trackName">
            {this.props.currentAudio.trackName}
          </Paper>
          <Paper className="DesktopDrawer__artistName">
            {this.props.currentAudio.artistName}
          </Paper>
          <Paper className="DesktopDrawer__controls">
            <IconButton
              iconStyle={IconStyles}
              style={IconStylesLayout}
              onTouchTap={this.handleSkipPrevTap.bind(this)}
            >
              <SkipPrevButton />
            </IconButton>

            <IconButton
              iconStyle={IconStyles}
              style={IconStylesLayout}
              onTouchTap={this.handlePlayTap.bind(this)}
            >
              {button}
            </IconButton>

            <IconButton
              iconStyle={IconStyles}
              style={IconStylesLayout}
              onTouchTap={this.handleSkipNextTap.bind(this)}
            >
              <SkipNextButton />
            </IconButton>
          </Paper>
        </Paper>

        <div className="DesktopDrawer__albumHeading">Albums by artist</div>
        <List>{songsList}</List>
      </Drawer>
    );
  }
}

export default DesktopDrawer;
