'use client' // Error boundaries must be Client Components

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    // global-error must include html and body tags
    <html
      lang='en'
      suppressHydrationWarning
    >
      <body
        className='min-h-screen bg-white text-gray-900 antialiased dark:bg-gray-950 dark:text-gray-100'
        style={{ colorScheme: 'light dark' }}
      >
        <a
          href='#main'
          className='absolute top-4 left-4 z-50 -translate-y-full rounded bg-gray-900 px-4 py-2 text-white transition-transform focus:translate-y-0 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:bg-gray-100 dark:text-gray-900'
        >
          Skip to content
        </a>
        <main
          id='main'
          className='flex min-h-screen scroll-mt-4 flex-col items-center justify-center gap-4 p-6'
        >
          <h1 className='text-xl font-semibold text-balance'>Something went wrong!</h1>
          <p className='text-center text-gray-600 dark:text-gray-400'>
            We couldn&apos;t load this page. Try again or refresh; if it keeps happening, check your connection.
          </p>
          <button
            type='button'
            onClick={() => reset()}
            className='rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 focus-visible:outline-none dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200'
          >
            Try Again
          </button>
        </main>
      </body>
    </html>
  )
}
