// MIT License 
// Copyright (c) 2020 Luis Espino

function reflex_agent(location, state) {
    if (state == "DIRTY") return "CLEAN";
    else if (location == "A") return "RIGHT";
    else if (location == "B") return "LEFT";
}

let visitedStates = new Set();

function getStateString(states) {
    return `${states[0]} ${states[1]}--${states[2]}`;
}

function test(states) {
    var location = states[0];
    var state = (location == "A") ? states[1] : states[2];
    var action_result = reflex_agent(location, state);

    //  estado como visitado
    let stateString = getStateString(states);
    if (!visitedStates.has(stateString)) {
        visitedStates.add(stateString);
        document.getElementById("log").innerHTML += `<br>Estado Visitado: ${stateString}`;
    }

    // Aplicar la acción
    if (action_result == "CLEAN") {
        if (location == "A") states[1] = "CLEAN";
        else if (location == "B") states[2] = "CLEAN";
    } else if (action_result == "RIGHT") {
        states[0] = "B";
    } else if (action_result == "LEFT") {
        states[0] = "A";
    }

    let next_states = [
        ["A", "DIRTY", "DIRTY"],
        ["A", "CLEAN", "DIRTY"],
        ["A", "DIRTY", "CLEAN"],
        ["A", "CLEAN", "CLEAN"],
        ["B", "DIRTY", "DIRTY"],
        ["B", "CLEAN", "DIRTY"],
        ["B", "DIRTY", "CLEAN"],
        ["B", "CLEAN", "CLEAN"],
    ];

    for (let new_state of next_states) {
        let newStateString = getStateString(new_state);
        if (!visitedStates.has(newStateString)) {
            setTimeout(() => test(new_state), 1000);
            return;
        }
    }

    // Si ya visitó los 8 estados, se detiene
    if (visitedStates.size === 8) {
        document.getElementById("log").innerHTML += "<br><b>8 estados visitados- Programa detenido</b>";
    }
}

var states = ["A", "DIRTY", "DIRTY"];
test(states);
