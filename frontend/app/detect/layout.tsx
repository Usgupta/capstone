export default function DetectLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <main className='flex flex-col justify-center items-center min-h-screen dark:bg-coldHeights-900'>
        {children}
      </main>
    )
  }
  