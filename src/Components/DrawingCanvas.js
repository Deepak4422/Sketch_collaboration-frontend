
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './style.css';

const Board = (props) => {
  const [timeoutId, setTimeoutId] = useState(undefined);
  const [isDrawing, setIsDrawing] = useState(false);
  const [ctx, setCtx] = useState(null);

  
  const [userID, setUserID] = useState("123"); 

  const socket = io.connect("http://localhost:5500", { transports: ['websocket'] });

  useEffect(() => {
    const handleCanvasData = (data) => {
      const interval = setInterval(() => {
        if (isDrawing) return;
        setIsDrawing(true);
        clearInterval(interval);
        const image = new Image();
        const canvas = document.querySelector('#board');
        const canvasContext = canvas.getContext('2d');
        image.onload = function () {
          canvasContext.drawImage(image, 0, 0);
          setIsDrawing(false);
        };
        image.src = data;
      }, 200);
    };

    socket.on("canvas-data", handleCanvasData);

    return () => {
      socket.off("canvas-data", handleCanvasData);
    };
  }, [isDrawing]);

  useEffect(() => {
    drawOnCanvas();
  }, []);

  useEffect(() => {
    if (ctx) {
      ctx.strokeStyle = props.color;
      ctx.lineWidth = props.size;
    }
  }, [props.color, props.size, ctx]);

  const drawOnCanvas = () => {
    const canvas = document.querySelector('#board');
    const canvasContext = canvas.getContext('2d');
    setCtx(canvasContext);

    const sketch = document.querySelector('#sketch');
    const sketchStyle = getComputedStyle(sketch);
    canvas.width = parseInt(sketchStyle.getPropertyValue('width'));
    canvas.height = parseInt(sketchStyle.getPropertyValue('height'));

    const mouse = { x: 0, y: 0 };
    const lastMouse = { x: 0, y: 0 };

    canvas.addEventListener('mousemove', (e) => {
      lastMouse.x = mouse.x;
      lastMouse.y = mouse.y;
      mouse.x = e.pageX - canvas.offsetLeft;
      mouse.y = e.pageY - canvas.offsetTop;
    }, false);

    canvas.addEventListener('mousedown', () => {
      canvas.addEventListener('mousemove', onPaint, false);
    }, false);

    canvas.addEventListener('mouseup', () => {
      canvas.removeEventListener('mousemove', onPaint, false);
    }, false);

    const onPaint = () => {
      canvasContext.beginPath();
      canvasContext.moveTo(lastMouse.x, lastMouse.y);
      canvasContext.lineTo(mouse.x, mouse.y);
      canvasContext.closePath();
      canvasContext.stroke();

      if (timeoutId !== undefined) clearTimeout(timeoutId);
      setTimeoutId(setTimeout(() => {
        // Send userID along with canvas data
        const dataToSend = {
          userID,
          base64ImageData: canvas.toDataURL("image/png"),
        };
        socket.emit("canvas-data", dataToSend);
      }, 1000));
    };
  };

  return (
    <div className="sketch" id="sketch">
      <canvas className="board" id="board"></canvas>
    </div>
  );
}

export default Board;
