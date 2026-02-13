import { Button } from '@/components/ui/button';
import { X, AlertCircle } from 'lucide-react';

interface AudioStatusIndicatorProps {
  message: string;
  onDismiss: () => void;
}

export function AudioStatusIndicator({ message, onDismiss }: AudioStatusIndicatorProps) {
  return (
    <div className="bg-white/95 backdrop-blur-sm border border-romantic-primary/20 rounded-lg shadow-lg p-3 max-w-xs animate-in fade-in slide-in-from-top duration-300">
      <div className="flex items-start gap-2">
        <AlertCircle className="w-4 h-4 text-romantic-accent flex-shrink-0 mt-0.5" />
        <p className="text-xs text-romantic-dark/80 flex-1 leading-relaxed">
          {message}
        </p>
        <Button
          onClick={onDismiss}
          size="icon"
          variant="ghost"
          className="h-5 w-5 p-0 hover:bg-romantic-light/50 flex-shrink-0"
        >
          <X className="w-3 h-3 text-romantic-dark/60" />
        </Button>
      </div>
    </div>
  );
}
