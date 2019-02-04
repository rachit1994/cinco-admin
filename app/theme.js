import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';
import deepOrange from '@material-ui/core/colors/deepOrange';

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
  typography: {
    useNextVariants: true,
  },
});

export default theme;
