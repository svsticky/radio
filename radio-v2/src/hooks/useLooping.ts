import { useEffect, useState } from "react";

const NEXT_INTERVAL = parseInt(String(process.env.NEXT_PUBLIC_NEXT_INTERVAL));

export const useLooping = ({ maxCount}: { maxCount: number } ) => {
    const [count,setCount] = useState(0); 

    useEffect(() => {
        const timerId = setInterval(() => setCount((count) => count+ 1 % maxCount) , NEXT_INTERVAL);

        return () => clearInterval(timerId);
    }, []);
   
    return count;

}