const noBtn = document.getElementById('no');
const yesBtn = document.getElementById('yes');
const modal = document.getElementById('modal');
const heartsContainer = document.querySelector('.hearts');
const cry = document.getElementById('cry');
const carousels = document.querySelectorAll('.carousel-wrapper');

let isTricked = false;
let caught = false;
let fixed = false;
let placeholder = null;

function createHeart() {
    const heart = document.createElement('span');
    const size = Math.random()*20+10;
    const colors = ['#ff4d6d','#ff758f','#ffffff','#ff9a9e'];
    heart.textContent='❤';
    heart.style.position='absolute';
    heart.style.bottom='-50px';
    heart.style.left=Math.random()*100+'vw';
    heart.style.fontSize=size+'px';
    heart.style.color=colors[Math.floor(Math.random()*colors.length)];
    heart.style.animationDuration=(3+Math.random()*3)+'s';
    heart.style.pointerEvents='none';
    heartsContainer.appendChild(heart);
    setTimeout(()=>heart.remove(),10000);
}
setInterval(createHeart,300);

document.addEventListener('mousemove', (e)=>{
    if(caught) return;

    const rect = noBtn.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width/2);
    const dy = e.clientY - (rect.top + rect.height/2);
    const distance = Math.hypot(dx,dy);

    if(distance<140) noBtn.classList.add('shake'); 
    else noBtn.classList.remove('shake');

    if(distance<90 && !isTricked && Math.random()<0.01){
        isTricked=true;
        setTimeout(()=>isTricked=false,700);
        return;
    }

    if(distance<100 && !isTricked){
        if(!fixed){
            const r = noBtn.getBoundingClientRect();
            placeholder = document.createElement('div');
            placeholder.style.width = r.width+'px';
            placeholder.style.height = r.height+'px';
            noBtn.after(placeholder);

            noBtn.style.position = 'fixed';
            noBtn.style.left = r.left+'px';
            noBtn.style.top = r.top+'px';
            noBtn.style.zIndex = '10';
            fixed=true;
        }

        let newX = rect.left + (dx>0?-120:120);
        let newY = rect.top + (dy>0?-80:80);

        newX = Math.max(10,Math.min(newX,window.innerWidth-rect.width-10));
        newY = Math.max(10,Math.min(newY,window.innerHeight-rect.height-10));

        noBtn.style.left = newX+'px';
        noBtn.style.top = newY+'px';
    }
});

noBtn.addEventListener('click', ()=>{
    if(caught) return;
    caught=true;
    cry.classList.add('show');

    const tearsInterval = setInterval(()=>{
        const tear = document.createElement('span');
        tear.textContent='💧';
        tear.style.position='fixed';
        tear.style.top='0';
        tear.style.left=Math.random()*window.innerWidth+'px';
        tear.style.fontSize=(Math.random()*24+16)+'px';
        tear.style.opacity='0.8';
        tear.style.zIndex='10000';
        tear.style.pointerEvents='none';
        tear.style.animation=`fall ${2+Math.random()*2}s linear forwards`;
        document.body.appendChild(tear);
        setTimeout(()=>tear.remove(),4000);
    },250);

    setTimeout(()=>{
        const msg=document.createElement('div');
        msg.textContent='Я очень сильно надеюсь на то, что это просто мисклик 🙂❤️';
        msg.style.position='fixed';
        msg.style.bottom='20px';
        msg.style.left='50%';
        msg.style.transform='translateX(-50%)';
        msg.style.color='#8d7c94';
        msg.style.fontSize='24px';
        msg.style.textAlign='center';
        msg.style.zIndex='10000';
        document.body.appendChild(msg);
    },3000);

    setTimeout(()=>{
        clearInterval(tearsInterval);
        window.close();
    },10000);
});

yesBtn.addEventListener('click', ()=>{
    modal.style.display='flex';
    setTimeout(()=>modal.classList.add('show'),50);

    for(let i=0;i<100;i++){
        const heart=document.createElement('span');
        heart.textContent='❤️';
        heart.style.position='absolute';
        heart.style.bottom='-50px';
        heart.style.left=Math.random()*100+'vw';
        heart.style.fontSize=(Math.random()*20+10)+'px';
        heart.style.color = ['#ff4d6d','#ff758f','#ffffff','#ff9a9e'][Math.floor(Math.random()*4)];
        heart.style.animationDuration=(3+Math.random()*3)+'s';
        heart.style.pointerEvents='none';
        heartsContainer.appendChild(heart);
        setTimeout(()=>heart.remove(),10000);
    }
});

carousels.forEach(wrapper => {
    const track = wrapper.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const prevBtn = wrapper.querySelector('.prev');
    const nextBtn = wrapper.querySelector('.next');
    let index = 0;

    function updateSlide() {
        track.style.transform = `translateX(-${index * 100}%)`;
    }

    prevBtn.addEventListener('click', () => {
        index = (index === 0) ? slides.length - 1 : index - 1;
        updateSlide();
    });

    nextBtn.addEventListener('click', () => {
        index = (index === slides.length - 1) ? 0 : index + 1;
        updateSlide();
    });
});
