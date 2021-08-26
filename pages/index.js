import { useState, useRef } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import Head from 'next/head';
import Image from 'next/image';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'; 

const App = () => {
  const [result, setResult] = useState("");
  const [text, setText] = useState("");
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
      x: e.pageX - e.target.offsetLeft,
      y: e.pageY - e.target.offsetTop
    };

    MySwal.fire({
      title: 'Clicked Coords',
      text: `x:${mousePos.x}, y:${mousePos.y}`
    });
  }

  const selectTool = (tool) => {
    const selected = document.querySelector(`.tools__${tool}`);
          selected.classList.add('active');

    const selectors = document.querySelector('.selectors');
          selectors.classList.remove('active');

    const header = document.querySelector('.mainHeader');
          header.classList.add('back');
  }

  const backButton = () => {
    const selected = document.querySelectorAll('.tools > div');

    for (const sel of selected) {
      sel.classList.remove('active');
    }

    const selectors = document.querySelector('.selectors');
          selectors.classList.add('active');

    const header = document.querySelector('.mainHeader');
          header.classList.remove('back');
  }

  const decodeText = () => {
    navigator.clipboard.writeText(encodeURI(text));
    alert('Text copied to clipboard');
  }

  return (
    <main className="app">
      <Head>
        <title>Image Coords</title>
      </Head >

      <div className="mainHeader">
        <FiArrowLeft size={24} onClick={() => backButton()} />
        <Image src="/logo.svg" width="107" height="25" className="logo" />
      </div>

      <div className="content">
        <div className="selectors active">
          <div className="selectors__encodeurl" onClick={() => selectTool("encodeurl")}>
            <span>Encode text to URL</span>
          </div>

          <div className="selectors__imagecoords" onClick={() => selectTool("imagecoords")}>
            <span>Get image coordinates</span>
          </div>
        </div>

        <div className="tools">
          <div className="tools__encodeurl">
            <input
              type="text" 
              placeholder="Insert text to encode here"
              onChange={e => setText(e.target.value)}
            />
            
            <button
              className="mainButton primary upper"
              onClick={() =>  decodeText()}
            >
              Encode Text
            </button>
          </div>

          <div className="tools__imagecoords">
            <input
              id="uploader"
              type="file"
              onChange={(e) => uploader(e)}
            />

            <button
              className="mainButton secondary upper"
              onClick={() => document.getElementById("uploader").click()}
            >
              Upload image
            </button>

            {result && <img ref={imageRef} src={result} onClick={e => getMousePos(e)} />}
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;