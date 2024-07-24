'use client';

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const Callback = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    
    useEffect(() => {
        const userCode = decodeURIComponent(searchParams.get('code')!)
        const fetchUser = async () => {
            const user = await fetch(process.env.NEXT_PUBLIC_BIEBA_BE_URL!, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({code: userCode}),
            }).then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            console.log(user);

            localStorage.setItem('user', JSON.stringify(user))
            router.push('/animes')
        }
        
        fetchUser()
    }, [])

  return (
    <div className='min-h-screen flex flex-col items-center justify-center gap-2'>
        Authentication Successful.
        Redirecting to Dashboard...
    </div>
  )
}

export default Callback