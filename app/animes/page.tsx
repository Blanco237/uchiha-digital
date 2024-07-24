"use client";
import { useDeferredValue, useEffect, useState } from "react";
import { AnimeType, animeList } from "@/animeList";
import { Button, Input, Stack } from "@mui/material";
import { getData } from "@/services/animeApi";
import styles from "./animes.module.css";
import AnimeCard from "@/components/AnimeCard";
import { useRouter } from "next/navigation";

export default function Page() {
  const [animes, setAnimes] = useState<Array<AnimeType>>([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<typeof animes>([]);
  const router = useRouter();
  const defferedSearch = useDeferredValue(search);
  const [user, setUser] = useState<any>(null);


  useEffect(() => {
    if(typeof window !== 'undefined') {
      const _usr = localStorage.getItem('user');
      const _user = JSON.parse(_usr || '');
      if(!_user) {
        router.push('/');
        return;
      }
      setUser(_user);
    }
  }, [])

  useEffect(() => {
    const fetchAnimes = async () => {
      try {
        const data = await getData();
        setAnimes(data);
      } catch {}
    };
    fetchAnimes();
  }, []);

  useEffect(() => {
    if (defferedSearch) {
      const word = defferedSearch.toLowerCase();
      const filteredAnimes = animes.filter((anime) => {
        if (anime.name.toLowerCase().includes(word)) {
          return true;
        }
        if (anime.status.toLowerCase().includes(word)) {
          return true;
        }
        if (anime.type.toLowerCase().includes(word)) {
          return true;
        }

        return false;
      });
      setFiltered(filteredAnimes);
    } else {
      setFiltered(animes);
    }
  }, [animes, defferedSearch]);

  return (
    <div className={styles.body}>
      <header className="flex w-full justify-between items-center mb-8">
        <h4>Hello, <span className="text-blue-700 font-medium">{user?.email}</span></h4>
        <Button
          type="button"
          variant="outlined"
          sx={{color: 'red', borderColor: 'red'}}
          onClick={() => {
            localStorage.removeItem('user');
            router.push('/')
          }}
        >
          Logout
        </Button>
      </header>
      <section className={styles.actions}>
        <Input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          type="button"
          variant="contained"
          onClick={() => router.push("/animes/add")}
        >
          Add
        </Button>
      </section>
      <section className={styles.grid}>
        {filtered.length > 0 ? (
          filtered.map((anime, index) => {
            return <AnimeCard {...anime} key={`anime_${index}`} />;
          })
        ) : (
          <div> No Data</div>
        )}
      </section>
    </div>
  );
}
