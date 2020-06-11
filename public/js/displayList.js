let div = document.getElementById("list");
let ul = document.createElement('ul');
playerList.forEach(player => {
    let li = document.createElement('li');
    li.textContent = player;
    ul.appendChild(li);
});
div.appendChild(ul);