import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateLayout from "../layouts/PrivateLayout";

const Login = lazy(() => import("../pages/Login/Login"));
const Home = lazy(() => import("../pages/Home/Home"));

export default function AppRouter() {
  return (
    <Router>
      <Suspense fallback={<div>...loading</div>}>
        <Routes>
          <Route exact path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <PrivateLayout>
                <Home />{" "}
              </PrivateLayout>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
}
