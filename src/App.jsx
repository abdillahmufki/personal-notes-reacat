import React from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import ArchivePage from "./pages/ArchivePage";
import AddNewNote from "./pages/AddNewNote";
import DetailsPage from "./pages/DetailsPage";
import PageNotFound from "./pages/PageNotFound";
import LocaleContext from "./contexts/LocaleContext";
import ThemeContext from "./contexts/ThemeContext";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { getUserLogged, putAccessToken } from "./utils/network-data";

function App() {
  const [authedUser, setAuthedUser] = React.useState(null);
  const [initializing, setInitializing] = React.useState(true);
  const [locale, setLocale] = React.useState(
    localStorage.getItem("locale") || "id"
  );
  const [theme, setTheme] = React.useState(
    localStorage.getItem("theme") || "dark"
  );

  const toggleLocale = () => {
    setLocale((prevLocale) => {
      const newLocale = prevLocale === "id" ? "en" : "id";
      localStorage.setItem("locale", newLocale);
      return newLocale;
    });
  };

  const selectLanguage = ({ id, en }) => {
    if (id === undefined || en === undefined) {
      return "language options is empty";
    }
    return locale === "id" ? id : en;
  };

  const localeContextValue = React.useMemo(() => {
    return {
      locale,
      toggleLocale,
      selectLanguage,
    };
  }, [locale]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  const themeContextValue = React.useMemo(() => {
    return {
      theme,
      toggleTheme,
    };
  }, [theme]);

  React.useEffect(() => {
    getUserLogged().then(({ data }) => {
      setAuthedUser(data);
      setInitializing(false);
    });
  }, []);

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const onLoginSuccess = async ({ accessToken }) => {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
  };

  const onLogout = () => {
    setAuthedUser(null);
    putAccessToken("");
  };

  if (initializing) {
    return null;
  }

  if (authedUser === null) {
    return (
      <LocaleContext.Provider value={localeContextValue}>
        <ThemeContext.Provider value={themeContextValue}>
          <div className="app-container">
            <header>
              <Navigation />
            </header>
            <main>
              <Routes>
                <Route
                  path="/*"
                  element={<LoginPage loginSuccess={onLoginSuccess} />}
                />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            </main>
          </div>
        </ThemeContext.Provider>
      </LocaleContext.Provider>
    );
  }

  return (
    <LocaleContext.Provider value={localeContextValue}>
      <ThemeContext.Provider value={themeContextValue}>
        <div className="app-container">
          <header>
            <Navigation
              logout={onLogout}
              name={authedUser.name}
              toggleTheme={toggleTheme}
            />
          </header>
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/archives" element={<ArchivePage />} />
              <Route path="/notes/new" element={<AddNewNote />} />
              <Route path="/notes/:id" element={<DetailsPage />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </main>
        </div>
      </ThemeContext.Provider>
    </LocaleContext.Provider>
  );
}

export default App;
