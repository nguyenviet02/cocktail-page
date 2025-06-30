import gsap from 'gsap';
import { ScrollTrigger, SplitText } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger, SplitText);

import React from 'react';
import NavBar from './components/NavBar';
import Hero from './components/Hero';

const App = () => {
  return (
    <main>
      <NavBar />
      <Hero />
      <div className="h-dvh"></div>
    </main>
  );
};

export default App;
