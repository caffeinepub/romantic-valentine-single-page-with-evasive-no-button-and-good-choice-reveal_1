import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

export function OneMoreThingInteraction() {
  const [step, setStep] = useState(0);

  const handleClick = () => {
    setStep((prev) => prev + 1);
  };

  const buttonLabels = [
    'aur bhi kuch h👉👈',
    'pkkaaa naa??',
    'ek baar aur soch lo !'
  ];

  if (step >= 3) {
    return (
      <div className="w-full max-w-3xl mx-auto px-4 py-12 space-y-8 animate-in fade-in duration-700">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border-2 border-romantic-primary/20 p-6 md:p-10 space-y-6">
          <div className="flex justify-center">
            <img
              src="/assets/generated/shona-surprise.dim_724x962.jpg"
              alt="Special moment"
              className="rounded-2xl shadow-lg max-w-full h-auto max-h-[500px] object-contain"
            />
          </div>
          
          <div className="space-y-4 text-base md:text-lg text-romantic-dark/90 leading-relaxed">
            <p>
              awww shona meriiii yaar sach m aaj bhot pyaar aa raha aur haan aaj school m merse ek bhot badi galti hui jisme aapka naraz hona jayaz tha now i m feeling guilty and i m sorry baby abh maaf krdo and lets celebrate valentines babyyyy mann kar raha h aapke paas hi aajauuuu babyyy meliiiiiiiii madam jiiii inke aage ek ni chalti meriii but cute bhot h chalo jaldi jaldi padh lo vipul aapka intezaar kr rha h chats pee ohkiee babyy Happiest valentine day cutieeee bacchii
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 text-romantic-primary/60 animate-pulse pt-4">
            <Heart className="w-5 h-5 fill-current" />
            <Heart className="w-6 h-6 fill-current" />
            <Heart className="w-5 h-5 fill-current" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-12 flex justify-center animate-in fade-in duration-500">
      <Button
        onClick={handleClick}
        size="lg"
        className="text-lg px-8 py-6 rounded-full bg-romantic-primary hover:bg-romantic-accent text-white shadow-xl hover:shadow-romantic-primary/50 hover:scale-105 transition-all duration-300 font-semibold"
      >
        {buttonLabels[step]}
      </Button>
    </div>
  );
}
