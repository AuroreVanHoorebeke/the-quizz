const body = document.querySelector("body");
const main = document.createElement("main");
main.className = "main";
body.appendChild(main);

const url = "https://opentdb.com/api.php?amount=10&category=20&difficulty=easy&type=multiple";
const question = document.createElement("p");

question.className = "class";
main.appendChild(question);

let scoreDisplay = document.createElement("div");
scoreDisplay.className = "scoreDisplay";

const showScore = document.createElement("button");
showScore.textContent = "Show Score";

//requests for trivia data

fetch(url)
.then(response => (response.json()))
.then(array => {
    console.log(array);
    console.log(array.results);
    let score = 0;

    const arrayAPI = array.results;
    for(let i = 0; i < arrayAPI.length; i++){
        console.log("loop1");
        const questionDiv = document.createElement("div");
        questionDiv.className = "questionDiv";
        main.appendChild(questionDiv);

        const question = document.createElement('p');
        question.className = "question";
        question.textContent = arrayAPI[i].question;
        questionDiv.appendChild(question);

        const answersDiv = document.createElement("div");
        answersDiv.className = "answersDiv";
        questionDiv.appendChild(answersDiv);

        const questionArr = arrayAPI[i].incorrect_answers;

        const correctAnsw = arrayAPI[i].correct_answer;
        questionArr.push(correctAnsw)
        console.log(questionArr);

        for(let answer of questionArr){
            console.log("loop2")
            console.log(i)

            const input = document.createElement("input");
            input.for = answer;
            input.className = "input"+i;
            input.type = "radio";
            input.name = "answers" + i;
            answersDiv.appendChild(input)

            const label = document.createElement("label");
            label.className = "label";
            label.id = answer;
            label.textContent = answer;
            answersDiv.appendChild(label);

            input.addEventListener("change", function (){
                console.log("click");
                if(label.textContent == arrayAPI[i].correct_answer){
                    console.log("Ok!");
                    label.style.backgroundColor = "green";
                    score ++;
                    console.log(score)
                }else{
                    console.log("wrong!");
                    label.style.backgroundColor = "red";
                    alert("wrong answer!")
                    score --;
                    console.log(score);
                };
                console.log("dans loop2, dans evtlist dns fct-" + score)

                scoreDisplay.textContent = `You have ${score} points.`

            }
                // const allInput = document.querySelectorAll("input")
                // for(let radio of allInput){
                // }

            );

            console.log("dans loop2, hors evtlist -" + score)

            showScore.addEventListener("click", function (){
                main.appendChild(scoreDisplay)
            });

        }

    main.appendChild(showScore)
    }

})

