        let G3 = 196,
            A3 = 220,
            B3 = 246.9,
            C4 = 261.6,
            D4 = 293.7,
            E4 = 329.6,
            F4 = 349.2,
            G4 = 393,
            A4 = 440,
            B4 = 493.9,
            C5 = 523.3;
            //ainda restam várias notas
        const freq = [G3,A3,B3,C4,D4,E4,F4,G4,A4,B4,C5]
        let context,
	        oscillator,
            contextGain,
            type = 'sine',
            frequency;
            //onda senoidal, experimentar outros tipos de onda
        function start(){
	        context = new AudioContext();
	        oscillator = context.createOscillator();
            contextGain = context.createGain();
            oscillator.frequency.value = frequency;
            oscillator.type = type;
            oscillator.connect(contextGain);
	        contextGain.connect(context.destination);
	        oscillator.start(0);
        }//função start cria a instância de AudioContext e inicia o oscilador
        function stop(){
            start()
            contextGain.gain.exponentialRampToValueAtTime(
  	0.00001, context.currentTime + 2
	)
        }//função stop chama a função start e interrompe o som de maneira exponencial
        function freq_generator(){
            return freq[Math.floor(Math.random()*freq.length)]
        }//gerador aleatório de frequências dentro do array freq
        function generator(){
            for(i=1;i<6;i++){
                setTimeout(function(){
                    frequency = freq_generator()
                    stop()
                },1000*i)
            }
        }//loop for com 6 iterações e um timeout de 1 segundo gerando notas aleatórias. Necessário ajustar isso à funcionalidade
        //pretendida de escolha do número de iterações, loop infinito deve ser uma opção também 
        document.addEventListener('DOMContentLoaded',function(){
            const button = document.querySelector('#Btn')
        button.addEventListener('click', function(){
            generator()
        })})