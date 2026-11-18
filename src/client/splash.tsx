import './index.css';

import { context, requestExpandedMode } from '@devvit/web/client';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

export const Splash = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-[#2b2417] px-6 text-center text-[#ead9b8]">
      <div className="text-3xl">🗺️</div>
      <h1 className="text-3xl font-black tracking-[0.25em] text-[#d8b46a]">CARTOGRAPHE</h1>
      <p className="max-w-[240px] text-[13px] leading-snug text-[#a2906c]">
        Four landmarks, four clues, one blank chart a day. Hi {context.username ?? 'explorer'}.
      </p>
      <button
        onClick={(e) => requestExpandedMode(e.nativeEvent, 'game')}
        className="mt-2 rounded-full bg-[#d8b46a] px-8 py-2.5 text-sm font-black uppercase tracking-widest text-[#2b2417] transition-transform active:scale-[0.98]"
      >
        Unroll
      </button>
    </div>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Splash />
  </StrictMode>
);
