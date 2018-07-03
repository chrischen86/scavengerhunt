import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#5e92f3',
        main: '#1565c0',
        dark: '#003c8f',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ffffb0',
        main: '#ffe57f',
        dark: '#cab350',
        contrastText: '#000',
      },
    },
  });

function withRoot(Component) {
  function WithRoot(props) {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <MuiThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }

  return WithRoot;
}

export default withRoot;