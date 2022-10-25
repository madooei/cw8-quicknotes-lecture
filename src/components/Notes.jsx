import Note from "./Note";
import PropTypes from "prop-types";
import { Accordion } from "@mantine/core";
import Debug from "debug";
import { useEffect } from "react";

const debug = new Debug("quicknotes:components:Notes.jsx");

function Notes(props) {
  const { notes, query, remove } = props;

  useEffect(() => {
    debug("Query is update! Will filter the notes..")
  }, [query])

  return (
    <Accordion chevronPosition="left">
      {notes
        .filter(
          (note) =>
            note.title.toLowerCase().includes(query.trim().toLowerCase()) ||
            note.text.toLowerCase().includes(query.trim().toLowerCase())
        )
        .map((note, index) => (
          <Note key={index} note={note} remove={remove} />
        ))}
    </Accordion>
  );
}

export default Notes;

Notes.propTypes = {
  remove: PropTypes.func.isRequired,
  query: PropTypes.string,
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
};
