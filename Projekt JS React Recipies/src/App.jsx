import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import mapStateToProps from './redux/mapStateToProps';
import mapDispatchToProps from './redux/mapDispatchToProps';
import './App.css';
import RecipeList from './components/RecipeList';
import Details from './components/Details';
import Filter from './components/Filter';
import Admin from './components/Admin/Admin';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {
  createTheme,
  ThemeProvider,
  colors,
  Typography,
  ButtonGroup,
  Button,
  Container,
  Box
} from '@mui/material';
import NoMatch404 from './components/NoMatch404';

const THEME = createTheme({
  typography: {
    h1: {
      fontSize: "3rem",
      margin: "1rem 0"
    },
    h2: {
      fontSize: "1.5rem",
      margin: "1rem 0"
    },
    h3: {
      fontSize: "1.25rem",
      margin: "1rem 0"
    }
  },
  palette: {
    primary: {
      main: colors.purple[600]
    },
    secondary: {
      main: "#336633"
    },
    success: {
      main: colors.green[600]
    },
    error: {
      main: colors.red[600]
    }
  }
});

function App(props) {

  const navigate = useNavigate();

  // Lade Daten
  useEffect(() => {
    // Datenbank Daten
    props.loadData();

    // Daten aus dem lokalen Speicher laden
    if (Storage) {
      // Login-State
      if (localStorage.getItem("loggedin") != null) props.login(JSON.parse(localStorage.getItem("loggedin")));
      // angepinnte Rezepte
      if (localStorage.getItem("pinned") != null) props.setPinned(JSON.parse(localStorage.getItem("pinned")));
    }
  }, []);

  // Login-State speichern
  useEffect(() => {
    if (Storage) localStorage.setItem("loggedin", JSON.stringify(props.loggedin))
  }, [props.loggedin])

  // angepinnte Rezepte speichern
  useEffect(() => {
    if (Storage) localStorage.setItem("pinned", JSON.stringify(props.pinnedRecipes))
  }, [props.pinnedRecipes])

  return (
    <ThemeProvider theme={THEME}>
      <Container fixed>
        <Box component="header" sx={{ marginBottom: '2rem' }}>
          <Box component="nav" sx={{ width: '100' }}>
            <ButtonGroup variant="contained" size="small" aria-label="contained primary button group">
              <Button className="active" onClick={() => { props.resetEdit(); navigate("/"); }}>Start</Button>
              <Button onClick={() => navigate("/admin/")}>Admin</Button>
              { props.loggedin &&
                <Button onClick={() => { props.resetEdit(); props.logout(); }}>Abmelden</Button>
              }
            </ButtonGroup>
          </Box>
          <br />
          <Typography variant="h1">Mein Kochbuch</Typography>
        </Box>
        <Box component="main" sx={{ width: '100' }}>
          <Routes>
            <Route path="/" element={
              <>
                <Filter /><br />
                <RecipeList />
              </>
            } />
            <Route path="/recipe/:id/:name" element={<Details />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/*" element={<NoMatch404 />} />
          </Routes>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default connect(mapStateToProps, mapDispatchToProps) (App)