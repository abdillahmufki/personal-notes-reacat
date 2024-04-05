import React from "react";
import PropTypes from "prop-types";
import LocaleContext from "../contexts/LocaleContext";

function NoteInput({ state, onTitleChange, onBodyInput }) {
  const { selectLanguage } = React.useContext(LocaleContext);
  const titlePlaceholder = selectLanguage({
    id: "Catatan rahasia",
    en: "Secret note",
  });
  const bodyPlaceholder = selectLanguage({
    id: "Sebenarnya, saya adalah ....",
    en: "Actually, i am ...",
  });

  return (
    <div className="add-new-page__input">
      <input
        className="add-new-page__input__title"
        placeholder={titlePlaceholder}
        value={state.title}
        onChange={onTitleChange}
        spellCheck="false"
      />
      <div
        className="add-new-page__input__body"
        contentEditable="true"
        data-placeholder={bodyPlaceholder}
        onInput={onBodyInput}
        spellCheck="false"
        suppressContentEditableWarning
      ></div>
    </div>
  );
}

NoteInput.propTypes = {
  state: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onBodyInput: PropTypes.func.isRequired,
};

export default NoteInput;
