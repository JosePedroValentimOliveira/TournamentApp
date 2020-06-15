let buttonDiv = document.getElementById("buttons");
let hallo = document.createElement("h1").textContent = "hallo"
const valorantUpdate = new Date('2020-6-27');

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
            if(Date.now() < valorantUpdate){
                button.disabled = true;
                img.style.opacity = "0.5";
            }
            else{
                button.disabled = false;
                img.style.opacity = "1";
            }
            
        }
        
        button.appendChild(img);
        buttonDiv.appendChild(button);
    });
})
