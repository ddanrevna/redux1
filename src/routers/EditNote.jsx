import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TextArea from "../components/TextArea";
import Button from "../components/Button";
import Input from "../components/Input";
import { Note } from "../utils/note-validation";
import { useDispatch, useSelector } from "react-redux";
import { selectNoteById, selectNotesLoading } from "../redux/notes/selectors";
import { editNote, getNote } from "../redux/notes/actions";

export default function EditNote() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const note = useSelector(selectNoteById(id));

  const loading = useSelector(selectNotesLoading);

  useEffect(() => {
    dispatch(getNote(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setText(note.text);
    }
  }, [note]);

  const handleEdit = () => {
    const note = { title, text };

    const validationResult = Note.safeParse(note);

    if (!validationResult.success) {
      setErrors(user.error.format());
      return;
    }

    setErrors(null);

    dispatch(editNote(id, title, text)).then(() => {
      navigate("/notes/view/" + id);
    });
  };

  return (
    <div>
      {loading && <div>loading...</div>}
      {!note && !loading && <div>There is no note with this id</div>}

      <div className=" flex justify-between gap-5 items-center mt-10 mb-10">
        <Button to="/notes" text="Back" />
        <p className="text-4xl font-bold mt-5 mb-5 md:text-2xl">Edit note</p>
      </div>
      <Input
        type={"text"}
        placeholder={"title"}
        onDataChange={setTitle}
        value={title}
      />
      {errors?.title?._errors && (
        <div className="text-red-400 text-center">
          {errors?.title?._errors[0]}
        </div>
      )}
      <TextArea onDataChange={setText} placeholder={"Enter "} value={text} />
      {errors?.text?._errors && (
        <div className="text-red-400 text-center">
          {errors?.text?._errors[0]}
        </div>
      )}
      <Button text="Save" handleOnClick={handleEdit} />
    </div>
  );
}
