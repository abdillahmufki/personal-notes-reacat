import React from "react";
import PropTypes from "prop-types";
import parser from "html-react-parser";
import LocaleContext from "../contexts/LocaleContext";
import { showFormattedDate } from "../utils/index";

function NoteDetail({ title, body, createdAt }) {
  const { selectLanguage } = React.useContext(LocaleContext);
  const formattedDate = selectLanguage({
    id: showFormattedDate(createdAt, "id-ID"),
    en: showFormattedDate(createdAt, "en-US"),
  });

  return (
    <>
      <h3 className="detail-page__title">{title}</h3>
      <p className="detail-page__createdAt">{formattedDate}</p>
      <div className="detail-page__body">{parser(body)}</div>
    </>
  );
}

NoteDetail.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default NoteDetail;
