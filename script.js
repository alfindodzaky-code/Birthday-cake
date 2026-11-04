(function(){
var cake=document.getElementById('cake'),hb=document.getElementById('hb'),nm=document.getElementById('nm'),inp=document.getElementById('name');

// teks muncul huruf demi huruf
var txt='Selamat Ulang Tahun, '+(localStorage.getItem('bd-name')||'Lovie')+'!';
txt.split('').forEach(function(c,i){
  var s=document.createElement('span');
  s.textContent=c===' '?'\u00a0':c;
  s.style.animationDelay=(3.4+i*.07)+'s';
  hb.appendChild(s);
});

// nama (disimpan di browser)
var saved='Raysha Aryani';
try{saved=localStorage.getItem('bd-name')||'Raysha Aryani'}catch(e){}
function setName(v){
  nm.textContent=v||'Raysha Aryani';
  try{localStorage.setItem('bd-name',v)}catch(e){}
}
inp.value=saved==='Raysha Aryani'?'':saved;
setName(saved);
inp.addEventListener('input',function(){setName(inp.value.trim())});

// balon
var cols=['#ff80ab','#ffd54f','#80d8ff','#b388ff','#a5d6a7','#ff8a65'],bl=document.getElementById('balloons');
for(var i=0;i<9;i++){
  var b=document.createElement('div');
  b.className='b';
  b.style.cssText='left:'+(5+i*11)+'%;background:'+cols[i%6]+';color:'+cols[i%6]+';--t:'+(9+Math.random()*7)+'s;--w:-'+(Math.random()*10)+'s';
  bl.appendChild(b);
}

// confetti
var cv=document.getElementById('cv'),cx=cv.getContext('2d'),P=[],run=false;
function rs(){cv.width=innerWidth*devicePixelRatio;cv.height=innerHeight*devicePixelRatio}
rs();addEventListener('resize',rs);
function burst(n){
  var d=devicePixelRatio;
  for(var i=0;i<n;i++)P.push({x:Math.random()*cv.width,y:-10*d,vx:(Math.random()-.5)*4*d,vy:(2+Math.random()*4)*d,s:(5+Math.random()*6)*d,r:Math.random()*6,vr:(Math.random()-.5)*.3,c:cols[i%6]});
  if(!run){run=true;loop()}
}
function loop(){
  cx.clearRect(0,0,cv.width,cv.height);
  P=P.filter(function(p){return p.y<cv.height+20});
  P.forEach(function(p){
    p.x+=p.vx;p.y+=p.vy;p.r+=p.vr;
    cx.save();cx.translate(p.x,p.y);cx.rotate(p.r);
    cx.fillStyle=p.c;cx.fillRect(-p.s/2,-p.s/4,p.s,p.s/2);
    cx.restore();
  });
  if(P.length)requestAnimationFrame(loop);else run=false;
}

// lilin
function blow(){
  if(cake.classList.contains('out'))return;
  cake.classList.add('out');
  setTimeout(function(){burst(160)},500);
  if(navigator.vibrate)try{navigator.vibrate(60)}catch(e){}
}
function relight(){cake.classList.remove('out')}
document.getElementById('blow').onclick=blow;
document.getElementById('relight').onclick=relight;
document.getElementById('party').onclick=function(){burst(140)};
document.querySelectorAll('.flame').forEach(function(f){f.addEventListener('click',blow)});
setTimeout(function(){burst(90)},3200);
})();
