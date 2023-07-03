import GetContent from '@/helpers/contentful';
import React, { Component, useEffect, useState } from 'react';
import Poster from './Poster';






export function Ad(props: SceneProps){
    const [ads,setAds] =  useState([]);  

    async function getAds(){
        const ads =  await GetContent('ads');
        console.log(ads);
        setAds(() => (ads || []).map((entries) => entries.fields )   );
       
       }

    useEffect(() => {
        getAds();
    }, []);

    if(!ads.length) return (
        <div>
          <ul className='advertisement'></ul>
          <Poster url={'https://public.svsticky.nl/.hidden/Backup-Ad.png'}></Poster>
        </div>
      )

        const currentIndex  = 3; // was props.current
      if (currentIndex >= (ads.length - 1)) props.onFinish();
  
        let currentAd = ads[currentIndex];
        if (currentAd.fullscreen) {
          return (
            <div className='full-advertisement'>
              <Poster url={`https:${currentAd.poster.fields.file.url}`}></Poster>
            </div>
          );
        } else {
          return (
            <div>
              <ul className='advertisement'>
                <h1>{currentAd.title}</h1>
                <p>
                  {currentAd.description}
                </p>
              </ul>
              <Poster url={`https:${currentAd.poster.fields.file.url}`}></Poster>
            </div>
          );
        }
 
    }





