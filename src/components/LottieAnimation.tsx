import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

// splash screen animation
const LottieAnimation = ({ onComplete }) => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('/animations/lav[scap].json')
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error('Error loading animation:', error));
  }, []);

  if (!animationData) {
    return <div className='bg-red-500'></div>;
  }

  return (
    <Lottie
        animationData={animationData}
        loop={false}
        autoplay={true}
        style={{ 
          width: '100vmin', 
          height: '100vmin',
          minWidth: '100vw',
          minHeight: '100vh'
        }}
        className="object-cover bg-[#071417]"
        onComplete={() => {
            if (onComplete) {
                onComplete(true);
            }
        }}
    />
  );
};

export default LottieAnimation;
