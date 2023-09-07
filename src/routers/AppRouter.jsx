import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Home,
  Error,
  ViewGameAll,
  ViewGameDetails,
  ViewStoreAll,
  ViewStoreDetails,
  ViewCreatorAll,
  Login,
  Register,
  Profile,
} from "../views/index";
import BaseLayout from "../layouts/BaseLayout";
import ProtectedRoute from "./ProtectedRoute";
import RootRedirect from "./RootRedirect";

const AppRouter = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const isLoggedIn = currentUser != null;

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BaseLayout />}>
          {/* <Route path="/" element={<RootRedirect isLoggedIn={isLoggedIn} />} /> */}
          <Route path="/" element={<Home/> } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/games" element={<ViewGameAll />} />
          {/* <Route
            path="/profile"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/games"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <ViewGameAll />
              </ProtectedRoute>
            }
          />
          <Route
            path="/games/:gameId"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <ViewGameDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/stores"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <ViewStoreAll />
              </ProtectedRoute>
            }
          />
          <Route
            path="/stores/:storeId"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <ViewStoreDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/creators"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <ViewCreatorAll />
              </ProtectedRoute>
            }
          /> */}
          <Route path="/error" element={<Error />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
