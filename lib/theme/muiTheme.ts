import { createTheme } from "@mui/material/styles";

export const muiTheme = createTheme({
  palette: {
    mode: "dark",
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
      primary: "#f1f5f9",
      secondary: "#94a3b8",
    },
    background: {
      default: "#111111",
      paper: "#1c1c1e",
    },
    divider: "rgba(255,255,255,0.08)",
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
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#111111",
          color: "#f1f5f9",
          scrollbarColor: "#333 transparent",
          "&::-webkit-scrollbar": { width: 6 },
          "&::-webkit-scrollbar-track": { background: "transparent" },
          "&::-webkit-scrollbar-thumb": {
            background: "#333",
            borderRadius: 3,
          },
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
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
        outlined: {
          borderColor: "rgba(255,255,255,0.12)",
          "&:hover": { borderColor: "rgba(255,255,255,0.25)", backgroundColor: "rgba(255,255,255,0.04)" },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "#1c1c1e",
          border: "1px solid rgba(255,255,255,0.07)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "#1c1c1e",
          borderRadius: "14px",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          backgroundColor: "#252528",
          color: "#f1f5f9",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(255,255,255,0.1)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(255,255,255,0.22)",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ce1c1a",
            borderWidth: 1.5,
          },
        },
        input: {
          "&::placeholder": { color: "#64748b", opacity: 1 },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#64748b",
          "&.Mui-focused": { color: "#ce1c1a" },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: { color: "#64748b" },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&:hover": { backgroundColor: "rgba(255,255,255,0.06)" },
          "&.Mui-selected": {
            backgroundColor: "rgba(206,28,26,0.15)",
            "&:hover": { backgroundColor: "rgba(206,28,26,0.2)" },
          },
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          backgroundColor: "#1c1c1e",
          backgroundImage: "none",
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-head": {
            backgroundColor: "#161618",
            fontWeight: 600,
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: "#64748b",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          color: "#e2e8f0",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:hover": { backgroundColor: "rgba(255,255,255,0.03)" },
          "&:last-child td": { borderBottom: 0 },
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
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: "rgba(255,255,255,0.07)" },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          color: "#94a3b8",
          "&.Mui-selected": { color: "#ce1c1a" },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: { backgroundColor: "#ce1c1a" },
        root: { borderBottom: "1px solid rgba(255,255,255,0.07)" },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: "6px",
          fontSize: "0.75rem",
          backgroundColor: "#2a2a2e",
          border: "1px solid rgba(255,255,255,0.1)",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: "#1c1c1e",
          backgroundImage: "none",
          border: "1px solid rgba(255,255,255,0.08)",
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: { borderRadius: "10px" },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: { backgroundColor: "rgba(255,255,255,0.08)" },
      },
    },
  },
});
