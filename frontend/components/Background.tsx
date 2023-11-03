'use client';

import Link from "next/link";
import React, { useEffect } from 'react'
import { CSSProperties } from 'react';
import * as Blob from "../components/Blob";
import { Canvas } from "@react-three/fiber";


export default function Background() {

    const backgroundStyle: CSSProperties= {
        position: 'absolute',
        // background: 'radial-gradient(circle at 20% 50%, #CE65FD 20%, transparent 25%), radial-gradient(circle at 35% 62%, #00B5A2 18%, transparent 20%), radial-gradient(circle at 45% 72%, #3F5E7B 26%, transparent 28%),  radial-gradient(circle at center, #FFFFFF, #FFFFFF)',
        // background: '#083D59',
        // background: '#6F328B',
        background: '#FFFFFF',
        // background: '',
        left: 0,
        width: '100%',
        height: '100%',
        color: 'white',
        textAlign: 'center',
        padding: '0px',
        fontSize: '24px',
        zIndex: -1,
      };
    
    
    
    return (
      <div style={backgroundStyle}>
        <Canvas camera={{ position: [0.0, 0.0, 8.0] }}>
          <Blob.Blob />
          <Blob.Blob2/>
          <Blob.Blob3/>
          <Blob.Blob4/>
        </Canvas>
      </div>
  )
}

