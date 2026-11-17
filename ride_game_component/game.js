(()=>{
const canvas=document.getElementById('game'),ctx=canvas.getContext('2d'),W=960,H=560;
const $=id=>document.getElementById(id);
const assets={};
const files={
 bg:'assets/background/background_preview.png',
 rider:'assets/character/rider_airblade.png',
 cone:'assets/obstacles/cone.png',box:'assets/obstacles/box.png',
 boxes:'assets/obstacles/boxes.png',barrier:'assets/obstacles/barrier.png',
 stack:'assets/obstacles/stack_barrier.png',me:'assets/ui/me_meo.png'
};
for(const [k,v] of Object.entries(files)){assets[k]=new Image();assets[k].src=v}
let state='intro',lives=3,playerY=465,targetY=465,currentLane=1,obstacles=[],distance=0,speed=5,spawn=0,last=0,invincible=0,raf=0,drag=false,lastPointerY=0,swipeHandled=false;
const playerX=135,playerW=210,playerH=190,laneBaselines=[458,540],laneScales=[.84,1];
function drawCover(img,x,y,w,h){if(!img.complete||!img.naturalWidth)return;let s=Math.max(w/img.width,h/img.height),sw=w/s,sh=h/s,sx=(img.width-sw)/2,sy=(img.height-sh)/2;ctx.drawImage(img,sx,sy,sw,sh,x,y,w,h)}
function drawBackground(){
 if(assets.bg.complete&&assets.bg.naturalWidth)drawCover(assets.bg,0,0,W,H);
 else{let g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#bd8cb0');g.addColorStop(1,'#f4a58f');ctx.fillStyle=g;ctx.fillRect(0,0,W,H)}
 // slight darkening at the bottom keeps gameplay objects readable
 ctx.fillStyle='rgba(48,31,48,.10)';ctx.fillRect(0,0,W,H);
}
function image(img,x,y,w,h){if(img&&img.complete&&img.naturalWidth)ctx.drawImage(img,x,y,w,h)}
function drawPlayer(){
 if(!assets.rider.complete||!assets.rider.naturalWidth)return;
 const scale=laneScales[currentLane],w=playerW*scale,h=playerH*scale;
 const baseline=laneBaselines[currentLane];
 ctx.save();
 if(invincible>0&&Math.floor(invincible/7)%2===0)ctx.globalAlpha=.35;
 // One seated pose only; the scooter wheels sit directly on the selected lane surface.
 image(assets.rider,playerX,baseline-h,w,h);
 ctx.restore();
}
function drawObstacle(o){
 const im=assets[o.kind],scale=laneScales[o.lane],w=o.w*scale,h=o.h*scale;
 const baseline=laneBaselines[o.lane];
 if(im&&im.complete&&im.naturalWidth)image(im,o.x,baseline-h,w,h);
 else{ctx.fillStyle='#d66a42';ctx.fillRect(o.x,baseline-h,w,h)}
}
function draw(){
 drawBackground();
 // Render the far lane first and the near lane last, preserving road perspective.
 for(let lane=0;lane<2;lane++){
  obstacles.filter(o=>o.lane===lane).forEach(drawObstacle);
  if(currentLane===lane)drawPlayer();
 }
 if(distance>1100){
  ctx.fillStyle='#6d4350';ctx.fillRect(865,155,9,260);
  for(let i=0;i<5;i++)for(let j=0;j<4;j++){ctx.fillStyle=(i+j)%2?'#fff0dc':'#bd4548';ctx.fillRect(874+i*17,160+j*17,17,17)}
 }
}
function updateHud(){$('hearts').textContent='♥ '.repeat(lives).trim()||'♡';$('stageLabel').textContent='ĐẾN RƯỚC NÀNG'}
function showOverlay(title,body,button,action,extra=''){
 const ov=$('overlay');ov.classList.remove('hidden');
 ov.innerHTML=`<div class="dialog"><div class="emoji">${action==='lost'?'💌':action==='won'?'🌸':'🏍️'}</div><h1>${title}</h1>${body}${extra}<button id="overlayAction">${button}</button></div>`;
 $('overlayAction').onclick=()=>startGame(1);
}
function startGame(s){
 lives=3;currentLane=1;playerY=laneBaselines[currentLane];targetY=playerY;obstacles=[];distance=0;speed=5.2;spawn=95;invincible=0;state='playing';last=performance.now();
 $('overlay').classList.add('hidden');updateHud();cancelAnimationFrame(raf);raf=requestAnimationFrame(loop);
}
function loseLife(){
 if(invincible>0)return;lives--;invincible=90;updateHud();
 if(lives<=0){state='lost';showOverlay('MẸ MEO NHẮN TIN','<div class="message-card"><img src="assets/ui/me_meo.png" alt="Mẹ Meo"><div><strong>Mẹ Meo ♡</strong><p>“đợi lâu quá em dỗi anh gòy, hứ”</p></div></div><p>Mẹ Meo đang đợi bạn đó... Thử lại nhé!</p>','CHƠI LẠI','lost')}
}
function spawnObstacle(){
 const kinds=['cone','box','boxes','barrier','stack'];
 let kind=kinds[Math.floor(Math.random()*kinds.length)];
 let w=kind==='stack'?145:kind==='barrier'?120:kind==='boxes'?100:kind==='cone'?70:72;
 let h=kind==='stack'?90:kind==='barrier'?78:kind==='boxes'?68:kind==='cone'?72:65;
 const lane=Math.random()<.5?0:1;
 const baseline=laneBaselines[lane];
 obstacles.push({kind,x:W+30,y:baseline-h,w,h,lane,checked:false});
}
function rand(a,b){return a+Math.random()*(b-a)}
function loop(now){
 if(state!=='playing')return;
 let dt=Math.min((now-last)/16.67,2);last=now;
 // Snap to one of the two fixed road lanes; no free vertical movement.
 playerY=targetY;
 distance+=speed*.12*dt;if(invincible>0)invincible-=dt;
 spawn-=dt;if(spawn<=0){spawnObstacle();spawn=rand(145,185)}
 for(const o of obstacles){
  o.x-=speed*dt;
  const playerScale=laneScales[currentLane],obstacleScale=laneScales[o.lane];
  const playerLeft=playerX+28*playerScale,playerRight=playerX+playerW*playerScale-10*playerScale;
  const hitX=playerRight>o.x+8*obstacleScale&&playerLeft<o.x+o.w*obstacleScale-5*obstacleScale;
  const hitLane=o.lane===currentLane;
  if(hitX&&hitLane&&!o.checked){o.checked=true;loseLife()}
 }
 obstacles=obstacles.filter(o=>o.x>-180);
 updateHud();draw();
 if(state!=='playing')return;
 if(distance>=1300){state='won';showOverlay('CHIẾN THẮNG!','<p>Bạn đã đến nơi an toàn,<br>hãy đón Hoàng Kim đi chơi nhé.</p>','TIẾP TỤC','won');$('overlayAction').onclick=()=>{$('overlay').classList.add('hidden')};return}
 raf=requestAnimationFrame(loop);
}
function switchLane(direction){
 currentLane=direction<0?0:1;
 targetY=laneBaselines[currentLane];
 playerY=targetY;
}
canvas.addEventListener('pointerdown',e=>{
 if(state!=='playing')return;
 drag=true;swipeHandled=false;lastPointerY=e.clientY;
 canvas.setPointerCapture(e.pointerId);
});
canvas.addEventListener('pointermove',e=>{
 if(!drag||state!=='playing'||swipeHandled)return;
 const rect=canvas.getBoundingClientRect();
 const delta=(e.clientY-lastPointerY)*(H/rect.height);
 if(Math.abs(delta)>18){
  switchLane(delta<0?-1:1);
  swipeHandled=true;
 }
});
function stopDrag(){drag=false;swipeHandled=false}
canvas.addEventListener('pointerup',stopDrag);
canvas.addEventListener('pointercancel',stopDrag);
window.addEventListener('keydown',e=>{
 if(e.key==='ArrowUp'||e.key==='w'){e.preventDefault();switchLane(-1)}
 if(e.key==='ArrowDown'||e.key==='s'){e.preventDefault();switchLane(1)}
});
$('startBtn').onclick=()=>startGame(1);
$('pauseBtn').onclick=()=>{if(state==='playing'){state='paused';showOverlay('TẠM DỪNG','<p>Đường phố đang chờ bạn. Nghỉ một chút nhé!</p>','TIẾP TỤC','resume');$('overlayAction').onclick=()=>{state='playing';last=performance.now();$('overlay').classList.add('hidden');raf=requestAnimationFrame(loop)}}};
function boot(){draw();if(Object.values(assets).every(a=>a.complete))draw()}
Object.values(assets).forEach(a=>a.onload=boot);boot();
})();