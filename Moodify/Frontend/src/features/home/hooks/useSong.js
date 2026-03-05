import { getSong } from "../service/song.api";
import { useContext } from "react";
import { songContext } from "../song.context";

export const useSong = () => {
    const context = useContext(songContext);

    const {loading, setLoading, song, setSong} = context;

    async function handleGetSong({mood}) {
        setLoading(true);
        const data = await getSong({mood});
        // console.log(data);
        // setSong(data.song);
        setLoading(false);
    }

    return ({ loading, song, handleGetSong })
}