
let form = document.getElementById('week');
let table = document.querySelector('tbody');

form.addEventListener('submit',async (e)=>{
    
    e.preventDefault();
    table.textContent = "";
    await fetch('./json/picks.json').then((resp)=>{return resp.json();}).then((data)=>{
        data.forEach(player => {
            const input = form[0].value -1;
            const thisWeek = player.picks[input];
            let tr = document.createElement('tr');
            let name = document.createElement('td');
            name.className = "playerName";
            name.textContent = player.name;

           
            tr.appendChild(name);

            thisWeek.forEach(pick =>{
                let champion = document.createElement('td');
                
                champion.textContent = pick;
                tr.appendChild(champion);
            }
            )
            table.appendChild(tr);

            
            
            
        });
    })
    form[0].value = "";
}
)


