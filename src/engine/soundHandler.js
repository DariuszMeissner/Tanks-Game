/**
 * Play a HTMLAudioElement. This will also reset the playback if it is already currently playing.
 * @param {HTMLAudioElement} sound
 * @param {{ volume: number, loop: boolean }} options
 */
export function playSound(sound, volume = 1, loop = false) {
  sound.loop = loop;
  sound.autoplay = true;
  sound.volume = volume;

  if (sound.currentTime > 0) sound.currentTime = 0;
  if (sound.paused) sound.play();
}

/**
 * Stop a currently playing HTMLAudioElement, reseting its position to the beginning.
 * @param {HTMLAudioElement} sound
 */
export function pauseSound(sound) {
  sound.pause();
  sound.currentTime = 0;
}
