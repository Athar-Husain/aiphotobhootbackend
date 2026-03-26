// src/services/variation.service.js

export const getVariationPrompt = (theme, gender) => {
  const base = `ultra realistic portrait of a ${gender}`;

  const variations = {
    fitness: [
      `${base} professional gym athlete, muscular, neon orange lighting`,
      `${base} intense crossfit training sweat, cinematic lighting`,
      `${base} fitness influencer photoshoot studio background`,
      `${base} outdoor running athlete golden hour`,
    ],
    sports: [
      `${base} football player action shot stadium lights`,
      `${base} basketball player dunk dramatic lighting`,
      `${base} cricket athlete powerful pose spotlight`,
      `${base} olympic athlete victory pose`,
    ],
    hydration: [
      `${base} glowing skin fresh hydration aura blue tones`,
      `${base} futuristic hydration energy waves neon cyan`,
      `${base} athlete drinking water splash slow motion`,
      `${base} clean wellness portrait fresh energetic vibe`,
    ],
    nightlife: [
      `${base} party neon club lights cyberpunk style`,
      `${base} DJ stage performance crowd lights`,
      `${base} nightlife glow UV lighting high energy`,
      `${base} concert vibe colorful laser lighting`,
    ],
  };

  const arr = variations[theme] || variations.fitness;
  return arr[Math.floor(Math.random() * arr.length)];
};
