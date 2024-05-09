import { useEffect, useState } from 'react';

/** 
 * @description simple function to fetch data
 * @example  
 * const { data: members, isLoading } = useQuery(async () => fetch(...)) 
 * */
export function useQuery(func) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        func().then((data) => {
            setData(data);
            setLoading(false);
        })
    // Supress linter warning:
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { data, isLoading };
}