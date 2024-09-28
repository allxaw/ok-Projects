const time = document.querySelector('.time')
const questionBox = document.querySelector('.question')
const answerContainer = document.querySelector('.answer-container')
const firstQuiz = document.querySelector('.first')
const lastQuiz = document.querySelector('.last')
const nextQuestion = document.querySelector('.next-Question')
const statusTime = document.querySelector('.status-time')
const endQuiz = document.querySelector('.end-Quiz')
const restartQuiz = document.querySelector('.restart-quiz')
const resultRight = document.querySelector('.result-right')
const ofQuestion = document.querySelector('.of-question')
const containerQuestion = document.querySelector('.container')
const resultBox = document.querySelector('.result-box')
const message = document.querySelector('.message-text')
const cupImage = document.querySelector('.cupimage')

let firstQuizCount = 1
let lastQuizCount = 1
let rightQuiz = 0
let timer;
let index = 0
let timeCount = 40

function createTemplate(questions) {
    answerContainer.innerHTML = ''
    questionBox.innerHTML = ''

    let quezTemplate = `<p>${questions[index].question}</p>`

    let answerOption = `<p class="answer">${questions[index].options[0]}</p>
    <p class="answer">${questions[index].options[1]}</p>
    <p class="answer">${questions[index].options[2]}</p>
    <p class="answer">${questions[index].options[3]}</p>`

    questionBox.insertAdjacentHTML('beforeend', quezTemplate)
    answerContainer.insertAdjacentHTML('beforeend', answerOption)

    firstQuiz.innerHTML = index + 1
    lastQuiz.innerHTML = questions.length

    timerContHandler()
    let answer = document.querySelectorAll('.answer')

    for (let i = 0; i < answer.length; i++) {
        answer[i].setAttribute('onclick', 'checkAnswer(this)')
    }
}


function checkAnswer(answer) {

    clearInterval(timer)
    let answerClick = answer.innerHTML
    let answerMain = questions[index].answer
    let allAnswerChild = answerContainer.children.length
    nextQuestion.classList.add('show-next')

    if (answerClick === answerMain) {
        answer.classList.add('rightAnswer')
        rightQuiz++
        updateScore(rightQuiz)
    } else {
        answer.classList.add('noAnswer')
        for (let i = 0; i < allAnswerChild; i++) {
            if (answerContainer.children[i].innerHTML === answerMain) {
                answerContainer.children[i].classList.add('rightAnswer')
            }
        }
    }
    for (let i = 0; i < allAnswerChild; i++) {
        answerContainer.children[i].classList.add('disable')
    }
}

function timerContHandler() {
    timer = setInterval(function () {
        timeCount--
        time.innerHTML = timeCount

        if (timeCount < 10) {
            time.innerHTML = '0' + timeCount
        }
        if (timeCount == 0) {
            clearInterval(timer)
            statusTime.style.background = 'rgb(199, 36, 14 , .8)'
            nextQuestion.classList.add('show-next')

            let answerMain = questions[index].answer
            let allAnswerChild = answerContainer.children.length

            for (let i = 0; i < allAnswerChild; i++) {
                if (answerContainer.children[i].innerHTML === answerMain) {
                    answerContainer.children[i].classList.add('rightAnswer')
                }
            }

            for (let i = 0; i < allAnswerChild; i++) {
                answerContainer.children[i].classList.add('disable')
            }

        } else {
            statusTime.style.background = 'rgb(145, 53, 250)'
        }
    }, 1000)
}

function nextQuestionHandler() {
    index++
    timeCount = 20
    createTemplate(questions)
    setTimeout(timer, 1000)

    if (index == 8) {
        nextQuestion.classList.remove('show-next')
        endQuiz.classList.add('show-end')
    } else {
        nextQuestion.classList.remove('show-next')
    }
    
}

function updateScore(right) {

    if (right > 8) {
        cupImage.setAttribute('src', 'images/gold.png')
        message.innerHTML = 'Congrageleisan!'
    } else if (right <= 8 && right > 4) {
        cupImage.setAttribute('src', 'images/silver.png')
        message.innerHTML = 'Nice'
    } else if (right <= 4 && right >= 2) {
        cupImage.setAttribute('src', 'images/bronze.png')
        message.innerHTML = 'Acceptabil'
    } else if (right == 1) {
        cupImage.setAttribute('src', 'images/emojy.png')
        message.innerHTML = 'Sorry :('
    } else {
        cupImage.setAttribute('src', 'images/emojy2.png')
        message.innerHTML = 'N-ai facut nimic..:(('
    }

    resultRight.innerHTML = rightQuiz
    ofQuestion.innerHTML = questions.length

}

function showResultQuiz() {
    containerQuestion.classList.add('hide-question')
    resultBox.classList.add('show-result')
}

function restartQuizHandler() {
    location.reload()
}

nextQuestion.addEventListener('click', nextQuestionHandler)
endQuiz.addEventListener('click', showResultQuiz)
restartQuiz.addEventListener('click', restartQuizHandler)
createTemplate(questions)