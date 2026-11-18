(()=>{
const $=id=>document.getElementById(id);
const entrance=$('entranceScene'),inside=$('insideScene'),text=$('dialogueText'),panel=$('dialoguePanel'),girl=$('dinnerGirl'),boy=$('dinnerBoy'),heart=$('finishHeart');
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
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
}
runDate();
})();