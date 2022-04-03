import './App.css';
import { Routes, Route } from "react-router-dom";
import General from './pages/General';
import Select from './pages/Select';
import DnD from './pages/DnD';



function App() {
  return (
    <Routes>
      <Route path="/" element={<General />} />
      {/* <Route path="/select" element={<Select />} />
      <Route path="/dnd" element={<DnD />} /> */}
    </Routes>
  );


}

export default App;