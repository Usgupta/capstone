export default function LoadingLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <main className="z-50 bg-whitehue-600 w-screen h-screen flex items-center justify-center relative">
        {children}
      </main>
    )
  }
  