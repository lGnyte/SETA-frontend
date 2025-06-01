import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/layout/Layout";
import Login from "./pages/User/Login.tsx";
import CenteredLayout from "./components/layout/CenteredLayout";
import Register from "./pages/User/Register.tsx";
import NotFound from "./pages/NotFound.tsx";
import BookOverview from "./pages/Book/BookOverview";
import NewBook from "./pages/Book/NewBook.tsx";
import MyBooks from "./pages/Book/MyBooks.tsx";
import Chapter from "./pages/Book/Chapter.tsx";
import BookChapterReaderPage from "./pages/Book/ReadChapter.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/book/:id" element={<BookOverview />} />
        <Route path="/book/create" element={<NewBook />} />
        <Route path="/book/user/:userId" element={<MyBooks />} />
        <Route path="/chapter" element={<Chapter />} /> {/* schimbi tu */}
        <Route path="/book/:id/chapter/:id/readChapter" element={<BookChapterReaderPage />} />
      </Route>
      <Route element={<CenteredLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
