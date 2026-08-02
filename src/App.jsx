import { Navigate, Route, Routes } from "react-router";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import PokemonList from "./pages/PokemonList";
import PokemonDetail from "./pages/PokemonDetail";
import NotFoundPage from "./pages/NotFoundPage";
import PrivateRoute from "./components/auth/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/pokemon" element={<PrivateRoute><PokemonList /></PrivateRoute>} />
        <Route path="/pokemon/:id" element={<PrivateRoute><PokemonDetail /></PrivateRoute>} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
