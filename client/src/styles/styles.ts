import { createTheme, PaletteMode, ThemeProvider } from "@mui/material";
import { grey, deepOrange, pink } from "@mui/material/colors";

const getDesignTokens = (mode: PaletteMode) => ({
  breakpoints: {
    values: {
      xs: 0,
      sm: 750,
      md: 1000,
      lg: 1300,
      xl: 1650,
    },
  },
  palette: {
    mode,

    primary: {
      ...pink,
      ...(mode === "dark"
        ? {
            main: pink[200],
          }
        : { main: deepOrange[700] }),
    },

    secondary: {
      ...pink,
      ...(mode === "dark"
        ? {
            main: pink[500],
          }
        : { main: deepOrange[100] }),
    },

    ...(mode === "dark"
      ? {
          background: {
            default: grey[900],
            paper: grey[900],
          },
        }
      : {
          background: {
            default: grey[200],
            paper: grey[500],
          },
        }),

    text: {
      ...(mode === "light"
        ? {
            primary: grey[900],
            secondary: grey[700],
          }
        : {
            primary: grey[200],
            secondary: grey[500],
          }),
    },
  },
});
let theme = createTheme(getDesignTokens("dark"));

theme = createTheme(theme, {
  components: {
    MuiButtonBase: {
      defaultProps: {
        // disableRipple: true
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          // margin: '5px 0px'
        },
      },
      defaultProps: {
        margin: "dense",
      },
    },
  },
});

export { ThemeProvider, theme };
