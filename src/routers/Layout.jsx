import React, { useContext } from "react";
import { UserContext } from "../components/UserContextProvider";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/user/selectors";
import { logout } from "../redux/user/actions";

const NAV_LINK_CLASSNAME =
  "font-semibold text-3xl md:text-2xl decoration-none no-underline text-zinc-400";
export default function Layout() {
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout()).then(() => {
      navigate("/login");
    });
  };

  if (user) {
    return (
      <div className="w-3/4 mt-10 ml-auto mr-auto">
        <div className="flex justify-between items-center md:flex-col-reverse md:gap-5 md:mb-5">
          <p> Hello, {user.email}</p>
          <nav className="flex gap-5">
            <NavLink
              to="/"
              end={true}
              className={({ isActive }) =>
                isActive
                  ? `${NAV_LINK_CLASSNAME} text-black`
                  : `${NAV_LINK_CLASSNAME}`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/notes"
              className={({ isActive }) =>
                isActive
                  ? `${NAV_LINK_CLASSNAME}text-black`
                  : `${NAV_LINK_CLASSNAME}`
              }
            >
              Notes
            </NavLink>
            <NavLink
              to="/login"
              onClick={handleLogout}
              className={`${NAV_LINK_CLASSNAME}`}
            >
              Log Out
            </NavLink>
          </nav>
        </div>
        <Outlet />
        <hr className="mt-10" />
        <footer className="flex justify-between">
          <p className=" ml-3 text-zinc-400">Created by: Dasha Komisaruk</p>
          <p className=" mr-3 text-zinc-400">BSU: 2023</p>
        </footer>
      </div>
    );
  }

  return (
    <div>
      <Outlet />
      <hr className="mt-10" />
      <footer className="flex justify-between">
        <p className=" ml-3 text-zinc-400">Created by: Dasha Komisaruk</p>
        <p className=" mr-3 text-zinc-400">BSU: 2023</p>
      </footer>
    </div>
  );
}
