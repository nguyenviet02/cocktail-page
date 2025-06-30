import gsap from 'gsap';
import { ScrollTrigger, SplitText } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger, SplitText);

import React from 'react';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import Cocktails from './components/Cocktails';

const App = () => {
  return (
    <main>
      <NavBar />
      <Hero />
      <Cocktails />
    </main>
  );
};

export default App;
