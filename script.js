const stem = document.getElementById("stem");
const leaf1 = document.getElementById("leaf1");
const leaf2 = document.getElementById("leaf2");
const bud = document.getElementById("bud");
const flower = document.getElementById("flower");
const petalGlow = document.getElementById("petalGlow");
const particles = document.getElementById("particles");
const bloomCaption = document.querySelector(".bloom-caption");
const bloomBtn = document.getElementById("bloomBtn");
const noteBtn = document.getElementById("noteBtn");
const resetBtn = document.getElementById("resetBtn");
const letter = document.getElementById("letter");
const subtitle = document.getElementById("subtitle");

let bloomed = false;

const sleep = ms => new Promise(r => setTimeout(r, ms));

function animate(el, keyframes, options){
  return el.animate(keyframes, options).finished;
}

async function bloom(){
  if(bloomed) return;
  bloomed = true;
  bloomBtn.disabled = true;
  bloomBtn.textContent = "🌱 عم تكبر...";
  subtitle.textContent = "من بذرة صغيرة... إلى شيء جميل يشبهك.";

  // stem grows first
  stem.style.strokeDasharray = "280";
  stem.style.strokeDashoffset = "280";
  await animate(stem,
    [{strokeDashoffset:280},{strokeDashoffset:0}],
    {duration:1700,easing:"cubic-bezier(.2,.8,.2,1)",fill:"forwards"});

  // leaves appear
  await Promise.all([
    animate(leaf1,[{opacity:0,transform:"scale(.1)"},{opacity:1,transform:"scale(1)"}],
      {duration:700,easing:"cubic-bezier(.2,.8,.2,1)",fill:"forwards"}),
    (async()=>{await sleep(250); return animate(leaf2,[{opacity:0,transform:"scale(.1)"},{opacity:1,transform:"scale(1)"}],
      {duration:700,easing:"cubic-bezier(.2,.8,.2,1)",fill:"forwards"})})()
  ]);

  subtitle.textContent = "استني شوي... الوردة لسا عندها حكاية 🌹";

  // bud gently rises
  await animate(bud,
    [{transform:"translate(250px 285px) scale(.15)",opacity:0},
     {transform:"translate(250px 285px) scale(1.05)",opacity:1,offset:.7},
     {transform:"translate(250px 285px) scale(1)",opacity:1}],
    {duration:1200,easing:"cubic-bezier(.2,.8,.2,1)",fill:"forwards"});

  await sleep(350);

  // bud disappears as full flower blooms
  await animate(bud,[{opacity:1,transform:"translate(250px 285px) scale(1)"},{opacity:0,transform:"translate(250px 250px) scale(.72)"}],
    {duration:500,easing:"ease-in",fill:"forwards"});

  petalGlow.animate([{opacity:0,transform:"scale(.3)"},{opacity:.8,transform:"scale(1.2)"},{opacity:.25,transform:"scale(1)"}],
    {duration:1500,easing:"ease-out",fill:"forwards"});

  await animate(flower,
    [{opacity:0,transform:"translate(250px 205px) scale(.08) rotate(-12deg)"},
     {opacity:1,transform:"translate(250px 205px) scale(.72) rotate(5deg)",offset:.45},
     {opacity:1,transform:"translate(250px 205px) scale(1) rotate(0deg)"}],
    {duration:1900,easing:"cubic-bezier(.15,.85,.2,1)",fill:"forwards"});

  createParticles();
  bloomCaption.classList.add("show");
  noteBtn.classList.remove("hidden");
  resetBtn.classList.remove("hidden");
  bloomBtn.textContent = "🌹 اكتملت الوردة";
  subtitle.textContent = "كل شيء جميل يبدأ صغيرًا... ثم يزهر في الوقت المناسب. ❤️";
}

function createParticles(){
  particles.innerHTML="";
  const symbols=["♥","♥","🌹","·","♥"];
  for(let i=0;i<25;i++){
    const p=document.createElement("span");
    p.className="particle";
    p.textContent=symbols[Math.floor(Math.random()*symbols.length)];
    p.style.left=(35+Math.random()*30)+"%";
    p.style.top=(48+Math.random()*20)+"%";
    p.style.setProperty("--x",`${(Math.random()-.5)*180}px`);
    p.style.animationDelay=(Math.random()*900)+"ms";
    p.style.animationDuration=(2200+Math.random()*1300)+"ms";
    particles.appendChild(p);
  }
}

function reset(){
  bloomed=false;
  bloomBtn.disabled=false;
  bloomBtn.textContent="🌹 اضغطي لتتفتح الوردة";
  subtitle.textContent="لأن بعض الأشياء الجميلة تستحق أن تبدأ بهدوء...";
  stem.style.strokeDasharray="280";
  stem.style.strokeDashoffset="0";
  leaf1.style.opacity="0";
  leaf2.style.opacity="0";
  bud.style.opacity="1";
  bud.style.transform="translate(250px 285px) scale(1)";
  flower.style.opacity="0";
  flower.style.transform="translate(250px 205px) scale(0)";
  petalGlow.style.opacity="0";
  particles.innerHTML="";
  bloomCaption.classList.remove("show");
  noteBtn.classList.add("hidden");
  resetBtn.classList.add("hidden");
  letter.classList.add("hidden");
}

bloomBtn.addEventListener("click", bloom);
noteBtn.addEventListener("click", ()=>{
  letter.classList.toggle("hidden");
  if(!letter.classList.contains("hidden")){
    setTimeout(()=>letter.scrollIntoView({behavior:"smooth",block:"center"}),50);
  }
});
resetBtn.addEventListener("click", reset);
