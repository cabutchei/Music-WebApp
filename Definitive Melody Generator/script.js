let note_manager = (function(){  //módulo de gerenciamento de notas
    let F3 = new Audio("notes/F3.mp3"), Gb3 = new Audio("notes/Gb3.mp3"), G3 = new Audio("notes/G3.mp3"), Ab3 = new Audio("notes/Ab3.mp3"),
    A3 = new Audio("notes/A3.mp3"), Bb3 = new Audio("notes/Bb3.mp3"), B3 = new Audio("notes/B3.mp3"), C4 = new Audio("notes/C4.mp3"),
    Db4 = new Audio("notes/Db4.mp3"), D4 = new Audio("notes/D4.mp3"), Eb4 = new Audio("notes/Eb4.mp3"), E4 = new Audio("notes/E4.mp3"),
    F4 = new Audio("notes/F4.mp3"), Gb4 = new Audio("notes/Gb4.mp3"), G4 = new Audio("notes/G4.mp3"), Ab4 = new Audio("notes/Ab4.mp3"),
    A4 = new Audio("notes/A4.mp3"), Bb4 = new Audio("notes/Bb4.mp3"), B4 = new Audio("notes/B4.mp3"), C5 = new Audio("notes/C5.mp3"),
    Db5 = new Audio("notes/Db5.mp3"), D5 = new Audio("notes/D5.mp3"), Eb5 = new Audio("notes/Eb5.mp3"), E5 = new Audio("notes/E5.mp3"),
    F5 = new Audio("notes/F5.mp3"), Gb5 = new Audio("notes/Gb5.mp3"), G5 = new Audio("notes/G5.mp3"), Ab5 = new Audio("notes/Ab5.mp3"),
    A5 = new Audio("notes/A5.mp3"), Bb5 = new Audio("notes/Bb5.mp3"), B5 = new Audio("notes/B5.mp3"), C6 = new Audio("notes/C6.mp3"),
    Db6 = new Audio("notes/Db6.mp3"), D6 = new Audio("notes/D6.mp3"), Eb6 = new Audio("notes/Eb6.mp3");

    F3.id = "F3"; Gb3.id = "Gb3"; G3.id = "G3"; Ab3.id = "Ab3"; A3.id = "A3"; Bb3.id = "Bb3"; B3.id = "B3"; C4.id = "C4"; Db4.id = "Db4";
    D4.id = "D4"; Eb4.id = "Eb4"; E4.id = "E4"; F4.id = "F4"; Gb4.id = "Gb4"; G4.id = "G4"; Ab4.id = "Ab4"; A4.id = "A4"; Bb4.id = "Bb4";
    B4.id = "B4"; C5.id = "C4"; Db5.id = "Db4"; D5.id = "D4"; Eb5.id = "Eb4"; E5.id = "E4"; F5.id = "F4"; G5.id = "G4"; Ab5.id = "Ab4";
    A5.id = "A5"; Bb5.id = "Bb5"; B5.id = "B5"; C6.id = "C6"; Db6.id = "Db6"; D6.id = "D6"; Eb6.id = "Eb6";  

    let chromatic = [C4, Db4, D4, Eb4, E4, F4, Gb4, G4, Ab4, A4, Bb4, B4, C5, Db5, D5, Eb5, E5, F5, Gb5,
    G5, Ab5, A5, Bb5, B5];

    let C = [C4, D4, E4, F4, G4, A4, B4, C5, D5, E5, F5, G5, A5, B5], Db = [Db4, Eb4, F4, Gb4, Ab4, Bb4, C5, Db5, Eb5, F5, Gb5, Ab5, Bb5, C6],
    D = [D4, E4, Gb4, G4, A4, B4, Db5, D5, E5, Gb5, G5, A5, B5, Db6], Eb = [Eb4, F4, G4, Ab4, Bb4, C5, D5, Eb5, F5, G5, Ab5, Bb5, C6, D6],
    E = [E4, Gb4, Ab4, A4, B4, Db5, Eb5, E5, Gb5, G5, A5, B5, Db6, Eb6], F = [F3, G3, A3, Bb3, C4, D4, E4, F4, G4, A4, Bb4, C5, D5, E5],
    Gb = [Gb3, Ab3, Bb3, B3, Db4, Eb4, F4, Gb4, Ab4, Bb4, B4, Db5, Eb5, F5], G = [G3, A3, B3, C4, D4, E4, Gb4, G4, A4, B4, C5, D5, E5, Gb5],
    Ab = [Ab3, Bb3, C4, Db4, Eb4, F4, G4, Ab4, Bb4, C5, Db5, Eb5, F5, G5], A = [A3, B3, Db4, D4, E4, Gb4, Ab4, A4, B4, Db5, D5, E5, Gb5, Ab5],
    Bb = [Bb3, C4, D4, Eb4, F4, G4, A4, Bb4, C5, D5, Eb5, F5, G5, A5], B = [B3, Db4, Eb4, E4, Gb4, Ab4, Bb4, B4, Db5, Eb5, E5, Gb5, Ab5, Bb5]; 

    let scales = [C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B]

    let last_note = null  //variável privada, mantém registro da última nota escolhida em caso de infinito
    function random_note(scale, octaves){
        let random_index, note;
        if(scale === -1){
            random_index = Math.floor(Math.random() * 12 * octaves);
            note = chromatic[random_index];
        }
        else{
            random_index = Math.floor(Math.random() * 7 * octaves);
            note = scales[scale][random_index];  
        }
        return note
    }
    
    return {
        sequence_generator: variables => {  //gera um array de notas de acordo com os parâmetros escolhidos
            let sequence = [],
            note;
            if(variables.scale === -1){
                for(let i = 0 ; i < variables.notes; i++){  
                    note = random_note(variables.scale, variables.octaves)
                    if(i > 0){
                        while(note[i] === note[i - 1]){
                            note = random_note(variables.scale, variables.octaves)
                        }
                    sequence.push(note);
                    }
            }
        }
            else{
                for(let i = 0 ; i < variables.notes; i++){
                    if(i === 0 && variables.start_with_tonic){
                        note = scales[variables.scale][0];
                    }
                    else{
                        note = random_note(variables.scale, variables.octaves)   
                    }
                    if(i > 0){
                        while(note === sequence[i - 1]){
                            note = random_note(variables.scale, variables.octaves)
                    }
                }
                sequence.push(note)
            }
            return sequence
        }
        },
        note_generator: variables => {  //gera uma nota aleatória de acordo com os parâmetros escolhidos(para uso em caso de infinito)
            let note;
            console.log(last_note)
            if(last_note === null && variables.scale != -1 && variables.start_with_tonic){
                note = scales[variables.scale][0];
            }
            else{
                note = random_note(variables.scale, variables.octaves)
                while(note == last_note){
                    console.log(3)
                    note = random_note(variables.scale, variables.octaves)
                }
                last_note = note
            }
            return note;
        },
        chromatic,  //provisório
        get_last_note: () => last_note,
        reset_last_note: () => {last_note = null;console.log("reset")}
    }
})()



let chord_manager = (function(){  //futuro módulo de acordes

})()

let UIController = (function(){  //módulo de controle da UI
    let play_and_stop_button = document.getElementById("button-1"),
    repeat_button = document.getElementById("button-2");
    
    return{
        init_play: () => {
            play_and_stop_button.innerHTML = "Stop";
            repeat_button.setAttribute('disabled', 'disabled');
            document.querySelectorAll("select").forEach(function(select){
                select.setAttribute('disabled', 'disabled');
            })
        },

        reset_play: () => {
            play_and_stop_button.innerHTML = "Play";
            repeat_button.removeAttribute('disabled');
            document.querySelectorAll("select").forEach(function(select){
                select.removeAttribute('disabled');
            })
        },
        
        init_repeat: () => {
            repeat_button.innerHTML = "Stop";
            play_and_stop_button.setAttribute('disabled', 'disabled');
            document.querySelectorAll("select").forEach(function(select){
                select.setAttribute('disabled', 'disabled');
            }) 
        },

        reset_repeat: () => {
            repeat_button.innerHTML = "Repeat";
            play_and_stop_button.removeAttribute('disabled');
            document.querySelectorAll("select").forEach(function(select){
                select.removeAttribute('disabled');
            })
        }
    }
})()

let playback = (function(noteManager, UICtrl){  //módulo responsável pelo playback e stop do áudio
    let notes_played = 0, //variável privada, mantém registro de quantas notas foram tocadas na última operação(menor ou igual ao o escolhido pelo usuário)
    sequence = null,  //sequência pré definida de notas, é setada pelo controlador global e gerada pelo note manager
    loop,  //variável responsável por guardar o loop i.e. o setInterval 
    last_played_note = null;  //guarda a última nota reproduzida no último playback
    
    function stop(note){
        note.pause();
        note.currentTime = 0;
    }
    function kill_loop(){
        clearInterval(loop);
    }

    return{
        play: (variables, button, swapEvent) => {
            notes_played = 0;
            let note,
            lingering_note, //guarda a nota anterior, que soa por um curto período de tempo junto da atual
            interval_in_ms = variables.interval * 1000,
            delay = 60; //o delay serve para atrasar um pouco a interrupção da nota anterior(lingering_note) a fim de evitar um efeito staccato 

            function def_note(){ //define note de acordo com os parâmetros
                if(variables.notes === -1){
                    note = noteManager.note_generator(variables)
                }
                else{
                    note = sequence[notes_played]
                    console.log(sequence)
                }
            }

            def_note()
            if(variables.notes > 1 || variables.notes === -1){ //restrição de start_loop
                note.addEventListener("timeupdate", start_loop);
            }
            note.play();
            notes_played++;
            last_played_note = note;
            lingering_note = note;
          
            function start_loop(){  //dá início ao loop e remove o event listener
                note.removeEventListener("timeupdate", start_loop)
                loop = setInterval(function(){
                    def_note();
                    console.log(note)
                    note.play();
                    notes_played++;
                    last_played_note = note;
                    if(sequence != null && notes_played === sequence.length){
                        console.log("time to stop");
                        kill_loop();
                        if(button === "button-1"){
                            UICtrl.reset_play()
                        }
                        else if(button === "button-2"){
                            UICtrl.reset_repeat()
                        }
                        swapEvent()
                    }
                    setTimeout(function(){
                        stop(lingering_note);
                        lingering_note = note;
                    }, delay)
                }, interval_in_ms)
            }
        },
        
        stop,
        
        kill_loop,

        get_sequence: () => {
            return sequence
        },

        set_sequence: (sq) => {
            sequence = sq
        },

        get_notes_played: () => {
            return notes_played
        },
        get_last_played_note: () => {
            return last_played_note
        }
    }
})(note_manager, UIController)



let globalController = (function(PlayBack, noteManager, UICtrl){  //módulo principal
    let buttons = document.querySelector("#buttons")

    let variables = {scale: null, octaves: null, notes: null, interval: null, start_with_tonic: null, play_chords: null};

    function swap(){ 
        buttons.removeEventListener("click", playEvent) 
        console.log("removed")
        buttons.addEventListener("click", stopEvent)
    }

    function swap_back(){ 
        buttons.removeEventListener("click", stopEvent)
        buttons.addEventListener("click", playEvent)   
    }
    //swap e swap_back alternam event listeners

    function playEvent(event){  //evento de reprodução, compartilhado entre os dois botões
        let button = event.srcElement.id
        console.log(button)
        let last_played_note = PlayBack.get_last_played_note()
        switch(button){
            case "buttons":
                console.log("missed!")
                return
            case "button-1":  //botão de play
                if(variables.notes != -1){
                    noteManager.reset_last_note()
                    PlayBack.set_sequence(noteManager.sequence_generator(variables));
                }
                else{
                    PlayBack.set_sequence(null);
                }
                if(variables.notes > 1 || variables.notes === -1){
                    UICtrl.init_play()
                }
                break;
            case "button-2":  //botão de repeat
                let sequence = PlayBack.get_sequence()
                if(sequence === null){  //botão repeat nada executa se a variável sequência for nula
                    return
                }
                if(variables.notes > 1 || variables.notes === -1){
                    UICtrl.init_repeat()
                }
            }
        if(last_played_note != null){
            PlayBack.stop(last_played_note)  //interrompe e reseta a última nota da última operação
        }
        PlayBack.play(variables, button, swap_back)
        swap()
        
    }
    function stopEvent(event){  //evento de interrupção
        let button = event.srcElement.id

        switch(button){
            case "buttons":
                console.log("missed")
                return
            case "button-1":
                UICtrl.reset_play();
                if(variables.notes != -1){
                    let sequence = PlayBack.get_sequence(),
                    notes_played = PlayBack.get_notes_played();
                    if(notes_played < variables.notes){
                        interrupted_sequence = sequence.slice(0, notes_played);
                        PlayBack.set_sequence(interrupted_sequence);  //atualiza a sequência em caso de interrupção precoce pelo usuário
                    }
                }
                break;
            case "button-2":
                UICtrl.reset_repeat();
        }

        console.log("stop")
        PlayBack.kill_loop()
        swap_back()
    }
    
    function updateVariables(){  //atualiza variáveis essenciais
        variables.scale = parseInt(document.getElementById("scale").value);
        variables.octaves = parseInt(document.getElementById("octaves").value);
        variables.notes = parseInt(document.getElementById("notes").value);
        variables.interval = parseFloat(document.getElementById("interval").value);
        variables.start_with_tonic = document.getElementById("tonic").checked;
        variables.play_chords = document.getElementById("harmony").checked;
        console.log("updated")
    }


    return {
        updateVariables,
        
        getVariables: () => {  //método provisório
            return variables
        },
        
        init: () => {  //método de inicialização
            buttons.addEventListener("click", playEvent)
            updateVariables()
            document.querySelectorAll(".custom-select, #checkboxes").forEach(function(select){
                select.addEventListener("change", updateVariables)
            })
        }
    }
    
    


})(playback, note_manager, UIController)


globalController.init()

