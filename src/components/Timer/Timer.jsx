import { useEffect, useRef, useState } from 'react';

function Timer(){
    const [timeLeft, setTimeLeft] = useState(0);
    const intervalRef = useRef();

    const startTimer = (time) => {
        if (time > 0) {
            return setTimeLeft(time);
        }
        if (!time && timeLeft <= 0) {
            return;
        }
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
        }
        intervalRef.current = setInterval(() => {
            setTimeLeft((timeLeft) => timeLeft - 1)
        }, 1000)
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }
    
    const stopTimer = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    }

    const clearTimer = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        setTimeLeft(0);
    }

    useEffect(() => {
        if (timeLeft <= 0) return stopTimer()
        intervalRef.current = setInterval(() => {
            setTimeLeft((t) => t - 1)
        }, 1000)
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [timeLeft])
    
    return { timeLeft, startTimer, stopTimer, clearTimer }
}

export default Timer;