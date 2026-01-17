export function playDrawSound(cardCount: number, drawAudio: HTMLAudioElement) {
  drawAudio.pause();
  drawAudio.currentTime = 0;

  if (cardCount === 1) {
    drawAudio.loop = false;
    drawAudio.play().catch(() => {});
    return;
  }

  const duration = cardCount <= 5 ? 1200 : 2000;

  drawAudio.loop = true;
  drawAudio.play().catch(() => {});

  setTimeout(() => {
    drawAudio.pause();
    drawAudio.currentTime = 0;
  }, duration);
}
