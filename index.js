document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.querySelector('.start__button')
    const buttonWrapper = document.querySelector('.button__wrapper')
    const inputWrapper = document.querySelector('.input__wrapper')
    const heading = document.querySelector('.game__heading')
    const notifier = document.querySelector('.notifier')
    const userInput = document.querySelector('.input__number')
    const checkButton = document.querySelector('.check__button')
    const loseNotifier = document.querySelector('.lose__notifier')
    const loseNotifierNumber = document.querySelector('.lose__notifier-number')
    const winNotifierNumber = document.querySelector('.win__notifier-number')
    const winNotifier = document.querySelector('.win__notifier')
    const restartButton = document.querySelectorAll('.restart__button')
    const userNumbers = document.querySelector('.user__attempts')
    const maxNumberInput = document.querySelector('.max__number')

    maxNumberInput.focus()

    class Game {

        randomNumberPicker = (max = 20) => {
            console.log(Math.floor(Math.random() * 20))
        }

    }

    let maxNumber;
    let randomNumber;
    let attempts;
    let userAttempts = [];
    let gameStage = 'start'
    const userAttemptsList = document.createElement('ul')

    const randomNumberPicker = (number) => {
        randomNumber = Math.floor(Math.random() * number)
        maxNumber = number
    }

    const checkNumber = () => {
        if(+userInput.value === +randomNumber){
            winNotifier.classList.add('show')
            winNotifierNumber.innerHTML = `The number was ${randomNumber}`
            notifier.classList.remove('game-in-process')
            inputWrapper.classList.remove('game-in-process')
            userInput.value = ''
            userAttempts = []
            gameStage = 'finished'
        } else {
            userAttempts.push(userInput.value)
            notifier.innerHTML = `The number is ${userInput.value < randomNumber ? "greater" : "less"} than ${userInput.value}, you have ${attempts} more ${attempts > 1 ? "attempts" : "attempt"} to guess the number`

            const listElement = document.createElement('li')
            listElement.innerHTML = userAttempts[userAttempts.length - 1]
            userAttemptsList.appendChild(listElement)

            userInput.value = ''
        }
    }

    const checkAttempts = () => {
        if(attempts === 0){
            loseNotifier.classList.add('show')
            loseNotifierNumber.innerHTML = `The number was ${randomNumber}`
            notifier.classList.remove('game-in-process')
            inputWrapper.classList.remove('game-in-process')
            userNumbers.removeChild(userAttemptsList)
            userAttempts = []
        }
    }

    const checkButtonFunc = () => {
        if(+userInput.value < 0 || +userInput.value > maxNumber || userInput.value === '') {
            checkButton.setAttribute('disabled', "true")
        } else {
            checkButton.removeAttribute('disabled')
        }
    }

    userInput.oninput = () => {
        userInput.value.replaceAll(/\s/gi, "")
        checkButtonFunc()
    }

    maxNumberInput.oninput = () => {
        if(+maxNumberInput.value > 200 || +maxNumberInput.value < 0 || maxNumberInput.value === '') {
            startButton.setAttribute('disabled', "true")
        } else {
            startButton.removeAttribute('disabled')
        }
    }

    const startGame = () => {
        randomNumberPicker(+maxNumberInput.value)
        if(Math.floor(maxNumber / 4) < 3){
            attempts = 3;
        } else {
            attempts = Math.floor(maxNumber / 4);
        }
        buttonWrapper.classList.add('game-in-process')
        inputWrapper.classList.add('game-in-process')
        notifier.classList.add('game-in-process')
        heading.style.display = 'none'
        notifier.innerHTML = `You have ${attempts} attempts to guess the number`
        userNumbers.appendChild(userAttemptsList)
        maxNumberInput.style.display = 'none'
        maxNumberInput.value = ''
        userInput.focus()
        startButton.setAttribute('disabled', "true")
    }

    startButton.addEventListener('click', () => {
        startGame()
    })

    document.addEventListener('keydown', (e) => {
        if(gameStage === 'start' && e.key === 'Enter' && (+maxNumberInput.value <= 200 || +maxNumberInput.value > 0 || maxNumberInput.value === '')){
            startGame()
            gameStage = 'in-process'
        }
        if(gameStage === 'in-process' && e.key === 'Enter' && (+userInput.value > 0 && +userInput.value <= maxNumber && userInput.value !== '')){
            attempts -= 1
            checkNumber()
            checkAttempts()
            checkButtonFunc()
        }
        if(gameStage === 'finished' && e.key === 'Enter'){
            restartGame()
            maxNumberInput.focus()
        }
    })

    checkButton.addEventListener('click', () => {
        attempts -= 1
        checkNumber()
        checkAttempts()
        checkButtonFunc()
    })

    const restartGame = () => {
        randomNumberPicker()
        buttonWrapper.classList.remove('game-in-process')
        inputWrapper.classList.remove('game-in-process')
        notifier.classList.remove('game-in-process')
        loseNotifier.classList.remove('show')
        winNotifier.classList.remove('show')
        heading.style.display = 'none'
        maxNumberInput.style.display = 'block'
        heading.style.display = 'block'
        notifier.innerHTML = `You have ${attempts} attempts to guess the number`
        while(userAttemptsList.hasChildNodes()){
            userAttemptsList.removeChild(userAttemptsList.firstChild)
        }
        userNumbers.appendChild(userAttemptsList)
        gameStage = 'start'
        maxNumberInput.focus()
    }

    restartButton.forEach(btn => {

        btn.addEventListener('click', () => {
            restartGame()
        })

    })
});

