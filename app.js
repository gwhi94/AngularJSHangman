var app = angular.module('HangmanApp', []);

app.controller('GameController', ['$scope', function ($scope) {

    var words = ['rat', 'cat', 'bat', 'mat'];
    $scope.incorrectLettersChosen = [];
    $scope.correctLettersChosen = [];
    $scope.guesses = 6;
    $scope.displayWord = "";
    $scope.input = {
        letter: ''
    };

    $scope.letterChosen = function () {
        for (let i = 0; i < $scope.correctLettersChosen.length; i++) {
            if ($scope.correctLettersChosen[i].toLowerCase() == $scope.input.letter.toLowerCase()) {
                alert("You already used this letter");
                $scope.input.letter = ""; //if letter already chosen, then clear input and return
                return;
            }
        }
        for (let i = 0; i < $scope.incorrectLettersChosen.length - 1; i++) {
            if ($scope.incorrectLettersChosen[i].toLowerCase() == $scope.input.letter.toLowerCase()) {
                alert("You already used this letter");
                $scope.input.letter = ""; //if letter already chosen, then clear input and return
                return;
            }
        }

        var correct = false;
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i].toLowerCase() == $scope.input.letter.toLowerCase()) {
                $scope.displayWord = $scope.displayWord.slice(0, i) + $scope.input.letter.toLowerCase() + $scope.displayWord.slice(i + 1);
                correct = true;
                divideDiv();
            }
        }

        if (correct) {
            $scope.correctLettersChosen.push($scope.input.letter.toLowerCase());

        } else {
            $scope.incorrectLettersChosen.push($scope.input.letter.toLowerCase());
            $scope.guesses--;
        }
        $scope.input.letter = "";
        if ($scope.guesses == 0) {
            alert("You lost");
            newGame();
        }
        if ($scope.correctLettersChosen.length == selectedWord.length) {
            //if the array of correct letters are the same length as the random word
            alert("Well done");
            newGame();
        }


    }

    var selectRandomWord = function () {
        var index = Math.floor(Math.random() * words.length);
        return words[index];
    }

    var newGame = function () {
        $scope.incorrectLettersChosen = [];
        $scope.correctLettersChosen = [];
        $scope.guesses = 6;
        $scope.displayWord = "";

        selectedWord = selectRandomWord();
        console.log(selectedWord);
        var tempWord = '';

        for (let i = 0; i < selectedWord.length; i++) {
            tempWord += '*';
        }

        $scope.displayWord = tempWord;




    }

    newGame();


}]);


function divideDiv() {

    let totalWidth = 600;
    let blockWidth = 600 / selectedWord.length;
    $(".progressBlock").append("<div class='dynamicBlock'></div>");
    $('.dynamicBlock').css({ width: blockWidth });



}