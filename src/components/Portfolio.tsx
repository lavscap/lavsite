import { useState, useEffect } from 'react';
import LottieAnimation from './LottieAnimation';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import logo from '../images/logo.png';

const Portfolio = () => {
  const [animationFinished, setAnimationFinished] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
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
  }, [showMainContent]);

  return (
    <>
      {!showMainContent && (
        <div className="min-h-screen bg-[#071417] flex flex-col items-center justify-center">
          <LottieAnimation onComplete={setAnimationFinished} />
        </div>
      )}
      {showMainContent && (
        <div className="h-screen bg-[#071417] overflow-hidden">
          <div id="everything" className="h-full flex flex-col">
            <nav className="flex items-center p-6 z-10 relative">
                <img src={logo.src} alt="lav[scap] logo" className="h-12 w-auto"/>
            </nav>
 
            <div id="bg-image" className='absolute inset-0 w-full h-full overflow-hidden'>
              <img src={largeImageUrl} alt="Background image" className="absolute opacity-30 overflow-hidden" />
            </div>
           
            <div className="flex flex-col items-center justify-center z-10 relative mt-16">
                <div id="main-content" className="bg-blue-100/10 p-8 rounded-3xl border-2 border-stone-500">
                    <div className="rounded-3xl bg-stone-500 h-20 w-20 my-10"></div>
                    <h1 className="text-4xl text-[#E9FAFF] font-sans"><span className='text-stone-500'>lav</span> designs and builds for the web.</h1>
                </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Portfolio;
