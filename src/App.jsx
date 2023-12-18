import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserContextProvider from "./components/UserContextProvider";
import HomePage from "./routers/HomePage";
import RequireAuth from "./components/RequireAuth";
import AllNotes from "./routers/AllNotes";
import Layout from "./routers/Layout";
import MakeNote from "./routers/MakeNote";
import ErrorPage from "./routers/ErrorPage";
import EditNote from "./routers/EditNote";
import Note from "./routers/Note";
import SignUp from "./routers/SignUp";
import Login from "./routers/Login";
import { Provider } from "react-redux";
import store, { persistor } from "./redux";
import { PersistGate } from "redux-persist/integration/react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <RequireAuth>
            <HomePage />
          </RequireAuth>
        ),
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/notes",
        element: <AllNotes />,
      },
      {
        path: "/notes/create",
        element: <MakeNote />,
      },
      {
        path: "/notes/edit/:id",
        element: <EditNote />,
      },
      {
        path: "/notes/view/:id",
        element: <Note />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<div>Loading...</div>}>
        <UserContextProvider>
          <RouterProvider router={router} />
        </UserContextProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
