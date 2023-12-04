import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ResultsPanel from './ResultsPanel.jsx';
import './styles/core/_globals.scss'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/:email",
    element: <ResultsPanel />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
