import { AnimeType } from '@/animeList'
import React from 'react'
import styles from './card.module.css'
import Image from 'next/image'
import { Typography } from '@mui/material'


const AnimeCard:React.FC<AnimeType> = ({ name, image, status, type }) => {
  return (
    <div className={styles.body}>
        <Image width={100} height={100} className={styles.image} src={image} alt={name} />
        <div className={styles.content} >
            <Typography variant='h4' className={styles.title}>{name}</Typography>
            <div className={styles.infos}>
                <span className={styles.status}>{status}</span>
                <span className={styles.type}>{type}</span>
            </div>
        </div>
    </div>
  )
}

export default AnimeCard