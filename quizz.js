const body = document.querySelector("body");
const main = document.createElement("main");
main.className = "main";
body.appendChild(main);

const url = "https://opentdb.com/api.php?amount=10&category=20&difficulty=easy&type=multiple"
const question = document.createElement("p");
//question.id = "question";
question.className = "class";
main.appendChild(question);

//requests for trivia data

fetch(url)
.then(response => response.json())
.then(array => {
    console.log(array);
    console.log(array.results);

    //for(let elem of arrayAPI.results)
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

        // const incorrectAnsw = document.createElement("p");
        // incorrectAnsw.className = "incorrectAnsw";
        // incorrectAnsw.textContent = incorrectArr;
        // answersDiv.appendChild(incorrectAnsw);
        const correct = document.createElement("label");
        correct.textContent = arrayAPI[i].correct_answer;
        correct.className = "correct";
        correct.id = correct;

        const correctInput = document.createElement("input");
        correctInput.for = correct;
        correctInput.type = "radio";
        correctInput.name = "answers"+i;
        questionDiv.appendChild(correctInput)

        questionDiv.appendChild(correct);

        // questionArr.push(correctAnsw)
        // console.log(questionArr);

        for(let answer of questionArr){
            console.log("loop2")
            console.log(i)

            const wrongInput = document.createElement("input");
            wrongInput.for = answer;
            wrongInput.className = "wrongInput";
            wrongInput.type = "radio";
            wrongInput.name = "answers" + i;
            questionDiv.appendChild(wrongInput)

            const wrong = document.createElement("label");
            wrong.className = "wrong";
            wrong.id = answer;
            wrong.textContent = answer;
            questionDiv.appendChild(wrong);

        }

    }

})

document.querySelector("body > main > div:nth-child(4) > input[type=radio]:nth-child(9)")

// body.addEventListener("checkboxClick", function (){
//     if(document.querySelectorAll(".wrong").checked){
//     console.log("wrong!");
//     wrongInput.style.backgroundColor = "red";
//     } else {
//         if(document.querySelectorAll(".correct").checked){
//             console.log("Ok!");
//             wrongInput.style.backgroundColor = "green";
//         };
//     }
// });
