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

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/home" element={<Home />} />
          <Route path="/error" element={<Error />} />
          <Route path="/games" element={<ViewGameAll />} />
          <Route path="/games/:gameId" element={<ViewGameDetails />} />
          <Route path="/stores" element={<ViewStoreAll />} />
          <Route path="/stores/:storeId" element={<ViewStoreDetails />} />
          <Route path="/creators" element={<ViewCreatorAll />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
