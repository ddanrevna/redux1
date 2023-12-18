import React, { useEffect } from "react";
import { CiTrash, CiEdit } from "react-icons/ci";
import { NavLink, Navigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote, getNote } from "../redux/notes/actions";
import { selectNoteById, selectNotesLoading } from "../redux/notes/selectors";

export default function ViewNote() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const note = useSelector(selectNoteById(id));

  const loading = useSelector(selectNotesLoading);

  useEffect(() => {
    dispatch(getNote(id));
  }, [dispatch, id]);

  return (
    <div>
      {loading && <div>loading...</div>}
      {!note && !loading && <Navigate to="/404" />}
      {!!note && (
        <>
          <div className="flex  justify-between gap-5 items-center mt-10 mb-10 md:block md:text-center">
            <Button to="/notes" text="Back"></Button>
            <p className="text-4xl font-bold break-all mt-5 mb-5 md:text-xl">
              {note.title}
            </p>
            <div className=" flex gap-5 mt-3 mb-5  md:justify-center">
              <NavLink to={`/notes/edit/${id}`}>
                <CiEdit className=" w-7 h-7" />
              </NavLink>
              <div
                onClick={() => {
                  dispatch(deleteNote(id)).then(() => {
                    navigate("/notes");
                  });
                }}
              >
                <CiTrash className="w-7 h-7" />
              </div>
            </div>
          </div>
          <div className=" p-10 min-h-max max-h-max text-left bg-slate-200">
            <pre className=" h-auto break-words font-sans">{note.text}</pre>
          </div>
        </>
      )}
    </div>
  );
}
