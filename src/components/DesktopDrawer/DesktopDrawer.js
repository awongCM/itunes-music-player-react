import React, {Component} from 'react';
import IconButton from 'material-ui/IconButton';
import PlayButton from 'material-ui/svg-icons/av/play-arrow';
import PauseButton from 'material-ui/svg-icons/av/pause';
import SkipNextButton from 'material-ui/svg-icons/av/skip-next';
import SkipPrevButton from 'material-ui/svg-icons/av/skip-previous';
import Paper from 'material-ui/Paper';
import Drawer from 'material-ui/Drawer';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';

import * as ItunesService from "../../services/ItunesService";

import './DesktopDrawer.css';

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
	padding: 30,
}

class DesktopDrawer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			albumSongs: []
		}
	}

	componentWillReceiveProps(nextProps) {
		this.lookupAlbumSongs();
	}
	
	componentDidUpdate() {
		
	}

	lookupAlbumSongs() {
	  let search_params = {
          id: this.props.currentAudio.artistId,
          limit: 10,
          entity: 'album'
      };

      ItunesService.request('GET', search_params, 'lookup').then((res) => {
        this.setState({
          albumSongs: res.results
        });
        
      }).catch((err) => {
        console.log("Error when fetching request",err);
      })
	}

	handleSkipPrevTap(){
		if (Object.keys(this.props.currentAudio).length === 0 && this.props.currentAudio.constructor === Object) {
			return;
		}
		this.props.onSkipPrevTap(this.props.currentAudio);

	}

	handleSkipNextTap(){
		if (Object.keys(this.props.currentAudio).length === 0 && this.props.currentAudio.constructor === Object) {
			return;
		}
		this.props.onSkipNextTap(this.props.currentAudio);
	}

	handlePlayTap(){
		if (Object.keys(this.props.currentAudio).length === 0 && this.props.currentAudio.constructor === Object) {
			return;
		}
		this.props.onPlayTap(this.props.currentAudio);
	}

	shouldOpenSideDrawer(){
		if(window.innerWidth < 700) {
			console.log("we\'re in mobile mode ");
			return false;
		}else {
			if(Object.keys(this.props.currentAudio).length === 0 && this.props.currentAudio.constructor === Object) {
				return false;
			} else {
				return true;
			}
		}
	}

	render() {
		

		let shouldOpen = this.shouldOpenSideDrawer();
		let songsList = null;

		songsList = this.state.albumSongs.map( (item, i) => {
			return (
				<div>
					<ListItem className="DrawerListItem" key={i} primaryText={item.collectionName} />
	            </div>
			)
		})

		let button = (this.props.isCurrentlyPlaying ? <PauseButton /> : <PlayButton />);

		return (
			<Drawer width={'70%'} openSecondary={true} open={shouldOpen} >
          			
          			<Paper className="DesktopDrawer">
          				<Avatar className="DesktopDrawerAvatar"
				          src={this.props.currentAudio.artworkUrl60}
				          size={200} />
				        <Paper className="AlbumTrackLabel">
				        	{this.props.currentAudio.trackName}
				        </Paper>
				        <Paper>
				        	<IconButton iconStyle={IconStyles} style={IconStylesLayout} onTouchTap={this.handleSkipPrevTap.bind(this)} >
						      <SkipPrevButton />
						    </IconButton>

						    <IconButton iconStyle={IconStyles} style={IconStylesLayout} onTouchTap={this.handlePlayTap.bind(this)} >
						      {button}
						     </IconButton>

						     <IconButton iconStyle={IconStyles} style={IconStylesLayout} onTouchTap={this.handleSkipNextTap.bind(this)}>
						      <SkipNextButton />
						    </IconButton> 
				        </Paper> 
				    </Paper>

				    <List>
						{songsList}
				    </List>
				    
        	</Drawer>
		);
	}
}

export default DesktopDrawer;