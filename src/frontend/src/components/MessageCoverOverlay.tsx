import { Button } from '@/components/ui/button';
import { Heart, Sparkles } from 'lucide-react';

interface MessageCoverOverlayProps {
  onReveal: () => void;
}

export function MessageCoverOverlay({ onReveal }: MessageCoverOverlayProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 w-full px-4 animate-in fade-in duration-500">
      <div className="max-w-2xl mx-auto space-y-8 w-full">
        {/* Cover Image */}
        <div className="relative group cursor-pointer" onClick={onReveal}>
          <div className="absolute inset-0 bg-gradient-to-br from-romantic-primary/20 to-romantic-accent/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500 animate-pulse" />
          
          <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border-2 border-romantic-primary/30 overflow-hidden hover:shadow-romantic-primary/30 hover:scale-[1.02] transition-all duration-500">
            <img
              src="/assets/generated/message-cover.dim_1200x800.png"
              alt="Message Cover"
              className="w-full h-auto object-cover"
            />
            
            {/* Overlay gradient for better text visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-romantic-primary/40 via-transparent to-transparent" />
            
            {/* Floating hearts animation */}
            <div className="absolute top-4 right-4 animate-bounce">
              <Heart className="w-8 h-8 text-white fill-white drop-shadow-lg" />
            </div>
            <div className="absolute top-8 left-8 animate-bounce" style={{ animationDelay: '0.2s' }}>
              <Sparkles className="w-6 h-6 text-white drop-shadow-lg" />
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center space-y-4 animate-in fade-in duration-700" style={{ animationDelay: '300ms' }}>
          <h2 className="text-3xl md:text-4xl font-bold text-romantic-dark">
            A Special Message Awaits... 💌
          </h2>
          <p className="text-lg md:text-xl text-romantic-dark/70">
            Click the envelope to reveal your surprise
          </p>
          
          <Button
            onClick={onReveal}
            size="lg"
            className="text-xl px-12 py-8 rounded-full bg-romantic-primary hover:bg-romantic-accent text-white shadow-2xl hover:shadow-romantic-primary/50 hover:scale-110 transition-all duration-300 font-semibold mt-6"
          >
            Open Message 💖
          </Button>
        </div>

        {/* Decorative hearts */}
        <div className="flex items-center justify-center gap-3 animate-pulse">
          <Heart className="w-5 h-5 text-romantic-primary fill-romantic-primary" />
          <Heart className="w-6 h-6 text-romantic-accent fill-romantic-accent" />
          <Heart className="w-5 h-5 text-romantic-primary fill-romantic-primary" />
        </div>
      </div>
    </div>
  );
}
