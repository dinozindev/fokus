const html = document.querySelector("html");
const focoBtn = document.querySelector(".app__card-button--foco")
const curtoBtn = document.querySelector(".app__card-button--curto")
const longoBtn = document.querySelector(".app__card-button--longo")
const imgBanner = document.querySelector(".app__image")
const titulo = document.querySelector(".app__title")
const btns = document.querySelectorAll('.app__card-button')
const musicToggleInput = document.getElementById("alternar-musica")
const startPauseBtn = document.getElementById("start-pause")
const startPauseBtnText = document.querySelector("#start-pause span")
const startPauseBtnIcon = document.querySelector(".app__card-primary-butto-icon")
const tempoNaTela = document.getElementById("timer")

const musica = new Audio("./sons/luna-rise-part-one.mp3");
const somPausar = new Audio("./sons/pause.mp3");
const somTocar = new Audio("./sons/play.wav");
const somFinalizar = new Audio("./sons/beep.mp3");

// tempo decorrido padrão.
let tempoDecorridoEmSegundos = 1500;

let intervaloId = null;

// deixa a música em um loop infinito. 
musica.loop = true;

// toggler para alterar se a música está tocando ou não. 
musicToggleInput.addEventListener("change", () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

// sempre que cada botão for pressionado, atualiza o tempo na tela com seu valor correspondente, já que temos a function mostrarTempo sendo chamada dentro de alterarContexto. 

focoBtn.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco')
    focoBtn.classList.add('active')
})

curtoBtn.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto')
    curtoBtn.classList.add('active')
})

longoBtn.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo')
    longoBtn.classList.add('active')
})

function alterarContexto(contexto) {
    mostrarTempo()
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
    if (tempoDecorridoEmSegundos <= 0) {
        somFinalizar.play();
        alert("Tempo finalizado")
        zerar()
        return;
    } else {
        tempoDecorridoEmSegundos--
    }
    mostrarTempo()
}

// quando o botão começar/pausar for pressionado, invoca a function iniciarOuPausar
startPauseBtn.addEventListener("click", iniciarOuPausar)

// quando o botão começar for clicado, invoca a function iniciarOuPausar, em que, caso o intervaloId tenha valor, invoca a function zerar(), que pausará a repetição. Caso contrário, irá iniciar a repetição do setInterval, executando a function contagemRegressiva repetidamente. 
function iniciarOuPausar() {
    if (intervaloId) {
        zerar()
        somPausar.play()
    } else {
        somTocar.play()
        intervaloId = setInterval(contagemRegressiva, 1000)
        startPauseBtnText.textContent = "Pausar"
        startPauseBtnIcon.setAttribute("src", "/imagens/pause.png")
    }

}

// quando o tempo decorrido chegar a zero ou o botão pausar for pressionado, invoca a function clearInterval, que irá cancelar a repetição do setInterval a partir de seu identificador intervaloId. 
function zerar() {
    clearInterval(intervaloId)
    startPauseBtnText.textContent = "Começar"
    startPauseBtnIcon.setAttribute("src", "/imagens/play_arrow.png")
    intervaloId = null;
}

// function mostrarTempo recebe o valor do tempo em segundos e converte este valor para um objeto Date, deixando-o em minutos e segundos. Por fim, o mostra na tela com o innerHTML. 
function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString("pt-br", { minute: '2-digit', second: '2-digit' })
    tempoNaTela.innerHTML = `
    ${tempoFormatado}
       `
}

mostrarTempo()