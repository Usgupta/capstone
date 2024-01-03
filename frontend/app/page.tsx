export default function HomePage() {

  return (
    <main>
      <section className="h-screen w-4/5 mx-auto flex flex-col justify-center items-center">
        <h1 className="xl:text-9xl lg:text-7xl md:text-5xl sm:text-3xl text-center font-semibold py-20">
          Welcome to Audio Deepfake Detection
        </h1>
        <button className="bg-gray-200 hover:bg-gray-300 rounded-xl text-4xl font-semibold py-4 xl:px-64 lg:px-32 md:px-16 sm:px-8 transition-colors">Get Started</button>
      </section>
      <section className="h-screen w-4/5 mx-auto flex flex-col justify-center items-center">
        <h1 className="text-6xl text-center">
          We provide a
          <span className="bg-gradient-to-r from-purple-600 to-cyan-400 text-transparent bg-clip-text"> quick </span> 
          and
          <span className="bg-gradient-to-r from-purple-600 to-cyan-400 text-transparent bg-clip-text"> easy </span>
          way for you to detect deepfake audios.
        </h1>
      </section>
      <section className="h-screen w-4/5 mx-auto flex flex-col justify-center items-center">
        <h1 className="text-4xl text-center">
          We work with <span className="underline">Singapore HTX</span>
          , providing a range of models for you to choose from.
        </h1>
      </section>
    </main>
  )
}
