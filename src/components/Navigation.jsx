import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FiLogOut, FiMoon, FiSun } from "react-icons/fi";
import { SiGoogletranslate } from "react-icons/si";
import ThemeContext from "../contexts/ThemeContext";
import LocaleContext from "../contexts/LocaleContext";

function Navigation({ logout, name }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { toggleLocale, selectLanguage } = useContext(LocaleContext);

  const renderLogoutButton = logout && (
    <button className="button-logout" onClick={logout} title="Logout">
      <FiLogOut /> {name}
    </button>
  );

  return (
    <>
      <h1>
        <Link to="/">
          {selectLanguage({ id: "Aplikasi Catatan", en: "Notes App" })}
        </Link>
      </h1>
      {logout !== undefined && (
        <nav className="navigation">
          <ul>
            <li>
              <Link to="/archives">
                {selectLanguage({ id: "Arsip", en: "Archived" })}
              </Link>
            </li>
          </ul>
        </nav>
      )}
      <button className="toggle-locale" onClick={toggleLocale}>
        <SiGoogletranslate />
      </button>
      <button className="toggle-theme" onClick={toggleTheme}>
        {theme === "light" ? <FiMoon /> : <FiSun />}
      </button>
      {renderLogoutButton}
    </>
  );
}

Navigation.propTypes = {
  logout: PropTypes.func,
  name: PropTypes.string,
};

export default Navigation;
