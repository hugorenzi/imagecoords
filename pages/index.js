import { useState, useRef } from 'react';
import Head from 'next/head';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'; 

const App = () => {
  const [result, setResult] = useState("");
  const imageRef = useRef(null);
  const MySwal = withReactContent(Swal);

  const uploader = (e) => {
    const imageFile = e.target.files[0];

    const reader = new FileReader();
    reader.addEventListener("load", (e) => {
      setResult(e.target.result);
    });

    reader.readAsDataURL(imageFile);
  }

  const getMousePos = (e) => {
    const mousePos = {
      x: e.clientX - e.target.offsetLeft,
      y: e.clientY - e.target.offsetTop
    };

    MySwal.fire({
      title: 'Clicked Coords',
      text: `x:${mousePos.x}, y:${mousePos.y}`
    });
  }

  return (
    <main className="app">
      <Head>
        <title>Image Coords</title>
      </Head >

      <div className="content">
        <input
          id="uploader"
          type="file"
          onChange={(e) => uploader(e)}
        />

        <button
          className="mainButton primary upper"
          onClick={() => document.getElementById("uploader").click()}
        >
          Upload image
        </button>

        {result && <img ref={imageRef} src={result} onClick={e => getMousePos(e)} />}
      </div>
    </main>
  );
}

export default App;