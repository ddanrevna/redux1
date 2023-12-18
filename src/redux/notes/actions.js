import API from "../../utils/API";
import { selectNotes } from "./selectors";

export const getAuthorNotes = (userId) => async (dispatch) => {
  dispatch({ type: "NOTES/LOADING" });
  try {
    const data = await API.getNotes(userId);
    dispatch({ type: "NOTES/LOADING/SUCCESS", payload: data });
  } catch (e) {
    dispatch({ type: "NOTES/LOADING/ERROR", payload: e.message });
  }
};

export const getNote = (noteId) => async (dispatch, getState) => {
  dispatch({ type: "NOTES/LOADING" });
  try {
    const data = await API.getNote(noteId);

    const currentNotes = selectNotes(getState());

    const existing = currentNotes.find((note) => note.id == noteId);

    const updatedNotes = existing
      ? currentNotes.map((note) => (note.id == noteId ? data : note))
      : [...currentNotes, data];

    dispatch({ type: "NOTES/LOADING/SUCCESS", payload: updatedNotes });
  } catch (e) {
    dispatch({ type: "NOTES/LOADING/ERROR", payload: e.message });
  }
};

export const createNote =
  (userId, title, text) => async (dispatch, getState) => {
    dispatch({ type: "NOTES/LOADING" });
    try {
      const data = await API.createNote({
        userId,
        title,
        text,
      });

      const currentNotes = selectNotes(getState());

      const updatedNotes = [...currentNotes, data];

      dispatch({ type: "NOTES/LOADING/SUCCESS", payload: updatedNotes });
    } catch (e) {
      dispatch({ type: "NOTES/LOADING/ERROR", payload: e.message });
    }
  };

export const deleteNote = (noteId) => async (dispatch, getState) => {
  dispatch({ type: "NOTES/LOADING" });
  try {
    await API.deleteNote(noteId);

    const currentNotes = selectNotes(getState());

    const updatedNotes = currentNotes.filter((note) => note.id !== noteId);

    dispatch({ type: "NOTES/LOADING/SUCCESS", payload: updatedNotes });
  } catch (e) {
    dispatch({ type: "NOTES/LOADING/ERROR", payload: e.message });
  }
};

export const editNote = (noteId, title, text) => async (dispatch, getState) => {
  dispatch({ type: "NOTES/LOADING" });
  try {
    const data = await API.editNote(noteId, title, text);

    const currentNotes = selectNotes(getState());

    const updatedNotes = currentNotes.map((note) =>
      note.id === noteId ? data : note
    );

    dispatch({ type: "NOTES/LOADING/SUCCESS", payload: updatedNotes });
  } catch (e) {
    dispatch({ type: "NOTES/LOADING/ERROR", payload: e.message });
  }
};
