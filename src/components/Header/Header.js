import React, { Component } from "react";
import AppBar from "material-ui/AppBar";

import "./Header.css";

class Header extends Component {
  render() {
    return (
      <AppBar
        className="Header"
        title={this.props.currentAudio.trackName || "Itune Music Player"}
        titleStyle={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 600,
          fontSize: '1rem',
          letterSpacing: '-0.01em',
        }}
        showMenuIconButton={false}
      />
    );
  }
}

export default Header;
