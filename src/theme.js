import getMuiTheme from 'material-ui/styles/getMuiTheme';

const accent = '#ff2d95';
const accentSecondary = '#00e5ff';

const sharedTheme = {
  appBar: {
    height: 56,
  },
  slider: {
    selectionColor: accent,
    handleFillColor: accent,
  },
};

export function createMuiTheme(colorMode) {
  if (colorMode === 'light') {
    return getMuiTheme({
      palette: {
        primary1Color: '#e91e8c',
        accent1Color: accentSecondary,
        canvasColor: '#f8f6fc',
        paperColor: '#ffffff',
        textColor: '#1a1228',
        secondaryTextColor: '#5c4f72',
        alternateTextColor: '#ffffff',
        borderColor: 'rgba(255, 45, 149, 0.15)',
      },
      drawer: {
        color: '#ffffff',
      },
      listItem: {
        secondaryTextColor: '#5c4f72',
        leftIconColor: '#5c4f72',
        rightIconColor: '#5c4f72',
      },
      slider: {
        trackColor: 'rgba(255, 45, 149, 0.2)',
        selectionColor: accent,
        handleFillColor: accent,
      },
      appBar: sharedTheme.appBar,
    });
  }

  return getMuiTheme({
    palette: {
      primary1Color: accent,
      accent1Color: accentSecondary,
      canvasColor: '#080510',
      paperColor: '#0f0a18',
      textColor: '#f0e6ff',
      secondaryTextColor: '#b8a8d4',
      alternateTextColor: '#ffffff',
      borderColor: 'rgba(255, 45, 149, 0.1)',
    },
    drawer: {
      color: '#161022',
    },
    listItem: {
      secondaryTextColor: '#b8a8d4',
      leftIconColor: '#b8a8d4',
      rightIconColor: '#b8a8d4',
    },
    slider: {
      trackColor: 'rgba(255, 45, 149, 0.25)',
      selectionColor: accent,
      handleFillColor: accent,
    },
    appBar: sharedTheme.appBar,
  });
}

export function getInitialColorMode() {
  if (typeof window === 'undefined') {
    return 'dark';
  }

  const stored = window.localStorage.getItem('colorMode');
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }

  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light';
  }

  return 'dark';
}

export function applyColorMode(colorMode) {
  if (typeof document === 'undefined') {
    return;
  }

  document.documentElement.setAttribute('data-theme', colorMode);

  const themeColor = colorMode === 'light' ? '#ffffff' : '#0f0a18';
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', themeColor);
  }
}
