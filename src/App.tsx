import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Movies } from "./pages/Movies";
import { MovieDetails } from "./pages/MovieDetails";

function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/movies" Component={Movies} />
          <Route path="/movie/:id" Component={MovieDetails} />
          <Route path="*" Component={() => <>404 | Not Found</>} />
          <Route path="/" Component={Movies} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
