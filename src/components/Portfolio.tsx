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
              <img src={largeImageUrl} alt="Background image" className="absolute opacity-10 overflow-hidden" />
            </div>
           
            <div className="flex-1 flex flex-col items-center justify-center z-10 relative">
                <div id="main-content" className="bg-blue-200/20 backdrop-blur-xs p-8 rounded-lg">
                    <div className="rounded-3xl bg-red-500 h-20 w-20"></div>
                    <h1 className="text-4xl text-white font-bold">lav designs and builds for the web.</h1>
                    <p className="mt-4 text-lg text-gray-300">Welcome to my portfolio!</p>
                </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Portfolio;
