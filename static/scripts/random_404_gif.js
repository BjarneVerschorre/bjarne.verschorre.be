// I couldn't find a better way to do this :(
// Copilot (the job stealer) couldn't help me 

function getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1;
}

const gifAmount = 18;
var gifNumber = getRandomInt(gifAmount + 1);

// Secret gif for lucky people
if (gifNumber === gifAmount + 1) {
    var gifNumber = getRandomInt(1000);
    if (gifNumber !== 69) { // nice
        gifNumber = getRandomInt(gifAmount);
    }
}

var gif = document.createElement('img');
gif.src = `/404_gifs/${gifNumber}.gif`;
gif.style.width = '100%';

document.body.appendChild(gif);