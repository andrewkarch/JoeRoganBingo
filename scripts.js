var fightCompanionItems = ["He's an animal!", "Let's see that again.", "That is a scary scary man.", "A really really impressive performance by _____", "A way to measure leg reach", "Anderson Silva is the greatest MMA fighter the world has ever known", "He can lock in this choke if he can just ____", "He Has Dynamite in his hands!", "He is no Joke", "He's an animal", "He's rocked", "He's hurt Mike!", "He's Relatively unknown, but I think he could be a top-10 fighter in the ____division", "Head kick!", "His _____ has really improved since the last time we saw him", "His jiu jitsu is really underrated", "If he can _____ this fight is over", "Let's see that again", "Nasty ground game", "OH MAN!", "OHHHH!", "On the button", "Pound for Pound", "Substantial _____ advantage", "Thai Steel Cup", "That dude is for real!", "That is  a scary scary man", "The jab is the most underrated strike in MMA", "They need to come up with a way to fix theses gloves", "World class", "You know we have to watch that again"];
var JREQuotes = ["What people don't understand is...", "Bigfoot", "Mountain lion jacked my dog", "Ketogenic Diet", "Silly bitches", "X person needs mushrooms", "Boston Comedy Scene", "Stoned ape theory", "Whether it's just hallucinations or not, the experience is the same", "Nootropics", "Grass fed/steak butter", "JFK assassination", "Bombing (Comedy) is such a learning experience", "Hunting", "You can abuse almost anything, you can abuse cheese burgers", "Brain/Jaime, bring up...", "Operation Northwoods", "Singularity", "No privacy in the future", "Werewolves", "Ancient Civilizations were wiped out", "Isolation Tank", "Canada/Austin, TX", "Joey Diaz/Alex Jones impression", "Any Conspiracy Talk", "Callen Gay Jokes", "Keto Kid", "Story about Shane Carwin", "Archery", "Pull that up, Jamie", "Hottest Guy in the UFC", "See Ya!", "Anthony Bourdain ", "Ju Jitsu", "The sound of a joint being smoked", "Callen's Taekwondo Credentials", "For sure", "Onomatopeia", "He's a motherfucker", "Hey Man", "Hunting", "Animal vs Animal discussion", "Onnit plug", "When you release a domestic pig into the wild, it physically changes", "X is pound-for-pound one of the greatest", "Wildlife biologists", "Hippy/vegan impression", "Antrhopomorphation of animals", "Human beings are the sex organs of the machine world", "X is a great guy", "The idea of having a single person in charge is outdated", "Hunters are misunderstood", "William Randolph Hearst", "Fuck Sharks", "Total Human Optimization", "Bow hunting triggers something in your DNA", "Some Conspiracies are real", "How dare you", "I could be making that up", "Nobody wants bigfoot to be real more than me", "Bead/elk meat", "Ag-gag laws", "Bears are cannibals", "When you look at the data...", "Regressive Left", "You should start a podcast", "Playing pool", "Quake", "Hot yoga", "Coyote Behaviour", "We live in strange times", "Dan Carlin reference", "Sensory deprivation tank", "Chem trails"];
var userHasWon = false;

(function () {
    var app = angular.module('Joe', []);
    app.controller('Bingo', ['$scope', function ($scope) {}]);
})();

$(document).ready(function () {
    loadBoard(JREQuotes);
    $(".squareBlock:eq(12)").addClass("selected").addClass("middle").prop('onclick', null).off('clicked').text("Free Square");
})

function loadBoard(inArray) {
    var counter = 0;
    var arr = inArray.sort(function () {
        return 0.5 - Math.random()
    });
    $(".squareBlock").each(function (index) {
        if (!$(this).hasClass("middle"))
            $(this).text(arr[counter]);
        counter++;
    })
}

function clicked(obj) {
    $(obj).toggleClass("selected");
    var win = true;
    if ($(".squareBlock:eq(0)").hasClass("selected") && $(".squareBlock:eq(4)").hasClass("selected") && $(".squareBlock:eq(20)").hasClass("selected") && $(".squareBlock:eq(24)").hasClass("selected"))
        checkWin(true, "Four Corners");
    for (var x = 0; x < 5; x++) {
        win = true;
        for (var i = 0; i < 5; i++)
            if (!$(".squareBlock:eq(" + (x + (i * 5)).toString() + ")").hasClass("selected"))
                win = false;
        checkWin(win, "Vertical");
        win = true
        for (var i = 0; i < 5; i++)
            if (!$(".squareBlock:eq(" + (i * 6).toString() + ")").hasClass("selected"))
                win = false;
        checkWin(win, "Diagonal");
        win = true;
        for (var i = 0; i < 5; i++)
            if (!$(".squareBlock:eq(" + ((i + 1) * 4).toString() + ")").hasClass("selected"))
                win = false;
        checkWin(win, "Diagonal");
        win = true;
        for (var i = 0; i < 5; i++)
            if (!$(".squareBlock:eq(" + (x * 5 + i).toString() + ")").hasClass("selected"))
                win = false;
        checkWin(win, "Horizontal");
    }
}

function reset(obj) {
    if (!userHasWon)
        var confirmed = confirm("Are you sure you want to reset?");
    if (userHasWon || confirmed == true) {
        $(".selected").each(function (index, obj) {
            $(this).removeClass("selected");
        })
        if ($(obj).attr("id") == "FC")
            loadBoard(fightCompanionItems);
        else
            loadBoard(JREQuotes);
    }
    userHasWon = false;
    $(".middle").addClass("selected");
}

function checkWin(win, direction) {
    if (win && !userHasWon) {
        swal("You win!", direction);
        userHasWon = true;
    }
}
