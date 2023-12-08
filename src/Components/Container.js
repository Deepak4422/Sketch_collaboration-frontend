import React, { useState } from 'react';
import DrawingCanvas from './DrawingCanvas';
import './style2.css';

const Container = () => {
  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState("5");

  const changeColor = (event) => {
    setColor(event.target.value);
  }

  const changeSize = (event) => {
    setSize(event.target.value);
  }

  return (
    <div className="container">
      <div className="tools-section">
        <div className="color-picker-container">
          Select Brush Color : &nbsp;
          <input type="color" value={color} onChange={changeColor} />
        </div>

        <div className="brushsize-container">
          Select Brush Size : &nbsp;
          <select value={size} onChange={changeSize}>
            <option> 5 </option>
            <option> 10 </option>
            <option> 15 </option>
            <option> 20 </option>
            <option> 25 </option>
            <option> 30 </option>
          </select>
        </div>
      </div>

      <div className="board-container">
        <DrawingCanvas color={color} size={size}></DrawingCanvas>
      </div>
    </div>
  );
}

export default Container;