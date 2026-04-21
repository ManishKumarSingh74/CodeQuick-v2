import { Navigate, Route, Routes } from "react-router-dom"
import Register from "./pages/Signup"
import Login from "./pages/Login"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { checkAuth } from "./authSlice"
import Signup from "./pages/Signup"
import Homepage from "./Homepage"
import Admin from "./pages/Admin"
import ProblemPage from "./pages/ProblemPage"
import AdminPanel from "./components/AdminPanel"
import LandingPage from "./pages/LandingPage"
import AdminDelete from "./components/AdminDelete"
import AdminUpdate from "./components/AdminUpdate"
import UpdateProblem from "./components/UpdateProblem"
function App() {

  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/homepage" element={isAuthenticated ? <Homepage /> : <Navigate to="/signup" />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/homepage" /> : <Signup />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/homepage" /> : <Login />} />
        <Route path="/adminpanel" element={isAuthenticated && user?.role == "admin" ? <Admin /> : <Navigate to="/homepage" />} />
        <Route path="/admin/create" element={isAuthenticated && user?.role == "admin" ? <AdminPanel /> : <Navigate to="/homepage" />} />
        <Route path="/admin/delete" element={isAuthenticated && user?.role == "admin" ? <AdminDelete /> : <Navigate to="/homepage" />} />
        <Route path="/admin/update" element={isAuthenticated && user?.role == "admin" ? <AdminUpdate /> : <Navigate to="/homepage" />} />
        <Route path="/adminupdate/:problemId" element={isAuthenticated && user?.role == "admin" ? <UpdateProblem /> : <Navigate to="/homepage" />} />
        <Route path="/problem/:problemId" element={<ProblemPage />}></Route>
      </Routes>
    </>
  )
}

export default App
