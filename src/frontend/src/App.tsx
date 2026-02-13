import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { MessageCoverOverlay } from '@/components/MessageCoverOverlay';
import { AudioStatusIndicator } from '@/components/AudioStatusIndicator';
import { OneMoreThingInteraction } from '@/components/OneMoreThingInteraction';

type RevealState = 'covered' | 'revealing' | 'revealed';

export default function App() {
  const [accepted, setAccepted] = useState(false);
  const [revealState, setRevealState] = useState<RevealState>('covered');
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleNoHover = () => {
    if (!containerRef.current || !noButtonRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const button = noButtonRef.current.getBoundingClientRect();

    // Calculate safe bounds (keep button fully visible)
    const maxX = container.width - button.width - 40;
    const maxY = container.height - button.height - 40;

    // Generate random position within bounds
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    setNoButtonPosition({ x: newX, y: newY });
  };

  const handleYesClick = () => {
    setAccepted(true);
    setRevealState('covered');
  };

  const handleReveal = () => {
    setRevealState('revealing');
    // After cover animation completes, show the message
    setTimeout(() => {
      setRevealState('revealed');
    }, 600);
  };

  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        // State will be updated by the 'pause' event listener
      } else {
        await audioRef.current.play();
        // State will be updated by the 'play' event listener
      }
      setAudioError(null);
    } catch (error) {
      console.error('Audio playback failed:', error);
      setAudioError('Could not start audio. Please click Play again.');
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    // Initialize No button position on mount
    if (containerRef.current && noButtonRef.current) {
      const container = containerRef.current.getBoundingClientRect();
      const button = noButtonRef.current.getBoundingClientRect();
      const maxX = container.width - button.width - 40;
      const maxY = container.height - button.height - 40;
      setNoButtonPosition({ x: maxX / 2, y: maxY / 2 });
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Sync UI state with actual audio playback state
    const handlePlay = () => {
      setIsPlaying(true);
      setAudioError(null);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    const handleError = (e: Event) => {
      const target = e.target as HTMLAudioElement;
      const error = target.error;
      let errorMessage = 'Audio playback error occurred.';
      
      if (error) {
        switch (error.code) {
          case MediaError.MEDIA_ERR_ABORTED:
            errorMessage = 'Audio loading was aborted.';
            break;
          case MediaError.MEDIA_ERR_NETWORK:
            errorMessage = 'Network error while loading audio.';
            break;
          case MediaError.MEDIA_ERR_DECODE:
            errorMessage = 'Audio file could not be decoded.';
            break;
          case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
            errorMessage = 'Audio format not supported or file not found.';
            break;
        }
      }
      
      console.error('Audio error:', errorMessage, error);
      setAudioError(errorMessage);
      setIsPlaying(false);
    };

    const handleStalled = () => {
      console.warn('Audio loading stalled');
    };

    const handleWaiting = () => {
      console.warn('Audio buffering');
    };

    const handleCanPlay = () => {
      console.log('Audio can play');
    };

    const handleLoadedMetadata = () => {
      console.log('Audio metadata loaded');
    };

    const handleVolumeChange = () => {
      if (audio.muted !== isMuted) {
        setIsMuted(audio.muted);
      }
    };

    // Add event listeners
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('stalled', handleStalled);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('volumechange', handleVolumeChange);

    // Cleanup
    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('stalled', handleStalled);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('volumechange', handleVolumeChange);
    };
  }, [isMuted]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-romantic-light via-romantic-lighter to-white p-4 overflow-auto">
      {/* Audio element */}
      <audio
        ref={audioRef}
        src="/assets/music/valentine.mp3"
        loop
        preload="auto"
      />

      {/* Music controls - always visible */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        <div className="flex gap-2">
          <Button
            onClick={togglePlay}
            size="icon"
            variant="outline"
            className="bg-white/90 backdrop-blur-sm hover:bg-romantic-light border-romantic-primary/20 shadow-lg"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-romantic-primary" />
            ) : (
              <Play className="w-4 h-4 text-romantic-primary" />
            )}
          </Button>
          <Button
            onClick={toggleMute}
            size="icon"
            variant="outline"
            className="bg-white/90 backdrop-blur-sm hover:bg-romantic-light border-romantic-primary/20 shadow-lg"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-romantic-primary" />
            ) : (
              <Volume2 className="w-4 h-4 text-romantic-primary" />
            )}
          </Button>
        </div>
        {audioError && (
          <AudioStatusIndicator
            message={audioError}
            onDismiss={() => setAudioError(null)}
          />
        )}
      </div>

      {accepted ? (
        <>
          {/* Cover overlay - shown initially */}
          {revealState === 'covered' && (
            <MessageCoverOverlay onReveal={handleReveal} />
          )}

          {/* Cover exit animation */}
          {revealState === 'revealing' && (
            <div className="min-h-screen flex items-center justify-center w-full cover-exit">
              <MessageCoverOverlay onReveal={() => {}} />
            </div>
          )}

          {/* Revealed message */}
          {revealState === 'revealed' && (
            <div className="min-h-screen flex flex-col items-center justify-start py-12 w-full message-reveal">
              <div className="max-w-3xl mx-auto space-y-8 w-full px-4">
                <div 
                  className="text-center space-y-4 animate-in fade-in duration-500"
                  style={{ animationDelay: '0ms' }}
                >
                  <Heart className="w-16 h-16 mx-auto text-romantic-primary fill-romantic-primary animate-pulse" />
                </div>
                
                <div 
                  className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border-2 border-romantic-primary/20 p-8 md:p-12 space-y-6 animate-in fade-in duration-700 scale-95"
                  style={{ 
                    animationDelay: '200ms',
                    animation: 'fadeInScale 0.7s ease-out 0.2s forwards'
                  }}
                >
                  <p className="text-lg md:text-xl text-romantic-dark/90 leading-relaxed">
                    Yaar sach bolu na, jab aapne propose kara tha na toh dil literally ek second ke liye ruk sa gaya 🥹❤️ Itna time ho gaya hume saath me, aur har ek phase me — chahe hasi ho, stupid fights ho, mood swings ho, ya life ki tensions — hum dono ne ek dusre ko samjha, handle kiya aur kabhi chhoda nahi. Tu sirf meri girlfriend nahi hai, tu meri best friend hai, meri peace hai, meri safe place hai. 🫶
                  </p>

                  <p className="text-lg md:text-xl text-romantic-dark/90 leading-relaxed">
                    Humne saath me kitna time spend kiya hai — random calls, late night talks, bina wajah hassna, ek dusre ki problems sunna, kabhi advice dena kabhi bas chup chaap saath rehna… aur ye sab moments mere liye kisi treasure se kam nahi hain. Thank you itna patience rakhne ke liye, meri har bakwaas sunne ke liye, meri tension me mere saath khade rehne ke liye, aur mujhe itna special feel karane ke liye.
                  </p>

                  <p className="text-lg md:text-xl text-romantic-dark/90 leading-relaxed">
                    Aaj se nahi, kaafi time se tu meri Valentine thi… bas aaj official ho gaya 💌❤️
                  </p>

                  <div 
                    className="my-8 p-6 md:p-8 bg-gradient-to-br from-romantic-light/50 to-romantic-lighter/30 rounded-2xl border-l-4 border-romantic-primary shadow-lg animate-in fade-in duration-700"
                    style={{ 
                      animationDelay: '500ms',
                      animation: 'fadeInScale 0.7s ease-out 0.5s forwards'
                    }}
                  >
                    <p className="text-base md:text-lg text-romantic-dark/80 italic font-medium mb-3">
                      Tere naam ek chhoti si shayari:
                    </p>
                    <div className="space-y-2 text-lg md:text-xl text-romantic-dark/90 leading-relaxed">
                      <p>"Tere saath har din Valentine jaisa lagta hai,</p>
                      <p>Teri hasi se mera har gham halka lagta hai.</p>
                      <p>Tu saath ho toh darr bhi darr nahi lagta,</p>
                      <p>Sach kahu… tu hi meri duniya, tu hi mera sab lagta hai." ❤️✨</p>
                    </div>
                  </div>

                  <p className="text-lg md:text-xl text-romantic-dark/90 leading-relaxed font-medium">
                    I promise, chahe life kitni bhi busy ya tough ho jaye, main hamesha tere saath khada rahunga. Happy Valentine's Day meri jaan 🫶💖
                  </p>
                </div>

                <div 
                  className="flex items-center justify-center gap-2 text-romantic-primary/60 animate-pulse animate-in fade-in duration-500"
                  style={{ animationDelay: '700ms' }}
                >
                  <Heart className="w-5 h-5 fill-current" />
                  <Heart className="w-6 h-6 fill-current" />
                  <Heart className="w-5 h-5 fill-current" />
                </div>
              </div>

              {/* One More Thing Interaction */}
              <OneMoreThingInteraction />

              <footer className="w-full text-center text-sm text-romantic-dark/50 py-8">
                <p>
                  © {new Date().getFullYear()} · Built with{' '}
                  <Heart className="inline w-4 h-4 text-romantic-primary fill-romantic-primary" /> using{' '}
                  <a
                    href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                      typeof window !== 'undefined' ? window.location.hostname : 'valentine-app'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-romantic-primary hover:underline font-medium"
                  >
                    caffeine.ai
                  </a>
                </p>
              </footer>
            </div>
          )}
        </>
      ) : (
        <div className="text-center space-y-12 max-w-2xl mx-auto py-12">
          <div className="space-y-6 animate-in fade-in slide-in-from-top duration-700">
            <div className="flex justify-center gap-3">
              <Heart className="w-12 h-12 text-romantic-primary fill-romantic-primary animate-bounce" style={{ animationDelay: '0ms' }} />
              <Heart className="w-16 h-16 text-romantic-accent fill-romantic-accent animate-bounce" style={{ animationDelay: '150ms' }} />
              <Heart className="w-12 h-12 text-romantic-primary fill-romantic-primary animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-romantic-dark tracking-tight leading-tight">
              Will you be my
              <br />
              <span className="text-romantic-primary">Valentine?</span>
            </h1>

            <p className="text-xl md:text-2xl text-romantic-dark/70 font-light">
              Choose wisely... 💕
            </p>
          </div>

          <div 
            ref={containerRef}
            className="relative h-64 w-full flex items-center justify-center"
          >
            <div className="flex gap-6 items-center justify-center">
              <Button
                onClick={handleYesClick}
                size="lg"
                className="text-xl px-12 py-8 rounded-full bg-romantic-primary hover:bg-romantic-accent text-white shadow-2xl hover:shadow-romantic-primary/50 hover:scale-110 transition-all duration-300 font-semibold"
              >
                Yes! 💖
              </Button>

              <button
                ref={noButtonRef}
                onMouseEnter={handleNoHover}
                onTouchStart={handleNoHover}
                style={{
                  position: 'absolute',
                  left: `${noButtonPosition.x}px`,
                  top: `${noButtonPosition.y}px`,
                  transition: 'all 0.3s ease-out',
                }}
                className="text-xl px-12 py-4 rounded-full bg-romantic-muted hover:bg-romantic-muted text-romantic-dark/60 shadow-lg font-semibold cursor-pointer"
              >
                No
              </button>
            </div>
          </div>

          <p className="text-sm text-romantic-dark/40 italic animate-in fade-in duration-1000 delay-500">
            Hint: The "No" button is a bit shy... 😊
          </p>

          <footer className="text-center text-sm text-romantic-dark/50 mt-12">
            <p>
              © {new Date().getFullYear()} · Built with{' '}
              <Heart className="inline w-4 h-4 text-romantic-primary fill-romantic-primary" /> using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== 'undefined' ? window.location.hostname : 'valentine-app'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-romantic-primary hover:underline font-medium"
              >
                caffeine.ai
              </a>
            </p>
          </footer>
        </div>
      )}
    </div>
  );
}
