import React, { useEffect } from "react";
import { CiTrash, CiEdit } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/user/selectors";
import { deleteNote, getAuthorNotes } from "../redux/notes/actions";

export default function Notes() {
  const user = useSelector(selectUser);

  const { loading, data } = useSelector((store) => store.notes);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAuthorNotes(user.id));
  }, []);

  return (
    <div>
      <p className="text-4xl font-bold mb-5 text-center">Notes</p>
      <Button to="/notes/create" text="Add new note" />
      {loading && <div>loading...</div>}
      {!data?.length && !loading && <div>There are no notes yet</div>}
      {!!data?.length &&
        data
          .sort((a, b) => b.createdAt - a.createdAt)
          .map((note) => (
            <div
              key={note.id}
              className=" flex justify-between	p-7 text-left mt-3 items-center md:block md:relative md:pb-12 bg-slate-200"
            >
              <div className="flex items-center break-all">
                <NavLink key={note.id} to={`/notes/view/${note.id}`}>
                  <p className="h-auto max-w-3xl">
                    <b>{note.title}</b>
                  </p>
                </NavLink>
              </div>
              <div className="flex ml-5 gap-3 md:absolute right-1 mt-3">
                <p className="h-auto  font-thin">
                  {new Date(note.createdAt).toLocaleDateString()}
                </p>
                <object>
                  <NavLink to={`/notes/edit/${note.id}`}>
                    <CiEdit className="w-7 h-7" />
                  </NavLink>
                </object>
                <object>
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      dispatch(deleteNote(note.id));
                    }}
                  >
                    <CiTrash className="w-7 h-7" />
                  </div>
                </object>
              </div>
            </div>
          ))}
    </div>
  );
}
