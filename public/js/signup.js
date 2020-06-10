let gameLabel = document.getElementById("game");
gameLabel.value = location.href.split("/")[4];





if(gameLabel.value == "LeagueofLegends"){let unique = document.getElementById("unique");
unique.value = "#EUW";
unique.setAttribute('readonly', true);}
