'use client'

import { useRouter } from 'next/navigation';

export default function HomePage() {

  const router = useRouter();

  const redirectPage = () => {
    router.push('/detect');
  }

  return (
    <main className="dark:bg-coldHeights-900">
      <section className="h-screen w-4/5 mx-auto flex flex-col justify-center items-center">
        <h1 className="xl:text-8xl lg:text-7xl md:text-5xl sm:text-3xl text-xl text-center font-semibold py-20 dark:text-white">
          Welcome to Audio Deepfake Detection
        </h1>
        <button onClick={redirectPage} className="border-gray-400 bg-brightBlueViolet-300 dark:bg-brightBlueViolet-400 hover:bg-coldHeights-400 dark:hover:bg-coldHeights-300 rounded-xl xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl text-lg font-semibold py-4 xl:px-64 lg:px-32 md:px-16 sm:px-8 px-4">Get Started</button>
      </section>
      <section className="h-screen w-4/5 mx-auto flex flex-col justify-center items-center">
        <h1 className="xl:text-6xl lg:text-4xl md:text-3xl sm:text-xl text-lg text-center dark:text-white">
          We provide a
          <span className="bg-gradient-to-r from-purple-600 to-cyan-400 text-transparent bg-clip-text"> quick </span> 
          and
          <span className="bg-gradient-to-r from-purple-600 to-cyan-400 text-transparent bg-clip-text"> easy </span>
          way for you to detect deepfake audios.
        </h1>
      </section>
      <section className="h-screen w-4/5 mx-auto flex flex-col justify-center items-center">
        <h1 className="xl:text-4xl lg:text-2xl md:text-xl sm:text-lg text-sm text-center dark:text-white">
          We work with <span className="underline">Singapore HTX</span>
          , providing a range of models for you to choose from.
        </h1>
      </section>
    </main>
  )
}
