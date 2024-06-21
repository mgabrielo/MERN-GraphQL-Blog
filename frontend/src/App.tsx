import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/home/Footer";
import Homepage from "./components/home/Homepage";
import Blogs from "./components/blogs/Blogs";
import Auth from "./components/auth/Auth";
import Addblog from "./components/blogs/Addblog";
import Profile from "./components/header/user/Profile";
import ViewBlog from "./components/blogs/ViewBlog";
import { Toaster } from "react-hot-toast";
import UpdateBlog from "./components/blogs/UpdateBlog";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <div className="wrapper">
      <header>
        <Toaster />
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Homepage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/blogs" element={<Blogs />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/add" element={<Addblog />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/blog/view/:id" element={<ViewBlog />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/blog/update/:id" element={<UpdateBlog />} />
          </Route>
          <Route path={"*"} element={<Navigate to={"/auth"} />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
