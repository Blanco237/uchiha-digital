"use client";
import { AnimeType } from "@/animeList";
import { apiUrl } from "@/constants";
import { Button, TextField, Select, MenuItem } from "@mui/material";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import styles from './add.module.css'
import { useState } from "react";
import { postData } from "@/services/animeApi";

const statusData = ['Ongoing', 'Finished Airing']
const typeData = ['TV', 'TV Special', 'Movie', 'OVA']

export function AnimeCreateForm() {
  const router = useRouter();
  const [animeData, setAnimeData] = useState<AnimeType>({
    name: '',
    image: '',
    status: '',
    type: ''
  })
  const [loading, setLoading] = useState(false);

  const submitAnime = async () => {
    try {
      setLoading(true)
      await postData(animeData)
      router.push('/animes')
    } catch {
      alert('Someting went wrong')
    } finally {
    setLoading(false)
  }
}

  const isDisabled = () => {
    return !(animeData.name && animeData.image && animeData.status && animeData.type) || loading
  }

  return (
    <div className={styles.body}>
        <TextField label="Name" variant="outlined" sx={{width: '100%'}} value={animeData.name} onChange={(e) => setAnimeData((prev) => ({...prev, name: e.target.value}))} />
        <TextField label="Image" variant="outlined" sx={{width: '100%'}} value={animeData.image} onChange={(e) => setAnimeData((prev) => ({...prev, image: e.target.value}))} />
        <Select sx={{width: '100%'}} value={animeData.status} onChange={(e) => setAnimeData((prev) => ({...prev, status: e.target.value}))}>
            {
              statusData.map((val) => {
                return <MenuItem key={`status_${val}`} value={val}>{val}</MenuItem>
              })
            }
        </Select>
        <Select sx={{width: '100%'}} value={animeData.type} onChange={(e) => setAnimeData((prev) => ({...prev, type: e.target.value}))}>
            {
              typeData.map((val) => {
                return <MenuItem key={`type_${val}`} value={val}>{val}</MenuItem>
              })
            }
        </Select>
        <div className={styles.actions}>
            <Button variant="text" onClick={() => router.push(`/animes`)}>Back</Button>
              <Button variant="contained" disabled={isDisabled()} onClick={submitAnime}>{loading ? "Loading..." : "Submit"}</Button>
        </div>
    </div>
  );
}
