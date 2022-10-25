import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import { Routes, Route } from "react-router-dom";
import Edit from "./pages/Edit";
import Home from "./pages/Home";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import NotFound from "./pages/NotFound";

function App() {
  const [notes, setNotes] = useState([]);
  const [query, setQuery] = useState("");
  const [colorScheme, setColorScheme] = useState("light");
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useEffect(() => {
    const storedNotes = window.localStorage.getItem("notes", notes);
    const initNote = storedNotes ? JSON.parse(storedNotes) : [];
    setNotes(initNote);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const remove = (id) => {
    setNotes((notes) => notes.filter((note) => note.id !== id));
  };

  const add = () => {
    const note = {
      id: faker.datatype.uuid(),
      title: "New note title",
      text: "New note text",
    };

    setNotes((notes) => [...notes, note]);

    return note;
  };

  const edit = (id, title, text) => {
    setNotes((notes) =>
      notes.map((note) => {
        if (note.id !== id) {
          return note;
        } else {
          return { id, title, text };
        }
      })
    );
  };

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Routes>
          <Route
            path="/"
            element={
              <Home
                notes={notes}
                query={query}
                setQuery={setQuery}
                add={add}
                remove={remove}
              />
            }
          />
          <Route path="/edit" element={<Edit edit={edit} remove={remove} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
