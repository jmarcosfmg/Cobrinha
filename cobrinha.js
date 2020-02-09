class Cobra{ 
    constructor(){
        this.tamanho = 2;
        this.direcao = 1; //1 = cima, 2 = dir, 3 = baixo, 4 = esq;
        this.corpo = [];
        this.passo = 50;
        var altura = alturaCanv/2;
        var largura = larguraCanv /2;
        this.cabeca = {x:largura, y:altura};
        var canvas = document.getElementById('tela');
        var context = canvas.getContext('2d');
        context.fillStyle = 'darkolivegreen';
        context.fillRect(this.cabeca.x, this.cabeca.y, grid, grid);
        this.corpo.push({x: largura, y:altura - 50});
        context.fillRect(largura,altura - 50, grid, grid);
    }

    pontua(){
        let adder = document.getElementById("pontuacao");
        adder.innerHTML = parseInt(adder.innerHTML,10) + 1;
    }

    verificaCorpo(x, y){
        for(var i = 0; i<this.corpo.length -1; i++){
            var pad = this.corpo[i];
            if(pad.x == x && pad.y == y) return true;
        }
        return false;
    }
    anda(){
        var {x,y} = cobrinha.cabeca;
        switch(this.direcao){
            case 1: 
                y -=this.passo;
                break;
            case 2:
                x+=this.passo;
                break;
            case 3:
                y+=this.passo;
                break;
            case 4:
                x-=this.passo;
        }
        if(x<0 || x>= larguraCanv || y< 0 || y>= alturaCanv) return morre();
        
        if (this.verificaCorpo(x,y) === true) return morre();
        this.corpo.unshift({x:this.cabeca.x,y:this.cabeca.y});
        this.cabeca = {x:x,y:y}
        if(maca.x == x && maca.y == y){
            cobrinha.tamanho++;
            this.pontua();
            desenhaMaca();
            return {x:0,y:0};
        }
        else return this.corpo.pop();
    }

}

   //colocar menu de cores
        // fazer menuzinho inicial
        //
        var maca = {x:0,y:0};
        var alturaCanv;
        var larguraCanv;
        var cobrinha;
        var grid;
        var inter;
        var corMaca = "#222a12";
        var corFundo = "darkolivegreen";
        var corCobra = "black";

        function proporcoes(){
            var canvas = document.getElementById("tela");
            canvas.clientWidth = canvas.clientHeight;
            alturaCanv = canvas.height;
            larguraCanv = canvas.width;          
        }
        document.addEventListener("keydown", function (m){
            var {x,y} = cobrinha.cabeca;
            if(m.key === "ArrowUp"){
                if(cobrinha.direcao != 3) cobrinha.direcao = 1;
            }
            else if (m.key ==="ArrowDown"){
                if(cobrinha.direcao != 1) cobrinha.direcao = 3;
            }
            else if(m.key === "ArrowLeft"){
                if(cobrinha.direcao != 2) cobrinha.direcao = 4;
            }
            else if(m.key === "ArrowRight"){
                if(cobrinha.direcao != 4) cobrinha.direcao = 2;
            }
            //document.getElementById("titulo").innerHTML = m.key;
        });

        function desenhaMaca(){
            maca.x = Math.floor(Math.random()*42) * 50;
            maca.y = Math.floor(Math.random()*42) * 50;
            if(cobrinha.verificaCorpo(maca.x,maca.y) === false){
                var canvas = document.getElementById('tela');
                var context = canvas.getContext('2d');
                context.fillStyle = corMaca;
                context.fillRect(maca.x, maca.y, grid, grid);
                return;
            }
            else return desenhaMaca();
        }

        function colore(ult){
            var canvas = document.getElementById('tela');
            var context = canvas.getContext('2d');
            context.fillStyle = corCobra;
            context.fillRect(cobrinha.cabeca.x, cobrinha.cabeca.y, grid, grid);
            context.fillStyle = corFundo;
            var {x,y} = ult;
            context.fillRect(x, y, grid, grid);
        }

        function coloreEInicia(callback){

        }

        window.onload = () => {
                proporcoes();
                cobrinha = new Cobra();
                window.screenTop = 0;
                document.getElementById("tela").style.backgroundColor = corFundo;
                grid = cobrinha.passo;
                desenhaMaca();
        }

        function recomeca(){
            location.reload();
        }

        function iniciaJogo(){
            let divInicial = document.getElementById("divInicial");
            divInicial.classList.toggle('divModalAtivo');
            divInicial.classList.toggle('divModalInativo');
            let divJogo = document.getElementById("corpo");
            divJogo.classList.toggle('divModalAtivo');
            divJogo.classList.toggle('divModalInativo');
            setTimeout(function(){ 
                inter = window.setInterval(() => {
                var ult = cobrinha.anda();
                this.colore(ult);
        }, 120) }, 1);
        }
        function morre(){
            let label = document.getElementById("pontuacaoFinal");
            label.innerHTML = label.innerHTML + document.getElementById("pontuacao").innerHTML;
            let divJogo = document.getElementById("corpo");
            divJogo.classList.toggle('divModalAtivo');
            divJogo.classList.toggle('divModalInativo');
            let divFinal = document.getElementById("divFinal");
            divFinal.classList.toggle('divModalAtivo');
            divFinal.classList.toggle('divModalInativo');
            clearInterval(inter);
        }
        //167