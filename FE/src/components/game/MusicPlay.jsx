import Play from '../../../public/images/play.png';
import Stop from '../../../public/images/stop.png';

const MusicPlay = ({ handlePlayMusic, isPlaying }) => {
  return (
    <div className="absolute bottom-0 right-0 p-5 bg-black bg-opacity-0 text-white z-[1000]">
      <button onClick={handlePlayMusic}>
        {isPlaying ? (
          <img src={Stop} alt="Stop Music" className="w-8 h-8" />
        ) : (
          <img src={Play} alt="Play Music" className="w-8 h-8" />
        )}
      </button>
    </div>
  );
};

export default MusicPlay;
