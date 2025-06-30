import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import SplitText from 'gsap/SplitText';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useMediaQuery } from 'react-responsive';

const Hero = () => {
  const videoRef = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const heroSplit = new SplitText('.title', {
      type: 'chars, words ',
    });

    const paragraphSplit = new SplitText('.subtitle', {
      type: 'lines',
    });

    heroSplit?.chars?.forEach((char) => {
      char.classList.add('text-gradient');
    });

    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 1.8,
      ease: 'expo.out',
      stagger: 0.05,
    });

    gsap.from(paragraphSplit.lines, {
      yPercent: 100,
      opacity: 0,
      duration: 1.8,
      ease: 'expo.out',
      stagger: 0.05,
      delay: 1,
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
      .to('.right-leaf', { y: 200 }, 0)
      .to('.left-leaf', { y: -200 }, 0);

    const startValue = isMobile ? 'top 50%' : 'center 60%';
    const endValue = isMobile ? '120% top' : 'bottom top'; // This mean when the bottom of video is at the top of the screen, mean x2 screen height => 2 section with 100vh  will cover this video

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: 'video',
        start: startValue,
        end: endValue,
        scrub: true,
        pin: true,
      },
    });

    videoRef.current.onloadedmetadata = () => {
      tl.to(videoRef.current, {
        currentTime: videoRef.current.duration,
      });
    };
  }, []);

  return (
    <>
      <section id="hero" className="noisy">
        <h1 className="title"> MOJITO</h1>
        <img src="/images/hero-left-leaf.png" alt="" className="left-leaf" />
        <img src="/images/hero-right-leaf.png" alt="" className="right-leaf" />

        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>Cool, Crisp, Classic</p>
              <p className="subtitle">Sip the Spirit of Summer</p>
            </div>
            <div className="view-cocktails">
              <p className="subtitle">Every cocktail on our menu is a blend of premium ingredients, creative flair, and timeless recipes — designed to delight your senses.</p>
              <a href="#cocktails">View Cocktails</a>
            </div>
          </div>
        </div>
      </section>
      <div className="video absolute inset-0">
        <video ref={videoRef} src="/videos/output.mp4" muted playsInline preload="auto" />
      </div>
    </>
  );
};

export default Hero;
