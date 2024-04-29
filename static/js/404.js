// I couldn't find a better way to do this :(
// Copilot (the job stealer) couldn't help me 

const GIF_AMOUNT = 28;

// Thanks to https://theuselessweb.com/ for the majority of the websites
const RANDOM_WEBSITES = [
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "https://bbwroller.com/",
    "https://spotthedrowningchild.com/",
    "https://sliding.toys/mystic-square/8-puzzle/daily/",
    "https://longdogechallenge.com/",
    "https://maze.toys/mazes/mini/daily/",
    "https://optical.toys",
    "https://paint.toys/",
    "https://puginarug.com",
    "https://alwaysjudgeabookbyitscover.com",
    "https://clicking.toys/flip-grid/neat-nine/3-holes/",
    "https://weirdorconfusing.com/",
    "https://checkbox.toys/scale/",
    "https://memory.toys/classic/easy/",
    "https://binarypiano.com/",
    "https://mondrianandme.com/",
    "https://onesquareminesweeper.com/",
    "https://cursoreffects.com",
    "http://floatingqrcode.com/",
    "https://thatsthefinger.com/",
    "https://cant-not-tweet-this.com/",
    "http://heeeeeeeey.com/",
    "http://corndog.io/",
    "http://eelslap.com/",
    "http://www.staggeringbeauty.com/",
    "http://burymewithmymoney.com/",
    "https://smashthewalls.com/",
    "https://jacksonpollock.org/",
    "http://endless.horse/",
    "http://drawing.garden/",
    "https://www.trypap.com/",
    "http://www.republiquedesmangues.fr/",
    "http://www.movenowthinklater.com/",
    "https://sliding.toys/klotski/easy-street/",
    "https://paint.toys/calligram/",
    "https://checkboxrace.com/",
    "http://www.rrrgggbbb.com/",
    "http://www.koalastothemax.com/",
    "https://rotatingsandwiches.com/",
    "http://www.everydayim.com/",
    "http://randomcolour.com/",
    "http://maninthedark.com/",
    "http://cat-bounce.com/",
    "http://chrismckenzie.com/",
    "https://thezen.zone/",
    "http://ninjaflex.com/",
    "http://ihasabucket.com/",
    "http://corndogoncorndog.com/",
    "http://www.hackertyper.com/",
    "https://pointerpointer.com",
    "http://imaninja.com/",
    "http://www.partridgegetslucky.com/",
    "http://www.ismycomputeron.com/",
    "http://www.nullingthevoid.com/",
    "http://www.muchbetterthanthis.com/",
    "http://www.yesnoif.com/",
    "http://lacquerlacquer.com",
    "http://potatoortomato.com/",
    "http://iamawesome.com/",
    "https://strobe.cool/",
    "http://thisisnotajumpscare.com/",
    "http://doughnutkitten.com/",
    "http://crouton.net/",
    "http://corgiorgy.com/",
    "http://www.wutdafuk.com/",
    "http://unicodesnowmanforyou.com/",
    "http://chillestmonkey.com/",
    "http://scroll-o-meter.club/",
    "http://www.crossdivisions.com/",
    "http://tencents.info/",
    "https://boringboringboring.com/",
    "http://www.patience-is-a-virtue.org/",
    "http://pixelsfighting.com/",
    "http://isitwhite.com/",
    "https://existentialcrisis.com/",
    "http://onemillionlols.com/",
    "http://www.omfgdogs.com/",
    "http://oct82.com/",
    "http://chihuahuaspin.com/",
    "http://www.blankwindows.com/",
    "http://tunnelsnakes.com/",
    "http://www.trashloop.com/",
    "http://spaceis.cool/",
    "http://www.doublepressure.com/",
    "http://www.donothingfor2minutes.com/",
    "http://buildshruggie.com/",
    "http://yeahlemons.com/",
    "http://wowenwilsonquiz.com",
    "http://notdayoftheweek.com/",
    "http://www.amialright.com/",
    "https://optical.toys/thatcher-effect/",
    "https://greatbignothing.com/",
    "https://zoomquilt.org/",
    "https://dadlaughbutton.com/",
    "https://remoji.com/",
    "http://papertoilet.com/",
    "https://loopedforinfinity.com/",
    "https://end.city/",
    "https://www.bouncingdvdlogo.com/",
    "https://clicking.toys/peg-solitaire/english/",
    "https://toms.toys",
]

function getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1;
}

function getRandomGifNumber() {
    var gifNumber = getRandomInt(GIF_AMOUNT + 1);

    // Secret gif for lucky people
    if (gifNumber === GIF_AMOUNT + 1) {
        var gifNumber = getRandomInt(1000);
        if (gifNumber !== 69) { // nice
            gifNumber = getRandomInt(GIF_AMOUNT);
        }
    }
    return gifNumber;
}

function refreshGif() {
    var gifElement = document.getElementById("gif-404");
    gifElement.src = `/404_gifs/${getRandomGifNumber()}.gif`;
}

function openRandomWebsite() {
    window.open(RANDOM_WEBSITES[getRandomInt(RANDOM_WEBSITES.length) - 1], '_blank');
}

window.onload = function() {
    var buttonSection = document.getElementById("buttons");
    buttonSection.innerHTML = `
        <button onclick="refreshGif()">Refresh</button>
        <button onclick="openRandomWebsite()">Random Website↗</button>
    `;
    
    refreshGif();
}