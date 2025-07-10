import { useState, useEffect } from 'react';
import LottieAnimation from './LottieAnimation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import logo from '../images/logo.png';
import HoverLink from './HoverLink';
import Birds from './Birds';

const Portfolio = () => {
  const [animationFinished, setAnimationFinished] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger, SplitText);
      const lenis = new Lenis();
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }
  }, []);
  
  const largeImageUrl = '/water_bw.jpg';

  useEffect(() => {
    const preloadImage = () => {
      const img = new Image();
      img.onload = () => {
        setImageLoaded(true);
      };
      img.onerror = () => {
        console.error('Failed to load background image');
        setImageLoaded(true);
      };
      img.src = largeImageUrl;
    };

    preloadImage();
  }, [largeImageUrl]);

  const showMainContent = animationFinished && imageLoaded;

  useGSAP(() =>{
    gsap.fromTo('#main-content', {
      opacity: 0,
      y: 50,
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out',
      delay: 0.5,
    });
    gsap.fromTo('#everything', {
      opacity: 0,
      y: 50,
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out',
      delay: 0.5,
    });

    gsap.fromTo('#outro h1', {
      y: 50,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      duration: 1,
      scrollTrigger: {
        trigger: '#outro',
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      }
    });

    gsap.utils.toArray<Element>('.card').forEach(card => {
      ScrollTrigger.create({
        trigger: card,
        start: 'center center',
        end: '+=150%',
        pin: true,
        pinSpacing: true // adds the space between sections necessary for pinning. neat!
      })
    });

  }, [showMainContent]);

  return (
    <>
      {!showMainContent && (
        <div className="min-h-screen bg-[#071417] flex flex-col items-center justify-center">
          <LottieAnimation onComplete={setAnimationFinished} />
        </div>
      )}
      {showMainContent && (
        <div className="bg-[#071417]">
          <div className="h-screen bg-[#071417] overflow-hidden" id="intro">
            <div id="everything" className="h-full flex flex-col">
              <nav className="flex items-center p-6 z-10 relative">
                  <img src={logo.src} alt="lav[scap] logo" className="h-12 w-auto"/>
                  <HoverLink 
                    src="#" 
                    className="ml-auto text-[#E9FAFF] hover:text-stone-500 transition-colors duration-300"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('outro')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Contact
                  </HoverLink>
              </nav>
  
              <div id="bg-image" className='absolute inset-0 w-full h-full overflow-hidden'>
                <img src={largeImageUrl} alt="Background image" className="absolute opacity-30 overflow-hidden" />
              </div>
            
              <div className="flex flex-col items-center justify-center z-1 relative mt-64">
                  <div id="main-content" className="p-8">
                      <h1 className="text-6xl text-[#E9FAFF] font-sans tracking-tighter"><span className='text-stone-500'>lav</span> designs and builds for the web.</h1>
                  </div>
              </div>
            </div>
          </div>
          
          <div className="card h-screen" id="playground1">
              <Birds></Birds>
          </div>

          <div className="h-screen bg-[#071417] overflow-hidden" id="outro">
            <div id="everything" className="h-full flex flex-col">
              <nav className="flex items-center p-6 z-10 relative">
                  <img src={logo.src} alt="lav[scap] logo" className="h-12 w-auto"/>
              </nav>
  
              <div id="bg-image" className='absolute inset-0 w-full h-full overflow-hidden'>
                <img src={largeImageUrl} alt="Background image" className="absolute opacity-30 overflow-hidden" />
              </div>
            
              <div className="flex flex-col items-center justify-center z-10 relative mt-16">
                  <div id="main-content" className="flex flex-col bg-blue-100/10 p-8 rounded-3xl border-2 border-stone-500 justify-center items-center m-50">
                      <div className="rounded-3xl bg-stone-500 h-20 w-20 justify-center items-center m-10"></div>
                      <h1 className='text-[#E9FAFF]'>lavisalive at gmail dot com</h1>
                  </div>
              </div>
            </div>
          </div>

        </div>
      )}
    </>
  );
};

export default Portfolio;
