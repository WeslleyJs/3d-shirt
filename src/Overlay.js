import {
  AiOutlineHighlight,
  AiOutlineShopping,
  AiFillCamera,
  AiOutlineArrowLeft
} from 'react-icons/ai'
import { useState } from 'react'
import { useSnapshot } from 'valtio'
import Drop from './components/Drop'
import { state } from './store'
import { motion, AnimatePresence } from 'framer-motion'

import './index.css'



export default function Overlay() {
  const snap = useSnapshot(state)
  const [dataFromChild, setDataFromChild] = useState('');
  function imgChildren(data)  {
    console.log(data)
    setDataFromChild(data);
    state.decals.push(data);
    console.log('tipo', typeof data);
  }

  const transition = { type: 'spring', duration: 0.8 }

  const config = {
    initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0.5 } },
    animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
    exit: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } }
  }



  return (
    <div className="container">
      <motion.header
        initial={{ opacity: 0, y: -120 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', duration: 1.8, delay: 1 }}>
        {/* <Logo width="40" height="40" />
        <div>
          <AiOutlineShopping size="3em" />
        </div> */}
        {/* <input type="file" /> */}

      </motion.header>
        

      <AnimatePresence>
        {snap.intro ? (
          <Intro key="main" config={config} />
        ) : (
          <Customizer key="custom" config={config} img={imgChildren}/>
        )}
      </AnimatePresence>
    </div>
  )
}

function Intro({ config }) {
  return (
    <motion.section {...config}>
      <div className="section--container">
        <div className='top'>
          <h1>LET'S DO IT.</h1>
        </div>
        <div className="support--content">
          <div>
            <p>
              Create your unique and exclusive shirt with our brand-new 3D
              customization tool. <strong>Unleash your imagination</strong> and
              define your own style.
            </p>
            <button
              style={{ background: 'black' }}
              onClick={() => (state.intro = false)}>
              CUSTOMIZE IT <AiOutlineHighlight size="1.3em" />
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

function Customizer({ config, img }) {
  const snap = useSnapshot(state)
  const [dataFromChild, setDataFromChild] = useState('');
  function imageChildren(data)  {
    console.log(data)
    setDataFromChild(data);
    img(data);
  }
  return (
    
    <motion.section {...config}>
      <div className="customizer">
        <div className="color-options">
          {snap.colors.map((color) => (
            <div
              key={color}
              className="circle"
              style={{ background: color }}
              onClick={() => (state.selectedColor = color)}></div>
          ))}
        </div>
        <div className="decals">
          <div className="decals--container">
            {snap.decals.map((decal, index) => (
              <div
                key={decal}
                className="decal"
                onClick={() => (state.selectedDecal = decal)}>
                <span>{index + 1}</span>
              </div>
            ))}
          </div>
        </div>     
        <button
          className="share"
          style={{ background: snap.selectedColor }}
          onClick={() => {
            const link = document.createElement('a')
            link.setAttribute('download', 'canvas.png')
            link.setAttribute(
              'href',
              document
                .querySelector('canvas')
                .toDataURL('image/png')
                .replace('image/png', 'image/octet-stream')
            )
            link.click()
          }}>
          DOWNLOAD
          <AiFillCamera size="1.3em" />
        </button>

        <button
        style={{ background: snap.selectedColor }}
        className="upload">
          <Drop  />
          {/* imagem={ imageChildren } */}
        </button>
        <button
          className="exit"
          style={{ background: snap.selectedColor }}
          onClick={() => (state.intro = true)}>
          GO BACK
          <AiOutlineArrowLeft size="1.3em" />
        </button>
      </div>
    </motion.section>
  )
}
