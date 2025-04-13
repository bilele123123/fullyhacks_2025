'use client';

import { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import FloatingUfo from './components/FloatingUfo';
import QuizRenderer from './components/QuizRenderer';
import { Meteors } from './components/ui/meteors';
import ScrollToTopRocket from './components/ScrollToTopRocket';
import FlashcardRenderer from './components/FlashcardRenderer';
import Loader from "./components/Loader"

export default function Home({}) {
  return (
    <div className="relative h-fit overflow-hidden">
      <Loader />
      <div className='flex justify-center items-center flex-col bg-gray-900 px-4 py-8 shadow-xl h-max'>
        <Meteors />
        <FloatingUfo />
        <NavBar />
        <ScrollToTopRocket />
        <div className="flex justify-center w-full items-center h-[795px]">
          <Hero />
        </div>
        <QuizRenderer />
        <FlashcardRenderer />
      </div>
      <div className='h-48  border-gray-800 bg-gray-900 px-4 py-8 shadow-xl'></div>
        <Footer />

    </div>
  );
}
