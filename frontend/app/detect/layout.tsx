export default function DetectLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <main className='flex flex-col justify-center items-center h-screen mx-auto dark:bg-coldHeights-900'>
        {children}
      </main>
    )
  }
  