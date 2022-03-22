import { useRef, useState } from 'react';
import {
  exportComponentAsJPEG,
  exportComponentAsPNG,
} from 'react-component-export-image';
import { AiOutlineEdit } from 'react-icons/ai';
import { FaThemeco } from 'react-icons/fa';
import { motion } from 'framer-motion';

// import * as htmlToImage from 'html-to-image';
// import { createFileName } from 'use-react-screenshot';

import './App.css';
import Form from './Components/Form';
import Theme from './Components/Theme';
import Home from './Pages/Home';

function App() {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isOpenTheme, setIsOpenTheme] = useState(false);

  const homeRef = useRef(null);

  // const takeScreenShot = async (node) => {
  //   const dataURI = await htmlToImage.toJpeg(node);
  //   return dataURI;
  // };

  // const download = (image, { name = 'img', extension = 'jpg' } = {}) => {
  //   const a = document.createElement('a');
  //   a.href = image;
  //   a.download = createFileName(extension, name);
  //   a.click();
  // };

  // const downloadScreenshot = () =>
  //   takeScreenShot(homeRef.current).then(download);

  return (
    <div className="App ">
      <div className="hidden lg:block">
        <Home ref={homeRef} />

        {/* <div
          onClick={downloadScreenshot}
          className="test fixed top-[10%] right-5"
        >
          html download
        </div> */}

        {isOpenForm && <Form setIsOpenForm={setIsOpenForm} />}
        {isOpenTheme && <Theme setIsOpenTheme={setIsOpenTheme} />}

        <div className="fixed top-[24%] right-2 -translate-y-[24%] z-[10]">
          <div className="flex flex-col">
            <motion.button
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 2.5, duration: 1 }}
              onClick={() => setIsOpenForm(true)}
              className="my-1 bg-blue-500 text-white p-1 rounded-xl hover:bg-blue-800 flex items-center justify-center"
            >
              <AiOutlineEdit className="mr-1" />
              Edit
            </motion.button>

            <motion.button
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              onClick={() => setIsOpenTheme(true)}
              className="my-1 bg-violet-500 hover:bg-violet-800 text-white rounded-lg py-2 px-4 flex items-center"
            >
              <FaThemeco className="mr-1" />
              Choose Theme
            </motion.button>
          </div>
        </div>
        {/* Export as PNG or JPG  */}
        <div className="fixed top-1/2 right-2 -translate-y-1/2 z-[10]">
          <div className="flex flex-col">
            <motion.button
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 1.5 }}
              className="bg-lime-500 text-white rounded-xl p-2 my-1 font-bold hover:bg-lime-700"
              onClick={() => exportComponentAsJPEG(homeRef)}
            >
              Download As JPEG
            </motion.button>
            <motion.button
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 1.2 }}
              className="bg-lime-500 text-white rounded-xl p-2 my-1 font-bold hover:bg-lime-700"
              onClick={() => exportComponentAsPNG(homeRef)}
            >
              Download As PNG
            </motion.button>
          </div>
        </div>
      </div>
      <div className="block lg:hidden relative  bg-black text-white w-screen h-screen text-center">
        <h1 className="text-[34px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          Currently only supports screens larger than 1024
        </h1>
      </div>
    </div>
  );
}

export default App;
