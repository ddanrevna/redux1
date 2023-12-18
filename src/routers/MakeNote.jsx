import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/API";
import TextArea from "../components/TextArea";
import Button from "../components/Button";
import Input from "../components/Input";
import { Note } from "../utils/note-validation";

function NewNote() {
  const [title, setTitle] = useState("");
  const [noteText, setNoteText] = useState("");
  const id = parseInt(localStorage.getItem("userId"));
  const navigate = useNavigate();

  const [errors, setErrors] = useState(null);

  const handleCreateNote = () => {
    const note = { title, text: noteText };

    const validationResult = Note.safeParse(note);

    if (!validationResult.success) {
      setErrors(user.error.format());
      return;
    }

    setErrors(null);

    API.createNote(id, title, noteText).then(() => {
      title ? navigate("/notes") : navigate("");
    });
  };

  return (
    <div>
      <div className="flex justify-between gap-5 items-center mt-10 mb-10">
        <Button to="/notes" text="Back" />
        <p className="text-4xl md:text-2xl font-bold mt-5 mb-5">
          Create new note
        </p>
      </div>
      <Input
        type="text"
        placeholder="Note name"
        onDataChange={(value) => {
          setTitle(value);
        }}
        required={true}
      />
      {errors?.title?._errors && (
        <div className="text-red-400 text-center">
          {errors?.title?._errors[0]}
        </div>
      )}
      <TextArea onDataChange={setNoteText} placeholder="Note text... " />
      {errors?.text?._errors && (
        <div className="text-red-400 text-center">
          {errors?.text?._errors[0]}
        </div>
      )}
      <Button text="Create" handleOnClick={handleCreateNote} />
    </div>
  );
}

export default NewNote;
