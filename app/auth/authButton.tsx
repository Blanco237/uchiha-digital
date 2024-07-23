'use client';

import React from 'react'
import styles from './auth.module.css'

const AuthButton = () => {

    const launchAuth = () => {
        const encodedKey = encodeURIComponent(process.env.NEXT_PUBLIC_BIEBA_API_KEY!);
        console.log(process.env.NEXT_PUBLIC_BIEBA_AUTH_URL)
        const redirectUrl = new URL(process.env.NEXT_PUBLIC_BIEBA_AUTH_URL!);
        redirectUrl.searchParams.set("ks", encodedKey);
    
        window.location.href = redirectUrl.toString();
      };
    
  return (
    <button className={styles.btn} onClick={launchAuth}>
    Sign in with Bieba
  </button>
  )
}

export default AuthButton