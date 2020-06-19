let pairings = document.getElementById('pairings');
let pairs = [];
let makePairing = () => {
    if (players.length % 2 == 1) {
        players.push({
            ign: "Bye"
        });
    }
    for (let i = 0; i < players.length; i++) {
        for (let j = i + 1; j < players.length; j++) {
            let matchup = [];
            matchup.push(players[i].ign);
            matchup.push(players[j].ign);
            pairs.push(matchup);
        }
    }
    console.log(pairs);
}


makePairing();
let rounds = players.length - 1;
let roundStart = (roundnr) => {
    let roundMatchups = [];
    if (pairs.length != 0) {
        let aanwezig;
        let verwijderen = [];
        for (let index = 0; index < pairs.length; index++) { 
            aanwezig = false;
            roundMatchups.forEach(match => {
                if(pairs[index][0] === match[0] || pairs[index][0] === match[1]){
                    aanwezig = true;
                }
                else if(pairs[index][1] === match[0] || pairs[index][1] === match[1]){
                    aanwezig = true;
                }
            });

            if(!aanwezig){
                roundMatchups.push(pairs[index]);
                verwijderen.push(index);
            }
        }
        verwijderen.reverse();
        verwijderen.forEach(index => {
            pairs.splice(index,1)
        });

       displayPairings(roundMatchups,roundnr);
    } 
    else{
        console.log("geen ronde meer");
    }

}

let displayPairings = (matchups,round)=>{
    let div = document.createElement('div');
    let roundTitel = document.createElement("h2");
    roundTitel.textContent = `Round ${round}`;
    matchups.forEach(matchup =>{
        let playerA = document.createElement('input');
        let playerB = document.createElement('input');
        let p = document.createElement('label');
        let br = document.createElement('br');
       
        p.textContent = " Vs ";
        playerA.value = matchup[0];
        playerB.value = matchup[1];
        playerA.readOnly = true;
        playerB.readOnly = true;
        div.style.marginBottom = "2.5rem";
        div.appendChild(playerA);
        div.appendChild(p);
        div.appendChild(playerB);
        div.appendChild(br)

    })
    pairings.appendChild(roundTitel);
    pairings.appendChild(div);

}


for (let index = 0; index < rounds; index++) {
    roundStart(index+1);
    
}
