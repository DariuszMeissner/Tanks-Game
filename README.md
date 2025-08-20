# Game based on "Batlle City" JavaScript/HTML5

<div style=""display: flex>
<img src="https://github.com/DariuszMeissner/Tanks-Game/blob/main/assets/in-game/Screenshot%20from%202025-08-18%2015-11-32.png" width="400" >
<img src="https://github.com/DariuszMeissner/Tanks-Game/blob/main/assets/in-game/Screenshot%20from%202025-08-18%2015-09-10.png" width="400" >
<img src="https://github.com/DariuszMeissner/Tanks-Game/blob/main/assets/in-game/Screenshot%20from%202025-08-18%2015-09-29.png" width="400" >
<img src="https://github.com/DariuszMeissner/Tanks-Game/blob/main/assets/in-game/Screenshot%20from%202025-08-18%2015-10-49.png" width="400" >  
</div>

### Description

I always wanted to make a game from when I saw first game in 9 years old. So continue my programming journey I'm creating game like "Tanks" based on "The Battle City".

**This is early version and still under development so may have some bugs**

### Feature

- Collision detection with different elements by Player/Bots/Bullet
- Bots movement/shooting/random respawn
- Player movement/shooting/lives
- Maps with status advance to next stage/end game,
- Graphics / Animations
- Sounds
- Hud

### Technologies

- JavaScript
- Canvas Api

### How to play

Clone repo,\
Open `index.html` by "Live server" plugin

### Controls:

#### Menu

LEFT: `ArrowLeft`,\
RIGHT: `ArrowRight`,\
UP: `ArrowUp`,\
DOWN: `ArrowDown`,\
Agree: `Enter`

#### 1 player

LEFT: `ArrowLeft`,\
RIGHT: `ArrowRight`,\
UP: `ArrowUp`,\
DOWN: `ArrowDown`,\
SHOOT: `NumpadEnter`

#### 2 player

LEFT: `KeyA`,\
RIGHT: `KeyD`,\
UP: `KeyW`,\
DOWN: `KeyS`,\
SHOOT: `Space`

### Create your own map

open `levels.js` and create by elements\
`ROAD: 0`,\
`WALL: 1`,\
`WATER: 2`,\
`GRASS: 3`,\
`EAGLE: 4`,\
`MAP_EDGE: 5`,\
`ROCK: 6`,\
`EAGLE_DEAD: 7`,
