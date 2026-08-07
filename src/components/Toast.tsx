'use client';

import * as React from 'react';
import { toast, ToastBar, Toaster } from 'react-hot-toast';
import { HiX } from 'react-icons/hi';

export default function Toast() {
  return (
    <div>
      <Toaster
        reverseOrder={false}
        position='top-center'
        toastOptions={{
          style: {
            borderRadius: '5px',
            background: 'var(--secondary-background)',
            color: 'var(--foreground)',
            border: '2px solid var(--border)',
            boxShadow: 'var(--shadow)',
          },
        }}
      >
        {(t) => (
          <ToastBar toast={t}>
            {({ icon, message }) => (
              <>
                {icon}
                {message}
                {t.type !== 'loading' && (
                  <button
                    className='rounded-base p-1 border-2 border-transparent transition hover:border-border focus:outline-none focus-visible:ring-2 focus-visible:ring-ring'
                    onClick={() => toast.dismiss(t.id)}
                  >
                    <HiX />
                  </button>
                )}
              </>
            )}
          </ToastBar>
        )}
      </Toaster>
    </div>
  );
}
