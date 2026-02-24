'use client'

import { motion } from 'framer-motion'

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang='en'>
      <body className='min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-black flex items-center justify-center'>
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className='w-full max-w-md rounded-2xl bg-white/95 p-8 text-center shadow-2xl'
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className='mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600'
          >
            ⚠️
          </motion.div>

          {/* Title */}
          <h1 className='mb-2 text-2xl font-semibold text-neutral-900'>Something went wrong</h1>

          {/* Description */}
          <p className='mb-6 text-sm text-neutral-600'>
            An unexpected error occurred. Please try again or refresh the page.
          </p>

          {/* Action */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={reset}
            className='inline-flex items-center justify-center rounded-xl bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800'
          >
            Try again
          </motion.button>
        </motion.div>
      </body>
    </html>
  )
}
