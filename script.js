function nextPage(pageNumber){

    document.querySelectorAll(".page").forEach(page=>{
        page.classList.remove("active");
    });

    document.getElementById("page"+pageNumber).classList.add("active");

    if(pageNumber === 2){
        document.getElementById("music").play();
    }

}

const noBtn = document.getElementById("noBtn");

if(noBtn){

    noBtn.addEventListener("mouseover",()=>{

        const maxX = window.innerWidth - 250;
        const maxY = 200;

        const x = Math.random() * maxX;
        const y = Math.random() * maxY;

        noBtn.style.left = x + "px";
        noBtn.style.top = y + "px";

    });

}
function createHeart(){

    const heart=document.createElement("div");
    
    heart.classList.add("heart");
    
    heart.innerHTML="💖";
    
    heart.style.left=Math.random()*100+"%";
    
    heart.style.animationDuration=
    (4+Math.random()*4)+"s";
    
    document.body.appendChild(heart);
    
    setTimeout(()=>{
    heart.remove();
    },8000);
    
    }
    
    setInterval(createHeart,500);
   
        // ==========================
//      Birthday Cake
// ==========================

async function startMic(){

    try{

        const stream = await navigator.mediaDevices.getUserMedia({
            audio:true
        });

        const audioContext = new AudioContext();

        const microphone =
        audioContext.createMediaStreamSource(stream);

        const analyser =
        audioContext.createAnalyser();

        analyser.fftSize = 512;

        microphone.connect(analyser);

        const data = new Uint8Array(analyser.frequencyBinCount);

        function checkBlow(){

            analyser.getByteFrequencyData(data);

            let volume = 0;

            for(let i=0;i<data.length;i++){

                volume += data[i];

            }

            volume /= data.length;

            // لو النفخة قوية
            if(volume > 40){

                document
                .querySelectorAll(".flame")
                .forEach(f=>{

                    f.classList.add("off");

                });

                launchConfetti();

                document.getElementById("continueCake")
                .style.display="inline-block";

                stream.getTracks().forEach(track=>track.stop());

                return;

            }

            requestAnimationFrame(checkBlow);

        }

        checkBlow();

    }

    catch(err){

        alert("Please allow microphone access ❤️");

    }

}

// ==========================
//       Confetti
// ==========================



function launchConfetti(){

    const colors = [
        "#ff4f9d",
        "#ff9ec9",
        "#ffd166",
        "#ffffff",
        "#ff7eb3"
    ];

    for(let i=0;i<180;i++){

        const piece = document.createElement("div");

        piece.style.position="fixed";
        piece.style.left=Math.random()*100+"vw";
        piece.style.top="-20px";

        piece.style.width=(6+Math.random()*8)+"px";
        piece.style.height=(10+Math.random()*10)+"px";

        piece.style.background=
        colors[Math.floor(Math.random()*colors.length)];

        piece.style.borderRadius="3px";

        piece.style.zIndex="9999";

        piece.style.pointerEvents="none";

        piece.style.transition=
        (3+Math.random()*2)+"s linear";

        document.body.appendChild(piece);

        const x=(Math.random()-0.5)*300;

        const rotate=Math.random()*720;

        setTimeout(()=>{

            piece.style.transform=
            `translate(${x}px,${window.innerHeight+200}px)
             rotate(${rotate}deg)`;

            piece.style.opacity="0";

        },30);

        setTimeout(()=>{

            piece.remove();

        },5000);

    }

}