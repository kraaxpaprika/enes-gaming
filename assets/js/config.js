/* ------------------------------------------------------------------
   Site settings. Change things here - no need to touch the games.
   ------------------------------------------------------------------ */
window.GAME_CONFIG = {
  // Player name shown all over the site.
  playerName: "Enes & Fatih Mert",

  // Who can play. On the start page, the child picks one of these.
  // Progress (scores, play time) is kept separately for every player,
  // so you can see who played what and for how long.
  // To add someone, copy a line and give it a new "id".
  players: [
    { id: "enes",  name: "Enes",       emoji: "🦁" },
    { id: "fatih", name: "Fatih Mert", emoji: "🐯" },
    { id: "yegen", name: "Yeğenim",    emoji: "🐣" }
  ],


  // The cartoon mascot used across the site.
  mascot: "assets/img/mascot.svg",

  // Optional real photo for the small avatar in the header.
  // Drop a picture at assets/img/avatar.jpg to use it; if the file is
  // missing, the mascot drawing is used instead.
  avatar: "assets/img/avatar.jpg"
};
