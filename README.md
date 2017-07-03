# Itunes Music Player - in React

## Table of Contents

### Front End Tech Stack used for the App
- Material UI - UI framework, popularly used for React Native
- React JS
- CSS3 
- HTML5
- ES6 Classes
- Native Promises
- No other dependencies are needed for build such as Webpack or Babel

### Features Implemented
- Mobile and Desktop modes available
- Music List are filterable by filter text field
- Music controls are all working ie play, pause, prev and next controls are available

### Supported Browsers:
Latest Chrome, Firefox and other Webkit-based browsers Only.  

Apparently IE11 can't seem to read m4a players very well

### Instructions to build and deploy

As mentioned earlier, as there's no heavy dependencies or build configuration process behind this, you 
can just do the following.

1. Download the zipped file.
2. Run `npm install`
3. Run `npm start`
4. The `http://localhost:3000` will load up in the browser.

Have fun!

### TODOS
-Visual indicator to display currently playing track when selecting music from list, at present it's indicated 
on the app bar on top.
-Event Handling for the music list item to stay playing when you switch music items when viewing in mobile mode. At present, you need to have the music controller to explicit play/pause the music when searching/switching music mode.
