const body = document.querySelector("body");
const main = document.createElement("main");
main.className = "main";
body.appendChild(main);

const url = "https://opentdb.com/api.php?amount=10&category=20&difficulty=easy&type=multiple&encode=base64";
const question = document.createElement("p");

let scoreDisplay = document.createElement("div");
scoreDisplay.className = "scoreDisplay";

const showScore = document.createElement("button");
showScore.textContent = "showScore";

const refresh = document.createElement("button");
refresh.textContent = "refresh";

const buttonDiv = document.createElement("div");
buttonDiv.className = "buttonDiv";

//requests for trivia data

fetch(url)
.then(response => (response.json()))
.then(array => {
    console.log(array);
    console.log(array.results);
    let score = 0;

    const arrayAPI = array.results;

    const title = document.createElement("h1");
    title.textContent = `${b64DecodeUnicode(arrayAPI[0].category)} Trivia`;
    main.appendChild(title);

    for(let i = 0; i < arrayAPI.length; i++){
        console.log("loop1");
        const questionDiv = document.createElement("div");
        questionDiv.className = "questionDiv";
        main.appendChild(questionDiv);

        const question = document.createElement('p');
        question.className = "question";
        question.textContent = b64DecodeUnicode(arrayAPI[i].question);
        questionDiv.appendChild(question);

        const answersDiv = document.createElement("div");
        answersDiv.className = "answersDiv";
        questionDiv.appendChild(answersDiv);

        const questionArr = arrayAPI[i].incorrect_answers;

        const correctAnsw = arrayAPI[i].correct_answer;
        questionArr.push(correctAnsw)
        console.log(questionArr);
        shuffle(questionArr);

        for(let answer of questionArr){
            console.log("loop2")
            console.log(i)
            const inputLabelDiv = document.createElement("div");
            inputLabelDiv.className = "inputLabelDiv";
            answersDiv.appendChild(inputLabelDiv);

            const input = document.createElement("input");
            input.for = answer;
            input.className = "input"+i;
            input.type = "radio";
            input.name = "answers" + i;
            inputLabelDiv.appendChild(input)

            const label = document.createElement("label");
            label.className = "label";
            label.id = answer;
            label.textContent = b64DecodeUnicode(answer);
            inputLabelDiv.appendChild(label);

            input.addEventListener("change", function (){
                console.log("click");
                if(label.textContent == b64DecodeUnicode(arrayAPI[i].correct_answer)){
                    console.log("Ok!");
                    score ++;
                    console.log(score)
                }else{
                    console.log("wrong!");
                    alert("wrong answer!")
                    score --;
                    console.log(score);
                };
                console.log("dans loop2, dans evtlist dns fct-" + score)

                scoreDisplay.textContent = `You have ${score} points.`

            }
            );

            console.log("dans loop2, hors evtlist -" + score)

            showScore.addEventListener("click", function (){
                main.appendChild(scoreDisplay)
            });
            refresh.addEventListener("click", function (){
                location.reload()
            });

        }
    main.appendChild(buttonDiv)
    buttonDiv.appendChild(showScore);
    buttonDiv.appendChild(refresh);
    }

})


/**
 * Function to address the character encoding issue in the trivia
 */
function b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
return decodeURIComponent(atob(str).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
}).join(''));
}

/**
 * Shuffles using Fisher-Yates algorythm.
*/
function shuffle(arr){
    for(let i=arr.length-1; i>0; i--){
        let j = Math.floor(Math.random() * (i+1));
        [arr[i],arr[j]]=[arr[j],arr[i]];
    }
}