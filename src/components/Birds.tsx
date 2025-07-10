import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Birds = () => {
    useGSAP(() => {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#playground1',
                start: 'center center',
                end: '+=100%',
                scrub: 1,
                toggleActions: 'play none none reverse',
            }
        });

        tl.fromTo('.bird-1', {
            x: 100,
            opacity: 0,
        }, {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
        })
        .fromTo('.bird-2', {
            x: -100,
            opacity: 0,
        }, {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
        }, '0');

        gsap.fromTo('.t-1', {
            y: 0,
            x: 0,
            color: '#303030',
        }, {
            x: 50,
            y: -50,
            color: '#FFFFFF',
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '#playground1',
                start: 'center center',
                end: '+=50%',
                scrub: 1,
            }
        });

        gsap.fromTo('.t-2', {
            y: 0,
            x: 0,
            color: '#303030',
        }, {
            y: 100,
            x: -80,
            color: '#FFFFFF',
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '#playground1',
                start: 'center center',
                end: '+=50%',
                scrub: 1,
            }
        });

        gsap.fromTo('.t-3', {
            y: 0,
            color: '#303030',
        }, {
            y: -50,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '#playground1',
                start: 'center center',
                end: '+=50%',
                scrub: 1,
            }
        });
    });

    return (
        <div className="bg-[#D8E3E9] w-full h-screen flex items-center justify-center relative font-sans">
            <div className="birds absolute inset-0 flex items-center justify-center">
                <img src="/birds/bird1.jpg" alt="Bird1" className="bird-1 w-1/2 md:w-1/4 h-3/4 object-cover opacity-0"/>
                <img src="/birds/bird2.jpg" alt="Bird2" className="bird-2 w-1/2 md:w-1/4 h-3/4 object-cover opacity-0"/>
            </div>
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#FFFFFF] opacity-30 transform"></div>
            <span className="t-1 text-8xl font-bold text-[#303030] z-10">LA</span>
            <span className="t-2 text-8xl font-bold text-[#303030] z-10">V[S</span>
            <span className="t-3 text-8xl font-bold text-[#303030] z-10">CAP]</span>
            <span className="t-bot absolute bottom-10 backdrop-blur-lg">PROGRAMMER</span>
        </div>
    )
}

export default Birds