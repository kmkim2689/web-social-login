import { Route, Routes } from "react-router-dom";
import SocialLogin from "./components/SocialLogin";
import MainPage from "./components/MainPage";
import Registration from "./components/Registration";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}>
      </Route>
      <Route path="/login" element={<SocialLogin />}>
      </Route>
      <Route path="/signup"> element={<Registration />}
      </Route>
    </Routes>
  );
}

export default App;
