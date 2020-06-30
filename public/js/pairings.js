fetch('./json/picks.json').then((resp)=>{return resp.json();}).then((data)=>{
    data.forEach(player => {
        console.log(`${player.name}: ${player.picks[0]}, ${player.picks[1]}, ${player.picks[2]}`)
    });
})