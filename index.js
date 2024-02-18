var nums = [];
var numbers = [];
var operations = [];
var concatenatedNumber = null;

var answer = 0;

var play = []
var ball = []
var display = $("#calculator-display");
var oper = []
var repeat = []
var negate = false
document.getElementById("calculator-display").value = 0

//////CLICKING ANIMATION ON BUTTONS
document.querySelector('.button-container').addEventListener('mousedown', function (event) {
    if (event.target.tagName === 'BUTTON') {
        if (event.target.classList.contains('operation-dot')) {
            event.target.classList.add('clicked-operation-instant');
            event.target.classList.add('clicked-text-instant');
            
            if (play.length > 0 && ball.length > 0) {
                negate = false
    
                var answer = calculate()
                if (answer === "Error") {
                    document.getElementById("calculator-display").value = "Error"
                    play = ["Error"]
                    ball = []
                    oper = ["fin"]
                } else {
                document.getElementById("calculator-display").value = answer
                play = [answer]
            
                repeat = [ball[0], oper[0]]
            
                ball = []
                oper = ["fin"]
                }
            }




        } else {
            event.target.classList.add('clicked');
        }
    }
});

document.querySelector('.button-container').addEventListener('mouseup', function (event) {
    if (event.target.tagName === 'BUTTON') {
        // Check if the button's id is in the oper array
        var buttonId = event.target.id;
        if (buttonId === "multiply" || buttonId === "minus" || buttonId === "divide" || buttonId === "plus"){
        oper = [buttonId]
        negate = false
        }

        if (!oper.includes(buttonId)) {
            // Remove the specified classes if the button's id is not in the oper array
            event.target.classList.remove('clicked', 'clicked-operation-instant', 'clicked-text-instant');

            document.getElementById("multiply").classList.remove('clicked', 'clicked-operation-instant', 'clicked-text-instant');
            document.getElementById("minus").classList.remove('clicked', 'clicked-operation-instant', 'clicked-text-instant');
            document.getElementById("plus").classList.remove('clicked', 'clicked-operation-instant', 'clicked-text-instant');
            document.getElementById("divide").classList.remove('clicked', 'clicked-operation-instant', 'clicked-text-instant');

        } else if (oper.includes("multiply")){
            document.getElementById("divide").classList.remove('clicked', 'clicked-operation-instant', 'clicked-text-instant');
            document.getElementById("minus").classList.remove('clicked', 'clicked-operation-instant', 'clicked-text-instant');
            document.getElementById("plus").classList.remove('clicked', 'clicked-operation-instant', 'clicked-text-instant');
        } else if (oper.includes("divide")){
            document.getElementById("multiply").classList.remove('clicked', 'clicked-operation-instant', 'clicked-text-instant');
            document.getElementById("minus").classList.remove('clicked', 'clicked-operation-instant', 'clicked-text-instant');
            document.getElementById("plus").classList.remove('clicked', 'clicked-operation-instant', 'clicked-text-instant');
        } else if (oper.includes("minus")){
            document.getElementById("multiply").classList.remove('clicked', 'clicked-operation-instant', 'clicked-text-instant');
            document.getElementById("divide").classList.remove('clicked', 'clicked-operation-instant', 'clicked-text-instant');
            document.getElementById("plus").classList.remove('clicked', 'clicked-operation-instant', 'clicked-text-instant');
        } else if (oper.includes("plus")){
            document.getElementById("multiply").classList.remove('clicked', 'clicked-operation-instant', 'clicked-text-instant');
            document.getElementById("minus").classList.remove('clicked', 'clicked-operation-instant', 'clicked-text-instant');
            document.getElementById("divide").classList.remove('clicked', 'clicked-operation-instant', 'clicked-text-instant');
        }
    }
});



/////CLEAR ALL
$("#AC").click(function(){
    play = [0]
    ball = []
    display = []
    oper = []
    negate = false
    document.getElementById("calculator-display").value = 0
})



////NUMBER PAD
$(".digit-button").click(function () {
    var input = $(this).text();

    ///concatination
    if (oper[0] === "fin"){
        if (negate) {
            if (play[0] === "-0"){
                play = [-input]
                document.getElementById("calculator-display").value = play[0]
            } else {
                var part = play[0] + input
                play = [part]
                document.getElementById("calculator-display").value = play[0]
            }
        } else {
            var part = play[0] + input
        play = [part]
        document.getElementById("calculator-display").value = play[0]
        }
    } else if (play.length === 0){
        play = [input]
        document.getElementById("calculator-display").value = input
    } else if (play.length > 0 && oper.length === 0) {
        if (negate) {
            if (play[0] === "-0"){
                play = [-input]
                document.getElementById("calculator-display").value = play[0]
            } else {
                if (play[0] === 0){
                    play = [input]
                    document.getElementById("calculator-display").value = play[0]
                } else {
            var part = play[0] + input
            play = [part]
            document.getElementById("calculator-display").value = play[0]
                }
            }
        } else {
            if (play[0] === 0){
                play = [input]
                document.getElementById("calculator-display").value = play[0]
            } else {
        var part = play[0] + input
        play = [part]
        document.getElementById("calculator-display").value = part
        }}
    } else if (ball.length === 0){
        if (negate) {
            ball = [-input]
            document.getElementById("calculator-display").value = ball[0]
        } else {
        ball = [input]
        document.getElementById("calculator-display").value = input
        }
    } else if (ball.length > 0 ) {
        if (negate) {
            if (ball[0] === "-0") {
                ball = [-input]
                document.getElementById("calculator-display").value = ball[0]
            } else {
            var part = ball[0] + input
            ball = [part]
            document.getElementById("calculator-display").value = ball[0]
            }
        } else {    
        var part = ball[0] + input
        ball = [part]
        document.getElementById("calculator-display").value = part
        }
    }
});


////EQUALS...
$("#equals").click(function(){
    // concatenatedNumber = Number(nums.join(''));
    // numbers.push(concatenatedNumber);
    negate = false
    
    var answer = calculate()
    if (answer === "Error") {
        document.getElementById("calculator-display").value = "Error"
        play = ["Error"]
        ball = []
        oper = ["fin"]
    } else {
    document.getElementById("calculator-display").value = answer
    play = [answer]

    repeat = [ball[0], oper[0]]

    ball = []
    oper = ["fin"]
    }
});


function calculate() {
    if (play[0] === "Error") {
        return "Error"
    } else if (ball.length === 0) {

        if (repeat.length > 0){
            ball = [repeat[0]]
            oper = [repeat[1]]
            var answ = calculate()
            return answ
        } else {
        return play[0]    
        }

    } else if (oper.includes("multiply")) {
        return (play[0] * ball[0])
    } else if (oper.includes("divide")) {
        if (ball[0] !== "0") {
            return (play[0] / parseFloat(ball[0]))
        } else {
            // Handle division by zero by setting an error message in the calculator display
            // Do not return a specific result for division by zero
            return "Error"
        }
    } else if (oper.includes("plus")) {
        return (parseFloat(play[0]) + parseFloat(ball[0]))
    } else if (oper.includes("minus")) {
        return (play[0] - ball[0])
    }
}




$("#plusMinus").click(function(){
    if (oper[0] === "fin"){
        if (play[0] === 0){
            play = ["-0"]
            negate = true
            document.getElementById("calculator-display").value = play[0]
        } else if (play[0] === "-0") {

        play = [0]
        negate = false
        document.getElementById("calculator-display").value = play[0]

        } else {
        negate = !negate
        play = [-play[0]]
        document.getElementById("calculator-display").value = play[0]
        }
    } else if (play.length === 0){
        play = ["-0"]
        negate = true
        document.getElementById("calculator-display").value = play[0]
    } else if (play[0] === "-0") {
        play = [0]
        negate = false
        document.getElementById("calculator-display").value = play[0]
    }else if (play[0] === 0) {
        play = ["-0"]
        negate = true
        document.getElementById("calculator-display").value = play[0]
    } else if (play.length > 0 && oper.length === 0) {
        play = [-play[0]]
        negate = !negate
        document.getElementById("calculator-display").value = play[0]
    } else if (ball.length === 0){
        ball = ["-0"]
        negate = true
        document.getElementById("calculator-display").value = ball[0]
    } else if (ball.length > 0 ) {
        ball = [-ball[0]]
        negate = !negate
        document.getElementById("calculator-display").value = ball[0]
    }
})
















// $("#multiply").click(function(){

//     handleOperation("*");
// });
// $("#divide").click(function(){
//     oper = ["divide"]
//     handleOperation("/");
// });
// $("#minus").click(function(){
//     oper = ["minus"]
//     handleOperation("-");
// });
// $("#plus").click(function(){
//     oper = ["plus"]
//     handleOperation("+");
// });




// function updateDisplay(updateImmediately) {
//     if (updateImmediately) {
//         var currentInput = nums.length > 0 ? nums.join('') : operations.join('');
//         display.val(currentInput);
//     }
// }


// function handleOperation(operation) {
//     concatenatedNumber = Number(nums.join(''));
//     numbers.push(concatenatedNumber);
//     nums = [];
//     operations.push(operation);
// }
