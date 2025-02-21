import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Login = lazy(() => import("../pages/Login/Login"));

export default function AppRouter() {
  return (
    <Router>
      <Suspense fallback={<div>...loading</div>}>
        <Routes>
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
