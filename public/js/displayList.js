let table = document.getElementById('table');

players.forEach(player => {
    let tr = document.createElement("tr");
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    td1.textContent = player.name;
    td2.textContent = player.ign;
    tr.appendChild(td1);
    tr.appendChild(td2);
    table.appendChild(tr);
});
