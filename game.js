
const game_body = document.getElementById("game-body");
const $lives = document.getElementById("lives");
const max_lives = 3;
var seconds = document.getElementById("timer").textContent;
var lives = document.getElementById("life").textContent;

var character_id = 0;
const img = [  "character-1.png",  "character-2.png", "character-3.png", "character-4.png",  "character-5.png",  "character-6.png",];

const shoot_audio = new Audio(
  "./assets/shoot.mp3"
);
shoot_audio.volume = 0.2;
game_body.onclick = () => {
  shoot_audio.pause();
  shoot_audio.currentTime = 0;
  shoot_audio.play();
};

const backgroundSound = new Audio("./assets/bgMusic.mp3");
backgroundSound.play();
backgroundSound.loop = true;


function check_collide(character) {
  if (character.getBoundingClientRect().top <= 0) {
    lives--;
    document.getElementById("life").innerHTML = lives;
    return true;
  }
  return false;
}


function character_destroy(character) {
  character.style.display = "none";
  character_id++;
  make_character();
}
 
function make_character() {
  randomImage = img[getRandomInt(0, img.length)];
  game_body.innerHTML += `<img src="./assets/${randomImage}" class="character-image" id="character${character_id}">`;
  let character = document.getElementById("character" + character_id);
  character.style.transform = `translateX(${getRandomInt(20, 80)}vw)`;
  character.style.animationDuration = `${getRandomInt(2, 6)}s`;
  character.onclick = () => {
    character_destroy(character);
  };
}

var timer = setInterval(function () {
  seconds--;
  document.getElementById("timer").textContent = seconds;
  let character = document.getElementById("character" + character_id);
  if (check_collide(character) == true) {
    character_destroy(character);
    if (lives == 0) {
      clearInterval(timer);
      location.href = "./game-over.html";
    }
  }
  if (seconds == 0) {
    clearInterval(timer);
    location.href = "./win.html";
  }
}, 1000);


make_character(character_id);


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; 
}
