import { useState } from "react";
import { createContext } from "react";

export const songContext = createContext();

export const SongContextProvider = ({ children }) => {
  const [song, setSong] = useState({
    url: "https://ik.imagekit.io/kr1pxfc4bh/chohot-2/moodify/songs/Fuck_Them__RiskyjaTT.CoM__Jn-GQM28R.mp3",
    posterUrl: "https://ik.imagekit.io/kr1pxfc4bh/chohot-2/moodify/posters/Fuck_Them__RiskyjaTT.CoM__wd93Rnh71.jpeg",
    title: "Fuck Them (RiskyjaTT.CoM)",
    mood: "surprised",
  });

  const [loading, setLoading] = useState();

  return (
    <songContext.Provider value={{ loading, setLoading, song, setSong }}>
      {children}
    </songContext.Provider>
  );
};
