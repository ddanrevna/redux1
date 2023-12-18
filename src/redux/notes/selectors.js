export const selectNotes = (state) => state.notes.data;
export const selectNotesLoading = (state) => state.notes.loading;
export const selectNotesError = (state) => state.notes.error;
export const selectNoteById = (id) => (state) => {
  const notes = selectNotes(state);
  return notes.find((note) => note.id === Number(id));
};
