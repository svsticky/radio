import { useEffect, useState } from 'react';
import { Activity } from './Activity';
import Poster from './Poster';
import { getActivities } from '@/helpers/koala';
import { useLooping } from '@/hooks/useLooping';
import { useQuery } from 'react-query';

interface ActivitiesProps {
    onFinish: () => void
}

export function Activities(props: ActivitiesProps) {

    const currentIndex = useLooping({ maxCount: 20 });

    const currentActivity = activities[currentIndex];

    const { isLoading, data: activities } =  useQuery("koala-activities", async () => {
        console.log("FETCHING Activities");
        return await getActivities();
    
    }); 
    // }, { refetchInterval: process.env.LOAD_INTERVAL })

  

 


    if (currentIndex >= (activities.length - 1) && props.onFinish) props.onFinish();
    if (!activities.length) return <div> Geen activiteiten gevonden  </div>;

    return (
        <div>
            <ul className='activities'>
                {activities?.map((activity, i) => {
                    return <Activity
                        key={i}
                        {...activity}
                        active={activity === currentActivity}
                    />
                })}
            </ul>
            <Poster url={currentActivity ? currentActivity.poster : null} />
        </div>
    );
}


