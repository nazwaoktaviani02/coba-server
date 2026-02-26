let notes = [
  {
    id: 1,
    title: "first note",
    content: "My first note is here."
  }
];

const Note = {
  list() {
    return notes.map(({ id, title }) => ({
      id,
      title,
      content
    }));
  },

  get(id) {
    const note = notes.find(note => note.id === id);
    if (!note) {
      throw new Error("Note not found");
    }
    return note;
  },

  create(title, content) {
    const { id: lastId } = notes[notes.length - 1];
    const newNote = {
      id: lastId + 1,
      title,
      content
    };
    notes.push(newNote);
    return newNote;
  },

  update(id, title, content) {
    const index = notes.findIndex(note => note.id === id);
    if (index < 0) {
      throw new Error("Note not found for update");
    }

    notes[index].title = title;
    notes[index].content = content;

    return notes[index];
  },

  delete(id) {
    if (!notes.some(note => note.id === id)) {
      throw new Error("Note not found for delete");
    }

    notes = notes.filter(note => note.id !== id);
  }
};

export default Note;