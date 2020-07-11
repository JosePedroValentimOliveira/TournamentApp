

let roundForm = document.getElementById('round');
let resultForm = document.getElementById('radioResult');
let resultButton = document.getElementById('writeToFile');

roundForm.addEventListener('submit', (e) => {
    e.preventDefault();
    pairings.textContent = "";
    resultForm.textContent = "";
    displayPairings(roundForm[0].value);


})

resultButton.addEventListener('click', () => {
    let allResults = document.querySelectorAll("#radioResult div label:nth-of-type(odd)");
    let resultaten = document.querySelectorAll("#radioResult div input:checked");
    let counter = 0;
    let fileData = [];
    for (let index = 0; index < allResults.length; index+=2) {

        fileData.push({"player1":allResults[index].textContent,"player2":allResults[index+1].textContent,"result":resultaten[counter].value})
        counter++;
    }

    
    

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(fileData)
    }

    fetch('/write-file', options);

})


let rooms = ["Colosseo", "El Jem", "Aventicum", "Cagliari", "Leptis Magna", "Caerleon"];
let pairings = document.getElementById('rounds');

//makes all possible pairings
function makeRoundRobinPairings(players) {
    if (players.length % 2 == 1) {
        players.push({ ign: 'Bye' });
    }

    const playerCount = players.length;
    const rounds = playerCount - 1;
    const half = playerCount / 2;

    const tournamentPairings = [];

    const playerIndexes = players.map((_, i) => i).slice(1);


    for (let round = 0; round < rounds; round++) {
        const roundPairings = [];

        const newPlayerIndexes = [0].concat(playerIndexes);


        const firstHalf = newPlayerIndexes.slice(0, half);
        const secondHalf = newPlayerIndexes.slice(half, playerCount).reverse();

        for (let i = 0; i < firstHalf.length; i++) {
            roundPairings.push({
                white: players[firstHalf[i]],
                black: players[secondHalf[i]],
            });
        }

        // rotating the array
        playerIndexes.push(playerIndexes.shift());
        tournamentPairings.push(roundPairings);
    }

    return tournamentPairings;
}




let displayPairings = (roundNr) => {
    let div = document.createElement('div');


    let i = 0;
    let roundTitel = document.createElement("h2");
    roundTitel.textContent = `Round ${roundNr}`;
    div.appendChild(roundTitel);
    let matchNr = 1;
    makeRoundRobinPairings(players)[roundNr - 1].forEach((matchup) => {

        displayResults(matchup, matchNr);
        matchNr++
        let room = document.createElement('p');
        room.textContent = `voicechat: ${rooms[i]}`;
        i++

        let playerA = document.createElement('input');
        let playerB = document.createElement('input');
        let p = document.createElement('label');
        let br = document.createElement('br');

        p.textContent = " Vs ";
        p.style.margin = "10px";
        playerA.style.width = "30%";
        playerB.style.width = "30%";
        playerA.value = matchup.white.ign;
        playerB.value = matchup.black.ign;
        playerA.readOnly = true;
        playerB.readOnly = true;
        div.style.marginBottom = "2.5rem";

        div.appendChild(room);
        div.appendChild(playerA);
        div.appendChild(p);
        div.appendChild(playerB);
        div.appendChild(br);

    });

    pairings.appendChild(div);


}

let displayResults = (matchup, matchNr) => {
    let matchDiv = document.createElement('div');
    let lblPlayerA = document.createElement('label');
    let lblPlayerB = document.createElement('label');
    let lblTie = document.createElement('label');

    let inpPlayerA = document.createElement('input');
    let inpPlayerB = document.createElement('input');
    let inpTie = document.createElement('input');

    inpPlayerA.setAttribute('type', "radio");
    inpPlayerB.setAttribute('type', "radio");
    inpTie.setAttribute('type', "radio");

    inpPlayerA.setAttribute('name', `match${matchNr}`);
    inpPlayerB.setAttribute('name', `match${matchNr}`);
    inpTie.setAttribute('name', `match${matchNr}`);

    inpPlayerA.value = matchup.white.ign;
    inpPlayerB.value = matchup.black.ign;
    inpTie.value = "tie";

    inpPlayerA.id = matchup.white.ign;
    inpPlayerB.id = matchup.black.ign;
    inpTie.id = "tie";

    lblPlayerA.textContent = matchup.white.ign;
    lblPlayerB.textContent = matchup.black.ign;
    lblTie.textContent = "Tie"

    lblPlayerA.setAttribute('for', matchup.white.ign);
    lblPlayerB.setAttribute('for', matchup.black.ign);
    lblTie.setAttribute('for', "tie");

    matchDiv.appendChild(lblPlayerA); matchDiv.appendChild(inpPlayerA);
    matchDiv.appendChild(lblTie); matchDiv.appendChild(inpTie);
    matchDiv.appendChild(lblPlayerB); matchDiv.appendChild(inpPlayerB);





    resultForm.appendChild(matchDiv);


}



