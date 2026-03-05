
import { useState, useRef, useEffect } from 'react';
import '../../../shared/player.scss';
import { useSong } from "../hooks/useSong"

const Player = () => {
  const { song } = useSong();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [imageError, setImageError] = useState(false);

  // Debug log to check song data
  useEffect(() => {
    // console.log('Current song data:', song);
  }, [song]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
      audio.playbackRate = playbackRate;
    }
  }, [volume, playbackRate]);

  // Reset image error when song changes
  useEffect(() => {
    setImageError(false);
  }, [song.posterUrl]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio) {
      setCurrentTime(audio.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (audio) {
      setDuration(audio.duration);
    }
  };

  const handleProgressChange = (e) => {
    const audio = audioRef.current;
    if (audio) {
      const newTime = (e.target.value / 100) * duration;
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value / 100;
    setVolume(newVolume);
  };

  const skipTime = (seconds) => {
    const audio = audioRef.current;
    if (audio) {
      const newTime = Math.max(0, Math.min(duration, audio.currentTime + seconds));
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const changePlaybackRate = (rate) => {
    setPlaybackRate(rate);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="player-container">
      <audio
        ref={audioRef}
        src={song.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="player-header">
        <div className="song-poster-container">
          {imageError ? (
            <div className="song-poster-placeholder">
              <span>🎵</span>
            </div>
          ) : (
            <img
              src={song.posterUrl}
              alt={song.title}
              className="song-poster"
              onError={() => {
                console.log('Image failed to load:', song.posterUrl);
                setImageError(true);
              }}
              onLoad={() => {
                console.log('Image loaded successfully:', song.posterUrl);
                setImageError(false);
              }}
            />
          )}
        </div>
        <div className="song-info">
          <h3 className="song-title">{song.title}</h3>
          <p className="song-mood">{song.mood}</p>
        </div>
      </div>

      <div className="player-controls">
        <div className="progress-container">
          <span className="time-display">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max="100"
            value={duration ? (currentTime / duration) * 100 : 0}
            onChange={handleProgressChange}
            className="progress-bar"
          />
          <span className="time-display">{formatTime(duration)}</span>
        </div>

        <div className="control-buttons">
          <button onClick={() => skipTime(-5)} className="skip-btn">
            ⏪ 5s
          </button>

          <button onClick={togglePlayPause} className="play-pause-btn">
            {isPlaying ? '⏸️' : '▶️'}
          </button>

          <button onClick={() => skipTime(5)} className="skip-btn">
            5s ⏩
          </button>
        </div>

        <div className="speed-controls">
          <label>Speed:</label>
          <select
            value={playbackRate}
            onChange={(e) => changePlaybackRate(parseFloat(e.target.value))}
            className="speed-select"
          >
            <option value="0.5">0.5x</option>
            <option value="0.75">0.75x</option>
            <option value="1">1x</option>
            <option value="1.25">1.25x</option>
            <option value="1.5">1.5x</option>
            <option value="2">2x</option>
          </select>
        </div>

        <div className="volume-control">
          <span>🔊</span>
          <input
            type="range"
            min="0"
            max="100"
            value={volume * 100}
            onChange={handleVolumeChange}
            className="volume-slider"
          />
        </div>
      </div>
    </div>
  );
};

export default Player;
