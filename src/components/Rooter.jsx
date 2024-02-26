import HomePage from "../pages/Homepage";
import Search from "../pages/Book/Search";
import SearchAuthor from "../pages/Author/Search";
import {
  Routes,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

export default () =>
  createBrowserRouter(
    createRoutesFromElements(
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="Search" element={<Search />} />
        <Route path="book/:name" element/>
        <Route path="Author" element={<SearchAuthor />} />
      </Routes>
    )
  );
