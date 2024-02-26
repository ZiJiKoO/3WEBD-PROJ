import "./App.css";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import HomePage from "./pages/Homepage";
import Root from "./pages/Root";
import Search from "./pages/Book/Search.jsx";
import SearchAuthor from "./pages/Author/Search.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Root />}>
      <Route path="/" element={<HomePage />} />
      <Route path="Search" element={<Search/>}/>
      <Route path="Author" element={<SearchAuthor />} />
    </Route>
  )
);

const App = () => <RouterProvider router={router} />;

export default App;
