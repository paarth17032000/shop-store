'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='font-medium'>
        This route is currently not present.
        <div
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
          className='bg-black/90 text-white rounded-[10px] text-center px-3 py-2 mt-2 cursor-pointer text-[16px] font-montserrat font-bold'
        >
          Try Again
        </div>
      </div>
    </div>
  );
}
