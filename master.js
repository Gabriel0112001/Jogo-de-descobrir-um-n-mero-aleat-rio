//vetor de escopo global que armazenará os erros.
var erros = [];

//número gerado aleatoriamente 
var sorteado = Math.floor((Math.random() * 100) + 1);

//número de chances
const CHANCES = 6;

function apostarNumero() {
    //cria referencia aos campos e obtém seus conteúdos 
    const inNumero = document.getElementById("inNumero");
    const numero = Number(inNumero.value);
    
    //validar o valor obtido
    if (numero == `` || isNaN(numero) || numero < 1 || numero > 100) {
        alert(`Informe um número válido.`)
        inNumero.focus()
        return
    }
    
    //saída de dados (referencia)
    const outDica = document.getElementById("outDica");
    const outErros = document.getElementById("outErros");
    const outChances = document.getElementById("outChances");
    
    //processamento (se a aposta estiver correta) 
    if (numero === sorteado) {
        alert(`Parabéns! Você acertou.\nResposta: ${sorteado}.`)
        //troca status dos botões
        btAposta.disabled = true;
        btJogar.className = "exibe";
        outDica.textContent = `Parabéns! Número sorteado: ${sorteado}.`
    } else {
        if (erros.indexOf(numero) >= 0) {
            alert(`Você já apostou o número ${numero}. \nTente Outro.`);
            
        } else {
            erros.push(numero)      //adiciona o número ao index
            var numErros = erros.length //obtém tamanho do vetor
            var numChances = CHANCES - numErros //cálculo de números de tentativas 
            //exibe o número de erros, conteúdo do vetor e número de tentativas
            outErros.textContent = `${numErros} (${erros.join(`, `)})`
            outChances.textContent = numChances;
            if (numChances == 0) {
                alert(`Suas tentativas acabaram.`)
                btAposta.disabled = true;
                btJogar.className = `exibe`;
                outDica.textContent = `Game Over. Número sorteado: ${sorteado}`;
            } else {
                var dica = numero < sorteado ? "maior" : "menor";
                outDica.textContent = `Dica: Tente um número ${dica} que ${numero}`
            }
        }
    }
    //limpa campos de entrada e posiciona o cursor 
    inNumero.value = ``;
    inNumero.focus()
}

function jogarNovamente() {
    location.reload()
}

const btJogarNovamente = document.getElementById("btJogar")
btJogarNovamente.addEventListener("click", jogarNovamente)

const btApostar = document.getElementById("btAposta")
btApostar.addEventListener("click", apostarNumero)