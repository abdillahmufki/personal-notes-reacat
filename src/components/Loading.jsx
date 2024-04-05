import React from "react";
import ThemeContext from "../contexts/ThemeContext";
import LoaderBlack from "../assets/images/loader-black.svg";
import LoaderWhite from "../assets/images/loader-white.svg";

function Loading() {
  const { theme } = React.useContext(ThemeContext);
  return (
    <div className="loader-container">
      <img
        width={500}
        src={theme === "dark" ? LoaderWhite : LoaderBlack}
        className="loader"
      />
    </div>
  );
}

export default Loading;
