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

    let chromatic = [C4, Db4, D4, Eb4, E4, F4, Gb4, G4, Ab4, A4, Bb4, B4, C5, Db5, D5, Eb5, E5, F5, Gb5,
    G5, Ab5, A5, Bb5, B5];

    let C = [C4, D4, E4, F4, G4, A4, B4, C5, D5, E5, F5, G5, A5, B5], Db = [Db4, Eb4, F4, Gb4, Ab4, Bb4, C5, Db5, Eb5, F5, Gb5, Ab5, Bb5, C6],
    D = [D4, E4, Gb4, G4, A4, B4, Db5, D5, E5, Gb5, G5, A5, B5, Db6], Eb = [Eb4, F4, G4, Ab4, Bb4, C5, D5, Eb5, F5, G5, Ab5, Bb5, C6, D6],
    E = [E4, Gb4, G4, A4, B4, Db5, Eb5, E5, Gb5, G5, A5, B5, Db6, Eb6], F = [F3, G3, A3, Bb3, C4, D4, E4, F4, G4, A4, Bb4, C5, D5, E5],
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
            let note = random_note(variables.scale, variables.octaves);
            while(note == last_note){
                note = random_note(variables.scale, variables.octaves)
            }
            last_note = note;
            return note;
        },
        random: () => {  //método provisório
            let random_index = Math.floor(Math.random() * 24);
            return chromatic[random_index]
        },
        chromatic  //provisório
    }
})()



let chord_manager = (function(){  //futuro módulo de acordes

})()

let playback = (function(){  //módulo responsável pelo playback e stop do áudio
    let notes_played = 0;  //variável privada, mantém registro de quantas notas foram tocadas na última operação(menor ou igual ao o escolhido pelo usuário)
    function stop(note){
        note.pause();
        note.currentTime = 0;
    }
    return{
        play: (sequence, variables) => {
            notes_played = 0;
            let note = sequence[notes_played],
            last_note,
            interval_in_ms = variables.interval * 1000,
            delay = 60; //o delay serve para atrasar um pouco a interrupção da nota anterior a fim de evitar um efeito staccato 
            // function bla(){                       -teste com evento "playing"
            //     console.log("playing");
            //     if(variables.notes > 1){
            //         let sequence_player = setInterval(function(){
            //             note = sequence[notes_played]
            //             note.play()
            //             notes_played++
            //             setTimeout(function(){
            //                 stop(last_note);
            //                 last_note = note;
            //             }, delay)
            //             if(notes_played === variables.notes){
            //                 clearInterval(sequence_player)
            //             }
            //         }, interval_in_ms)
            //     }
            //     note.removeEventListener("playing", bla)
            // }
            function meh(){  //com evento "updatetime"
                console.log("it started")
                if(variables.notes > 1){
                    console.log(note.currentTime)
                    let sequence_player = setInterval(function(){
                        note = sequence[notes_played]
                        note.play()
                        notes_played++
                        setTimeout(function(){
                            stop(last_note);
                            last_note = note;
                        }, delay)
                        if(notes_played === variables.notes){
                            clearInterval(sequence_player)
                        }
                    }, interval_in_ms)
                    note.removeEventListener("timeupdate", meh)
                }
            }
                    
            stop(note)
            note.addEventListener("timeupdate", meh)
            note.play()
            last_note = note
            notes_played++
        },
        
        stop
    }
})()




let UIController = (function(){  //módulo de controle da UI(ainda não está sendo utilizado em maior parte)
    let play_and_stop_button = document.getElementById("button-1"),
    repeat_button = document.getElementById("button-2");
    
    return{
        init_play: () => {
            play_and_stop_button.innerHTML = "Stop";
            //play_and_stop_button.onclick = stop;
            repeat_button.setAttribute('disabled', 'disabled');
            document.querySelectorAll("select").forEach(function(select){
                select.removeAttribute('disabled');
            })
        },

        reset_play: () => {
            play_and_stop_button.innerHTML = "Play";
            //play_and_stop_button.onclick = start;
            repeat_button.removeAttribute('disabled');
        },
        
        init_repeat: () => {
            repeat_button.innerHTML = "Stop";
            //repeat_button.onclick = stop;
            play_and_stop_button.setAttribute('disabled', 'disabled');
            document.querySelectorAll("select").forEach(function(select){
                select.removeAttribute('disabled');
            }) 
        },

        reset_repeat: () => {
            repeat_button.innerHTML = "Repeat";
            //repeat_button.onclick = start;
            play_and_stop_button.removeAttribute('disabled');
        },

        buttons: {
            button1 : play_and_stop_button,
            button2 : repeat_button
        }
    }
})()



let globalController = (function(PlayBack, noteManager){  //módulo principal
    let buttons = document.querySelector("#buttons")

    let variables = {scale: null, octaves: null, notes: null, interval: null, start_with_tonic: null, play_chords: null};
    let sequence = null;

    function playEvent(event){  //evento de reprodução
        let button = event.srcElement.id
        console.log(button)
        switch(button){
            case "buttons":
                console.log("missed!")
                return
            case "button-1":
                if(variables.notes != -1){
                    sequence = noteManager.sequence_generator(variables);

                }
                else{
                    sequence = null;
                }
                PlayBack.play(sequence, variables)
                break;
            case "button-2":  //botão de repeat, ainda por ser implementado
                if(sequence === null){
                    return
                }
                //PlayBack.play(sequence, variables)
            }
        buttons.removeEventListener("click", playEvent)
        console.log("removed")
        buttons.addEventListener("click", stopEvent)
        
    }
    function stopEvent(event){  //evento de interrupção
        let button = event.srcElement.id
        console.log("stop")
        switch(button){
            case "buttons":
                return
        }
        buttons.removeEventListener("click", stopEvent)
        buttons.addEventListener("click", playEvent)
    }
    function updateVariables(){  //atualiza variáveis essenciais
        variables.scale = document.getElementById("scale").value;
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
        getSequence: () => {  //idem
            return sequence
        },

        init: () => {  //método de inicialização
            buttons.addEventListener("click", playEvent)
            updateVariables()
            document.querySelectorAll(".custom-select, #checkboxes").forEach(function(select){
                select.addEventListener("change", updateVariables)
            })
        }
    }
    
    


})(playback, note_manager)


globalController.init()

// let button = document.getElementById("button-1")
// let note;
// button.addEventListener("click", function(){
//     note = note_manager.random()
//     note.load()
//     note.addEventListener("canplaythrough", function(){
//         console.log("ready to play")
//         note.play()
//     })
// })
