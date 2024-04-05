import React, { useContext, useEffect, useState } from "react";
import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";
import Loading from "../components/Loading";
import LocaleContext from "../contexts/LocaleContext";
import { getArchivedNotes } from "../utils/network-data";
import { useSearchParams } from "react-router-dom";

function ArchivePage() {
  const { selectLanguage } = useContext(LocaleContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState(
    () => searchParams.get("keyword") || ""
  );

  useEffect(() => {
    const fetchArchivedNotes = async () => {
      try {
        const { data } = await getArchivedNotes();
        setNotes(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching archived notes:", error);
        setLoading(false);
      }
    };
    fetchArchivedNotes();
  }, []);

  const handleKeywordChange = (keyword) => {
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
      <h2>{selectLanguage({ id: "Catatan Arsip", en: "Archived Note" })}</h2>
      <SearchBar keyword={keyword} keywordChange={handleKeywordChange} />
      <NoteList notes={filteredNotes} />
    </section>
  );
}

export default ArchivePage;
