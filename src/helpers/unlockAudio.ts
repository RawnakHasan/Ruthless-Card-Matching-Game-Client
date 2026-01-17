let unlocked = false;

export function unlockAudio() {
  if (unlocked) return;

  const audio = new Audio();
  audio
    .play()
    .then(() => {
      unlocked = true;
      console.log("🔓 Audio unlocked");
    })
    .catch(() => {});
}
