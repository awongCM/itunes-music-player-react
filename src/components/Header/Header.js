import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import Brightness2Icon from "material-ui/svg-icons/image/brightness-2";
import Brightness7Icon from "material-ui/svg-icons/image/brightness-7";

import "./Header.css";

class Header extends Component {
  render() {
    const isDark = this.props.colorMode === 'dark';
    const toggleLabel = isDark ? 'Switch to light mode' : 'Switch to dark mode';
    const toggleIcon = isDark ? (
      <Brightness7Icon />
    ) : (
      <Brightness2Icon />
    );

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
        iconElementRight={
          <IconButton
            className="Header__themeToggle"
            onTouchTap={this.props.onToggleColorMode}
            tooltip={toggleLabel}
            aria-label={toggleLabel}
          >
            {toggleIcon}
          </IconButton>
        }
      />
    );
  }
}

export default Header;
