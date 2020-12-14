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

    }

})