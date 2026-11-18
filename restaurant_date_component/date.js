(()=>{
const $=id=>document.getElementById(id);
const entrance=$('entranceScene'),inside=$('insideScene'),letterScene=$('letterScene'),text=$('dialogueText'),panel=$('dialoguePanel'),girl=$('dinnerGirl'),boy=$('dinnerBoy'),heart=$('finishHeart');
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const rotatePrompt=$('rotatePrompt'),tryLandscape=$('tryLandscape');
const isPhone=()=>window.matchMedia('(pointer:coarse)').matches && Math.min(window.innerWidth,window.innerHeight)<=900;
const isPortrait=()=>window.matchMedia('(orientation:portrait)').matches;
let started=false;
function orientationReady(){return !isPhone() || !isPortrait()}
function updateOrientationGate(){
  const blocked=!orientationReady();
  if(rotatePrompt) rotatePrompt.style.display=blocked?'flex':'none';
  if(!blocked && !started){started=true;runDate();}
}
if(tryLandscape){tryLandscape.addEventListener('click',async()=>{
  try{if(screen.orientation && screen.orientation.lock) await screen.orientation.lock('landscape');}catch(_e){}
  setTimeout(updateOrientationGate,250);
});}
window.addEventListener('resize',updateOrientationGate);
window.addEventListener('orientationchange',()=>setTimeout(updateOrientationGate,250));
function typeLine(line){return new Promise(resolve=>{let i=0;text.textContent='';const timer=setInterval(()=>{text.textContent+=line.charAt(i++);if(i>=line.length){clearInterval(timer);resolve()}},38)})}
async function showLine(line){panel.classList.add('show');await typeLine(line)}
async function runDate(){
  // Keep the paired hand-holding sprite intact while they walk diagonally to the entrance door.
  await sleep(5900);
  entrance.classList.remove('active');entrance.setAttribute('aria-hidden','true');
  inside.classList.add('active');inside.setAttribute('aria-hidden','false');
  await sleep(950);
  // Both seated sprites are anchored to the two chairs, behind the tabletop edge.
  await showLine('Cảm ơn anh đã đưa em đi chơi, hôm nay em vui lắm. ♡');
  await sleep(1250);
  // Hoàng Kim's gift sprite contains the single envelope in her hand.
  // No separate envelope layer is rendered, so a duplicate cannot appear.
  girl.src='assets/characters/hoang_kim/seated_gift.png';
  boy.src='assets/characters/nam_chinh/seated_surprised.png';
  await showLine('Em có cái này tặng cho anh. ♡');
  await sleep(1500);
  // Transfer the one visible letter by swapping poses: it disappears from her hand
  // at the same instant it appears in his receiving pose.
  girl.src='assets/characters/hoang_kim/seated_happy.png';
  boy.src='assets/characters/nam_chinh/seated_receive_gift.png';
  await sleep(1400);
  panel.classList.remove('show');heart.classList.add('show');
  // Once the male lead has received the single envelope, transition to Hoàng Kim's full letter.
  await sleep(1100);
  inside.classList.remove('active');inside.setAttribute('aria-hidden','true');
  letterScene.classList.add('show');letterScene.setAttribute('aria-hidden','false');
}
updateOrientationGate();
})();