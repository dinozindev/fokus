const html = document.querySelector("html");
const focoBtn = document.querySelector(".app__card-button--foco")
const curtoBtn = document.querySelector(".app__card-button--curto")
const longoBtn = document.querySelector(".app__card-button--longo")
const imgBanner = document.querySelector(".app__image")
const titulo = document.querySelector(".app__title")
const btns = document.querySelectorAll('.app__card-button')
const startPauseBtn = document.getElementById("start-pause")
const musicToggleInput = document.getElementById("alternar-musica")

const musica = new Audio("./sons/luna-rise-part-one.mp3");
const somPausar = new Audio("./sons/pause.mp3");
const somTocar = new Audio("./sons/play.wav");
const somFinalizar = new Audio("./sons/beep.mp3");


let tempoDecorridoEmSegundos = 5;
let intervaloId = null;

musica.loop = true;

musicToggleInput.addEventListener("change", () => {
    if(musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

focoBtn.addEventListener("click", () => {
   alterarContexto('foco')
   focoBtn.classList.add('active')
})

curtoBtn.addEventListener("click", () => {
   alterarContexto('descanso-curto')
    curtoBtn.classList.add('active')
})

longoBtn.addEventListener("click", () => {
    alterarContexto('descanso-longo')
    longoBtn.classList.add('active')
})

function alterarContexto(contexto) {
    html.setAttribute('data-contexto', contexto)
    imgBanner.setAttribute('src', `/imagens/${contexto}.png`)
    btns.forEach(btn => {
      btn.classList.remove('active')  
    })
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
        default:
            break;
    }
}

// function a ser repetida, em que, a cada 1 seg, diminui 1 do valor de tempoDecorridoEmSegundos. Caso o valor chegue a 0, para a repetição e alerta que o tempo acabou. 
const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0) {
        zerar()
        somFinalizar.play();
        alert("Tempo finalizado")
        return;
    } else {
     tempoDecorridoEmSegundos--   
    }
    
    console.log('Temporizador:' + tempoDecorridoEmSegundos, intervaloId)
}

// quando o botão começar/pausar for pressionado, invoca a function iniciarOuPausar
startPauseBtn.addEventListener("click", iniciarOuPausar)

// quando o botão começar for clicado, invoca a function iniciarOuPausar, em que, caso o intervaloId tenha valor, invoca a function zerar(), que pausará a repetição. Caso contrário, irá iniciar a repetição do setInterval, executando a function contagemRegressiva repetidamente. 
function iniciarOuPausar() {
    if(intervaloId) {
        zerar()
        somPausar.play()
    } else {
        somTocar.play()
     intervaloId = setInterval(contagemRegressiva, 1000)   
    }
    
}

// quando o tempo decorrido chegar a zero ou o botão pausar for pressionado, invoca a function clearInterval, que irá cancelar a repetição do setInterval a partir de seu identificador intervaloId. 
function zerar() {
    clearInterval(intervaloId)
    intervaloId = null;
}