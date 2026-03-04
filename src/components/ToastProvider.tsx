'use client'

import { Toaster } from 'sonner'

export function ToastProvider() {
    return (
        <Toaster
            position="top-right"
            toastOptions={{
                style: {
                    background: '#1F1F1F',
                    border: '1px border-white/10',
                    color: 'white',
                },
            }}
        />
    )
}
