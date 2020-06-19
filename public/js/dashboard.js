let listContainer = document.getElementById('listContainer');
let lol = [],
    lor = [],
    val = [];

players.forEach(player => {
    switch (player.game) {
        case "LeagueofLegends":
            lol.push(player);
            break;
        case "LegendsofRuneterra":
            lor.push(player);
            break;
        case "Valorant":
            val.push(player);
            break;

        default:
            break;
    }
});



let displayList = (array)=>{
    let div = document.createElement('div');
    let gamename = document.createElement('p');
    let playerCount = document.createElement('p');
    playerCount.textContent = `Number of players: ${array.length}`;
    let ul = document.createElement('ul');
    
    array.forEach(player=>{
        let li = document.createElement('li');
        li.textContent = `${player.name} || ${player.ign}`;
        ul.appendChild(li);
    })
    gamename.textContent = array[0].game;
    div.style.border = "1px black solid";
    div.style.width = "20%"
    div.style.margin = "20px";
    div.style.padding = "10px";
    listContainer.style.justifyContent = "center";    
    div.appendChild(gamename);
    div.appendChild(ul);
    div.appendChild(playerCount);
    listContainer.appendChild(div);
}

displayList(lol);
displayList(lor);
displayList(val);       