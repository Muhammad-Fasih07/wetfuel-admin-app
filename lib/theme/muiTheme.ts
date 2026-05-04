import { createTheme } from "@mui/material/styles";

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: "#ce1c1a",
      dark: "#bf2524",
      light: "#f0797a",
      contrastText: "#ffffff",
    },
    error: {
      main: "#f0797a",
    },
    success: {
      main: "#22c55e",
    },
    warning: {
      main: "#f59e0b",
    },
    info: {
      main: "#3b82f6",
    },
    text: {
      primary: "#2b2b2b",
      secondary: "#887b6a",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    divider: "#e5e7eb",
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: "var(--font-inter), Inter, sans-serif",
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    subtitle1: { fontWeight: 500 },
    subtitle2: { fontWeight: 500 },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          borderRadius: "8px",
          padding: "8px 20px",
        },
        contained: {
          background: "linear-gradient(135deg, #cd171a, #ce1c1a, #bf2524)",
          "&:hover": {
            background: "linear-gradient(135deg, #bf2524, #a61e1c, #8b1816)",
            boxShadow: "0 0 20px rgba(206,28,26,0.25)",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#e0e0e0",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#bdbdbd",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ce1c1a",
            borderWidth: 2,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: "#ce1c1a",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "14px",
          boxShadow: "0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)",
          border: "1px solid rgba(0,0,0,0.06)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: "6px",
          fontWeight: 500,
          fontSize: "0.75rem",
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-head": {
            backgroundColor: "#f9fafb",
            fontWeight: 600,
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: "#887b6a",
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#f5f5f5",
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          "&.Mui-selected": {
            color: "#ce1c1a",
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: "#ce1c1a",
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: "6px",
          fontSize: "0.75rem",
        },
      },
    },
  },
});
