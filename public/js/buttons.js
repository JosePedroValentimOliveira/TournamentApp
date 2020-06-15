let buttonDiv = document.getElementById("buttons");
let hallo = document.createElement("h1").textContent = "hallo"

fetch("../json/games.json").then((resp) => {
    return resp.json();
}).then((data) => {
    data.forEach(game => {
        
        let button = document.createElement('button');
        let img = document.createElement('img');

        img.src = `./images/${game.short}_Logo.png`;
        let link = game.name.split(" ").join("");
        button.onclick = ()=>{ window.location.href = `/signup/${link}`;};
        if(game.short == "Val"){
            button.disabled = true;
            img.style.opacity = "0.5";
        }
        
        button.appendChild(img);
        buttonDiv.appendChild(button);
    });
})
