import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";
import ButtonAction from "../components/Button";
import Loading from "../components/Loading";
import LocaleContext from "../contexts/LocaleContext";
import { getActiveNotes } from "../utils/network-data";

function HomePage() {
  const { selectLanguage } = useContext(LocaleContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState(
    () => searchParams.get("keyword") || ""
  );

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const { data } = await getActiveNotes();
        setNotes(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching active notes:", error);
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  const onAddButtonHandler = () => {
    navigate("/notes/new");
  };

  const onKeywordChangeHandler = (keyword) => {
    setKeyword(keyword);
    setSearchParams({ keyword });
  };

  const filteredNotes = notes.filter(({ title }) =>
    title.toLowerCase().includes(keyword.toLowerCase())
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="homepage">
      <h2>{selectLanguage({ id: "Catatan Aktif", en: "Active Note" })}</h2>
      <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
      <NoteList notes={filteredNotes} />
      <div className="homepage__action">
        <ButtonAction
          title={selectLanguage({ id: "Tambah", en: "Add" })}
          onClick={onAddButtonHandler}
          icon={<FiPlus />}
        />
      </div>
    </section>
  );
}

export default HomePage;
