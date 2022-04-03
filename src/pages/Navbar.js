import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navigations">
      <div>
        <Link to="/select">Выборка</Link>
      </div>
      <div>
        <Link to="/dnd">DragAndDrop</Link>
      </div>
    </div>
  )
}

export default Navbar