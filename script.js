function factorial(num)
{
    if (num === 0)
        { return 1; }
    else
        { return num * factorial( num - 1 ); }
}

class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) { //output
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1) //Nuima nuo pirmo iki paskutinio skaiciaus
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return //jei jau yra vienas taskas, neleidzia irasyti kito
        this.currentOperand = this.currentOperand.toString() + number.toString() 
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return //jei tuscia, netrina
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '/':
                computation = prev / current
                break
            case '*':
                computation = prev * current
                break
            case '^':
                computation = Math.pow(prev, current)
                break
            case 'x√':
                computation = Math.pow(prev, 1/current)
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    chooseOneOperation(operation) {
        this.operation = operation
        if (this.currentOperand === '') return //jei tuscia, netrina
        if (this.currentOperand !== '') {
            this.computeOne()
        }
    }

    computeOne() {
        let computation
        const current = parseFloat(this.currentOperand)
        if (isNaN(current)) return
        switch (this.operation) {
            case '|x|':
                computation = Math.abs(current)
                break
            case '1/x':
                computation = 1 / current
                break
            case 'n!':
                computation = factorial(current)
                break
            case '√':
                computation = Math.sqrt(current)
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`
        }
        else {
            previousOperandTextElement.innerText = ''
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]') //lauztiniuose skliaustuose nes yra data
const oneOperationButtons = document.querySelectorAll('[data-one-operation]')
const equalsButton = document.querySelector('[data-equals')
const deleteButton = document.querySelector('[data-delete')
const allClearButton = document.querySelector('[data-all-clear')
const previousOperandTextElement = document.querySelector('[data-previous-operand')
const currentOperandTextElement = document.querySelector('[data-current-operand')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => { //kiekvienam button elementui priskirs
    button.addEventListener('click', () => { //kai paspaudi ant mygtuko, kad jis darytu kazka
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => { //kiekvienam button elementui priskirs
    button.addEventListener('click', () => { //kai paspaudi ant mygtuko, kad jis darytu kazka
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

oneOperationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOneOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})