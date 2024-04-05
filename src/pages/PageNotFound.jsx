import React from "react";
import LocaleContext from "../contexts/LocaleContext";
import Image from "../assets/images/notfound.svg";

function PageNotFound() {
  const { selectLanguage } = React.useContext(LocaleContext);
  return (
    <section
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img src={Image} alt="Page not found" width={500} />
      <p>
        {selectLanguage({
          id: "Halaman tidak ditemukan.",
          en: "Page not found.",
        })}
      </p>
    </section>
  );
}

export default PageNotFound;
