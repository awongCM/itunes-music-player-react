import React, { Component } from 'react';
import AppBar from "material-ui/AppBar";

import './Header.css';

class Header extends Component {

	render() {
		return (
			<AppBar className="Header" title={this.props.currentAudio.trackName} showMenuIconButton={false} />
		);
	}
}

export default Header;