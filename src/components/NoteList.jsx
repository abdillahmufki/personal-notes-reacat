import React from "react";
import PropTypes from "prop-types";
import NoteItem from "./NoteItem";
import LocaleContext from "../contexts/LocaleContext";

function NoteList({ notes }) {
  const { selectLanguage } = React.useContext(LocaleContext);

  const renderNotes = () => {
    if (notes.length > 0) {
      return (
        <section className="notes-list">
          {notes.map(({ id, title, body, createdAt }) => (
            <NoteItem
              key={id}
              id={id}
              title={title}
              body={body}
              createdAt={createdAt}
            />
          ))}
        </section>
      );
    } else {
      return (
        <section className="notes-list-empty">
          <p className="notes-list__empty">
            {selectLanguage({
              id: "Tidak ada catatan yang tersedia.",
              en: "No notes available.",
            })}
          </p>
        </section>
      );
    }
  };

  return <div>{renderNotes()}</div>;
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NoteList;
