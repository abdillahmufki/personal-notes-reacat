import React from "react";
import PropTypes from "prop-types";
import parser from "html-react-parser";
import LocaleContext from "../contexts/LocaleContext";
import { showFormattedDate } from "../utils";
import { Link } from "react-router-dom";

function NoteItem({ id, title, body, createdAt }) {
  const { selectLanguage } = React.useContext(LocaleContext);
  const formattedDate = showFormattedDate(createdAt);

  return (
    <article className="note-item">
      <h3 className="note-item__title">
        <Link to={`/notes/${id}`}>{title}</Link>
      </h3>
      <p className="note-item__createdAt">
        {selectLanguage({ id: formattedDate, en: formattedDate })}
      </p>
      <p className="note-item__body">{parser(body)}</p>
    </article>
  );
}

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default NoteItem;
