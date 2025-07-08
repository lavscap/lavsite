import { useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const MathComponent = () => {
    const [score, setScore] = useState(0);
    const [num1, setNum1] = useState(getRandomInt(1, 10));
    const [num2, setNum2] = useState(getRandomInt(1, 10));
    const [attempts, setAttempts] = useState(0);
    const [triggerAnimation, setTriggerAnimation] = useState(false);
    const [wrongAnimation, setWrongAnimation] = useState(false);

    useGSAP(() => {
        let tl = gsap.timeline();
        tl.fromTo('.words', { opacity: 0 }, { opacity: 1, duration: 1, ease: 'power2.out' });
    });

    useGSAP(() => {
        if (triggerAnimation) {
            let tl = gsap.timeline();
            tl.fromTo('.nums', { scale: 1, opacity: 0 }, { scale: 1.05, opacity: 0.5, duration: 0.3, ease: 'power2.out' })
              .to('.nums', { scale: 1, opacity: 1, duration: 0.2, ease: 'power2.out' });
            setTriggerAnimation(false);
        } else if (wrongAnimation) {
            let tl = gsap.timeline();
            tl.fromTo('.nums', { x:-10}, { duration: 0.1, x:10, ease: 'power2.out' })
              .to('.nums', { duration: 0.1, x: 0, ease: 'power2.out' });
            setWrongAnimation(false);
        }
    }, [triggerAnimation, wrongAnimation]);
    
    useEffect(() => {
        setNum1(getRandomInt(1, 10));
        setNum2(getRandomInt(1, 10));
    }, [score]);

    function getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function checkAnswer(ans: string) {
        const answer = parseInt(ans);
        if (isNaN(answer)) {
            return;
        }
        setAttempts(attempts + 1);
        if (answer === num1 * num2) {
            setScore(score + 1);
            setTriggerAnimation(true);
            setNum1(getRandomInt(0, 20));
            setNum2(getRandomInt(0, 20));
        } else {
            setWrongAnimation(true);
        }

        return false;
    }

    return (
        <div className="bg-[#1f1f1f] flex flex-col text-4xl">
            <div className="words w-full h-screen flex flex-col items-center justify-center">
                <div className="score absolute top-10 left-10 text-stone-200 text-lg">{score}/{attempts}</div>
                <div className="nums m-16 text-stone-200">{num1} * {num2}</div>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    const answer = formData.get('answer') as string;
                    checkAnswer(answer);
                    (e.target as HTMLFormElement).reset();
                    return false;
                }}>
                    <input 
                        type="text"
                        name="answer"
                        className="border border-gray-300 rounded-lg p-2 mt-2 text-center font-sans focus:outline-none focus:ring-2 text-stone-200" 
                        placeholder=""
                        autoComplete="off"
                    />
                </form>
            </div>
        </div>
    )
}

export default MathComponent