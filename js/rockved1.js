import { createToast } from '../toast/script.js'
import { supabase } from './supa.js'
localStorage.setItem("user1score", 0)
localStorage.setItem("user2score", 0)

const quiz = document.getElementById("quiz");
const video = document.getElementById("myVideo");
const score = document.getElementById("score");
const u1 = document.getElementById("u1");
const u2 = document.getElementById("u2");
const container = document.getElementById("container");
let c1,c2,c3,c4,cc;

document.body.onkeyup = function(e) {
  if (e.key == " " || e.code == "Space" || e.keyCode == 32)
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
}

const ques = async () => {
  let uuid = Math.floor(Math.random()*10)+1;
  const { data, error } = await supabase
  .from('questions')
  .select('*')
  .match({id: uuid})
  quiz.innerHTML = '';
  c1 = data[0]['c1'];
  c2 = data[0]['c2'];
  c3 = data[0]['c3'];
  c4 = data[0]['c4'];
  cc = data[0]['correct'];
  let changeques =` <h1 class="quiz">Quiz</h1>
                    <br>
                    <p class="ques">${data[0]['question']}</p>
                    <br>
                    <form action="" class="answer">
                        <button class="val"> <div> <p>Q</p> ${c1} <p>U</p> </div> </button>
                        <button class="val"> <div> <p>W</p> ${c2} <p>I</p> </div> </button>
                        <button class="val"> <div> <p>E</p> ${c3} <p>O</p> </div> </button>
                        <button class="val"> <div> <p>R</p> ${c4} <p>P</p> </div> </button>
                    </form>
                  `
  quiz.innerHTML = changeques;
  checkans();
}

const checkans = () => {
  document.body.onkeyup = function(e) {
    if(e.key == "Q" || e.key == "q") {
      if(cc === c1) {console.log("user1"); updateScore(1);}
    }
    if(e.key == "W" || e.key == "w") {
      if(cc === c2) {console.log("user1"); updateScore(1);}
    }
    if(e.key == "E" || e.key == "e") {
      if(cc === c3) {console.log("user1"); updateScore(1);}
    }
    if(e.key == "R" || e.key == "r") {
      if(cc === c4) {console.log("user1"); updateScore(1);}
    }
    if(e.key == "U" || e.key == "u") {
      if(cc === c1) {console.log("user2"); updateScore(2);}
    }
    if(e.key == "I" || e.key == "i") {
      if(cc === c2) {console.log("user2"); updateScore(2);}
    }
    if(e.key == "O" || e.key == "o") {
      if(cc === c3) {console.log("user2"); updateScore(2);}
    }
    if(e.key == "P" || e.key == "p") {
      if(cc === c4) {console.log("user2"); updateScore(2);}
    }
  }
} 

const updateScore = (u) => {
  let user1score = localStorage.getItem("user1score");
  let user2score = localStorage.getItem("user2score");
  if(u===1) {
    let topval = 80 - 10*(Number(user1score)+1);
    user1score++;
    console.log(topval);
    if(topval==10) winscr(1);
    else u1.style.top = `${topval}%`;
  }
  else if(u===2) {
    let topval = 80 - 10*(Number(user2score)+1);
    user2score++;
    if(topval==10) winscr(2);
    else u2.style.top = `${topval}%`;
  }
  localStorage.setItem("user1score", user1score);
  localStorage.setItem("user2score", user2score);
  score.innerHTML = `Score ${user1score} | ${user2score}`;
  ques();
}

const winscr = (e) => {
  let val;
  if(e===1) val = "User1";
  if(e===2) val = "User2";
  let asd = `
              <video autoplay muted loop id="myVideo">
                <source src="../assets/bgvid.mp4">
              </video>
              <h1 id="win">Congratulations! ${val} wins!!!</h1>
            `
  container.innerHTML = '';
  container.innerHTML = asd;
}

ques();

