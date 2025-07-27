import React, { useEffect, useRef, useState } from 'react';

function Test(){
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

    // useEffect(() => {
    //     if (timeLeft <= 0) {
    //         return;
    //     }
    //     setTimeout(() => {
    //         setTimeLeft(timeLeft - 1);
    //     }, 1000)
    // }, [timeLeft]);

    // const intervalRef = useRef();
      
    // useEffect(() => {
    //     intervalRef.current = setInterval(() => {
    //         setTimeLeft((t) => t - 1);
    //       }, 1000);
    //       return () => clearInterval(intervalRef.current);
    // }, []);

    // useEffect(() => {
    //     if (timeLeft <= 0) {
    //       clearInterval(intervalRef.current);
    //     }
    //   }, [timeLeft]);
        
    

    return (
        <>
            <div>{timeLeft}</div>
            <div>
                <button onClick={() => startTimer(10)} children='10 second Timer' />
                <button onClick={() => startTimer()} children="Start Timer" />
                <button onClick={() => stopTimer()} children="Stop Timer" />
                <button onClick={() => clearTimer()} children="Clear Timer" />
                <button onClick={() => console.log(intervalRef)} children="Check Interval Ref" />
            </div>
        </>
    )
}

export default Test;