const quotes = [
    {
        "text": "An idiot admires complexity, a genius admires simplicity.",
        "author": "Terry A. Davis"
    },
    {
        "text": "The people who are crazy enough to think they can change the world are the ones who do.",
        "author": "Steve Jobs"
    },
    {
        "text": "I think teeth are the first reminder of mortality. I think that’s where it begins to hit ya. Cus they don’t come back and that’s it.",
        "author": "Terry A. Davis"
    },
    {
        "text": "If debugging is the process of removing software bugs, then programming must be the process of putting them in.",
        "author": "Edsger Dijkstra"
    },
    {
        "text": "C makes it easy to shoot yourself in the foot; C++ makes it harder, but when you do it blows your whole leg off.",
        "author": "Bjarne Stroustrup"
    },
    {
        "text": "Choose not to be harmed - and you won’t feel harmed. Don’t feel harmed - and you haven’t been.",
        "author": "Marcus Aurelius"
    },
    {
        "text": "No man is free who is not master of himself.",
        "author": "Epictetus"
    },
    {
        "text": "Any application that can be written in JavaScript, will eventually be written in JavaScript.",
        "author": "Jeff Atwood"
    },
    {
        "text": "Any sufficiently advanced technology is indistinguishable from magic.",
        "author": "Arthur C. Clarke"
    },
    {
        "text": "Cybersecurity is a shared responsibility, and it boils down to this: in cybersecurity, the more systems we secure, the more secure we all are.",
        "author": "Jeh Johnson"
    },
    {
        "text": "I am convinced that there are only two types of companies: those that have been hacked and those that will be. And even they are converging into one category: companies that have been hacked and will be hacked again.",
        "author": "Robert Mueller"
    },
    {
        "text": "The internet is the first thing that humanity has built that humanity doesn’t understand, the largest experiment in anarchy that we have ever had.",
        "author": "Eric Schmidt"
    },
    {
        "text": "We’re all at risk. It’s not a matter of if you’ll be targeted, but when.",
        "author": "Michael Kaiser"
    },
    {
        "text": "The threats we face in cyberspace are enormous, but so are the opportunities.",
        "author": "Michael Daniel"
    },
    {
        "text": "Passwords are like underwear: don’t let people see it, change it very often, and you shouldn’t share it with strangers.",
        "author": "Chris Pirillo"
    },
    {
        "text": "Arguing that you don’t care about the right to privacy because you have nothing to hide is no different than saying you don’t care about free speech because you have nothing to say.",
        "author": "Edward Snowden"
    },
    {
        "text": "Under observation, we act less free, which means we effectively are less free.",
        "author": "Edward Snowden"
    },
    {
        "text": "Arise, you have nothing to lose but your barbed wire fences!",
        "author": "Timothy C. May"
    },
    {
        "text": "The key to strong security: less reliance on secrets, and more reliance on keeping an adversary from making successful use of information he has.",
        "author": "Whitfield Diffie"
    },
    {
        "text": "The petty thief is imprisoned but the big thief becomes a feudal lord.",
        "author": "Zhuangzi"
    },
    {
        "text": "Commas matter.",
        "author": "Mauritius 'De kenner' Captiosus"
    },
    {
        "text": "Holly Wizard, This shit is excrement.",
        "author": "Shadow Wizard"
    },
    {
        "text": "The test speaks to us more clearly, as if it were an assertion of truth, not a sequence of operations.",
        "author": "Kent Beck"
    },
    {
        "text": "Shrimp what? Have you ever played rugby?",
        "author": "DJ Khalid"
    },
    {
        "text": "Don’t waste your time chasing butterflies. Mend your garden, and the butterflies will come.",
        "author": "Mario Quintana"
    },
    {
        "text": "One for the money, two for the better green, 3,4-Methylenedioxymethamphetamine",
        "author": "MF DOOM"
    },
]

function randomQuote() {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    const quoteBlock = document.getElementsByTagName("blockquote")[0];
    quoteBlock.getElementsByTagName("p")[0].innerHTML = `“${quote.text}”`;
    quoteBlock.getElementsByTagName("p")[1].innerHTML = `— ${quote.author}`;
}

window.onload = function () {
    randomQuote();
}
