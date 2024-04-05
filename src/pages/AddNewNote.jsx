import React, { useContext, useState } from "react";
import NoteInput from "../components/NoteInput";
import ButtonAction from "../components/Button";
import LocaleContext from "../contexts/LocaleContext";
import { addNote } from "../utils/network-data";
import { useNavigate } from "react-router-dom";
import { FiCheck } from "react-icons/fi";

function AddNewNote() {
  const { selectLanguage } = useContext(LocaleContext);
  const navigate = useNavigate();
  const [newNote, setNewNote] = useState({
    title: "",
    body: "",
  });

  const handleTitleChange = (event) => {
    const { value } = event.target;
    setNewNote((prevNewNote) => ({
      ...prevNewNote,
      title: value,
    }));
  };

  const handleBodyInput = (event) => {
    const { innerHTML } = event.target;
    setNewNote((prevNewNote) => ({
      ...prevNewNote,
      body: innerHTML,
    }));
  };

  const saveNoteHandler = async () => {
    await addNote(newNote);
    navigate("/");
  };

  return (
    <section className="add-new-note">
      <NoteInput
        state={newNote}
        onTitleChange={handleTitleChange}
        onBodyInput={handleBodyInput}
      />
      <div className="button-container">
        <ButtonAction
          title={selectLanguage({ id: "Simpan", en: "Save" })}
          onClick={saveNoteHandler}
          icon={<FiCheck />}
        />
      </div>
    </section>
  );
}

export default AddNewNote;
