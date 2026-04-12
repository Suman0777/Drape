import {motion, AnimatePresence} from 'framer-motion'
import { useSnapshot } from 'valtio'

import state from '../strore'

import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation
} from '../config/motion'

const Home = () => {
  const snap = useSnapshot(state)
  
  return (
    <div>
        <AnimatePresence>
          {
            snap.intro && (
              <motion.section className='home' {...slideAnimation('left')}>
                <motion.header {...slideAnimation("down")}>
                  <img 
                  src="./threejs.png" 
                  alt="Three.js" 
                  className='w-8 h-8 object-contain'
                  />
                </motion.header>
              </motion.section>
            )
          }
        </AnimatePresence>
    </div>
  )
}

export default Home