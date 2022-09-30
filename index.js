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

    const userAttemptsList = document.createElement('ul')

    maxNumberInput.focus()

    class Game {

        maxNumber;
        randomNumber;
        attempts;
        userAttempts = [];
        gameStage = 'start'

        randomNumberPicker = (number) => {
            this.randomNumber = Math.floor(Math.random() * number)
            this.maxNumber = number
        }

        checkNumber = () => {
            if(+userInput.value === +this.randomNumber){
                //?
                setTimeout(() => {
                    this.gameStage = 'finished'
                }, 1)
                winNotifier.classList.add('show')
                winNotifierNumber.innerHTML = `The number was ${this.randomNumber}`
                notifier.classList.remove('game-in-process')
                inputWrapper.classList.remove('game-in-process')
                userInput.value = ''
                this.userAttempts = []

            } else {
                this.userAttempts.push(userInput.value)
                notifier.innerHTML = `The number is ${userInput.value < this.randomNumber ? "greater" : "less"} than ${userInput.value}, you have ${this.attempts} more ${this.attempts > 1 ? "attempts" : "attempt"} to guess the number`

                const listElement = document.createElement('li')
                listElement.innerHTML = this.userAttempts[this.userAttempts.length - 1]
                userAttemptsList.appendChild(listElement)

                userInput.value = ''
            }
        }

        checkAttempts = () => {
            if(this.attempts === 0){
                //?
                setTimeout(() => {
                    this.gameStage = 'finished'
                }, 1)
                loseNotifier.classList.add('show')
                loseNotifierNumber.innerHTML = `The number was ${this.randomNumber}`
                notifier.classList.remove('game-in-process')
                inputWrapper.classList.remove('game-in-process')
                userNumbers.removeChild(userAttemptsList)
                this.userAttempts = []
            }
        }

        checkButtonFunc = () => {
            if(+userInput.value < 0 || +userInput.value > this.maxNumber || userInput.value === '') {
                checkButton.setAttribute('disabled', "true")
            } else {
                checkButton.removeAttribute('disabled')
            }
        }

        startGame = () => {
            this.randomNumberPicker(+maxNumberInput.value)
            if(Math.floor(this.maxNumber / 4) < 3){
                this.attempts = 3;
            } else {
                this.attempts = Math.floor(this.maxNumber / 4);
            }
            buttonWrapper.classList.add('game-in-process')
            inputWrapper.classList.add('game-in-process')
            notifier.classList.add('game-in-process')
            heading.style.display = 'none'
            notifier.innerHTML = `You have ${this.attempts} attempts to guess the number`
            userNumbers.appendChild(userAttemptsList)
            maxNumberInput.style.display = 'none'
            maxNumberInput.value = ''
            userInput.focus()
            startButton.setAttribute('disabled', "true")
        }

        restartGame = () => {
            this.randomNumberPicker()
            buttonWrapper.classList.remove('game-in-process')
            inputWrapper.classList.remove('game-in-process')
            notifier.classList.remove('game-in-process')
            loseNotifier.classList.remove('show')
            winNotifier.classList.remove('show')
            heading.style.display = 'none'
            maxNumberInput.style.display = 'block'
            heading.style.display = 'block'
            notifier.innerHTML = `You have ${this.attempts} attempts to guess the number`
            while(userAttemptsList.hasChildNodes()){
                userAttemptsList.removeChild(userAttemptsList.firstChild)
            }
            userNumbers.appendChild(userAttemptsList)
            this.gameStage = 'start'
            maxNumberInput.focus()
        }
    }

    const GuessTheNumber = new Game();

    startButton.addEventListener('click', () => {
        GuessTheNumber.startGame()
    })

    checkButton.addEventListener('click', () => {
        GuessTheNumber.attempts -= 1
        GuessTheNumber.checkNumber()
        GuessTheNumber.checkAttempts()
        GuessTheNumber.checkButtonFunc()
    })

    restartButton.forEach(btn => {

        btn.addEventListener('click', () => {
            GuessTheNumber.restartGame()
        })

    })

    userInput.oninput = () => {
        userInput.value.replaceAll(" ", "")
        GuessTheNumber.checkButtonFunc()
    }

    maxNumberInput.oninput = () => {
        if(+maxNumberInput.value > 200 || +maxNumberInput.value < 0 || maxNumberInput.value === '') {
            startButton.setAttribute('disabled', "true")
        } else {
            startButton.removeAttribute('disabled')
        }
    }

    document.addEventListener('keydown', (e) => {
        if(GuessTheNumber.gameStage === 'start' && e.key === 'Enter' && (+maxNumberInput.value <= 200 || +maxNumberInput.value > 0 || maxNumberInput.value === '')){
            GuessTheNumber.startGame()
            GuessTheNumber.gameStage = 'in-process'
        }
        if(GuessTheNumber.gameStage === 'in-process' && e.key === 'Enter' && (+userInput.value >= 0 && +userInput.value <= GuessTheNumber.maxNumber && userInput.value !== '')){
            GuessTheNumber.attempts -= 1
            GuessTheNumber.checkNumber()
            GuessTheNumber.checkAttempts()
            GuessTheNumber.checkButtonFunc()
        }
        if(GuessTheNumber.gameStage === 'finished' && e.key === 'Enter'){
            GuessTheNumber.restartGame()
            maxNumberInput.focus()
        }
    })

});

