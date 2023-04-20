class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation){
        if(this.currentOperand === '') return
        if(this.previousOperand !== ''){this.compute()}
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
        if(this.operation === '÷' && this.currentOperand === '0'){
          this.previousOperandTextElement.innerText = "Invalid operation"
          this.currentOperandTextElement.innerText = ""
        }
    }

    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
              computation = prev + current
              break

            case '-':
              computation = prev - current
              break
              
            case '*':
              computation = prev * current
              break

            case '÷':
                if(current === 0){
                  this.previousOperandTextElement.innerText = "Invalid operation"
                  this.currentOperandTextElement.innerText = ""
                  return
                }
                else{
                    computation = prev / current
                }
              break

            default:
              return
        }
        this.currentOperand = computation;
        this.operation = undefined;
        const calculationString = `${this.getDisplayNumber(
          prev
        )} ${this.operation} ${this.getDisplayNumber(current)} = ${this.getDisplayNumber(computation)}`;
        this.previousOperand = '';
        this.addToHistory(calculationString);
    }

    addToHistory() {
      const previousOperand = previousOperandTextElement.innerText;
      const currentOperand = currentOperandTextElement.innerText;
      const result = outputResult.toString(); // add this line to get the result of the calculation
      const historyList = document.getElementById('history-list');
      const listItem = document.createElement('li');
      listItem.innerHTML = `<span>${previousOperand}</span> ${operation} <span>${currentOperand}</span> = <span>${result}</span>`; // add the result to the listItem
      historyList.appendChild(listItem);
    }
    
    
  
    

    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerDigits)){integerDisplay = ''}
        else{integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})}
        if(decimalDigits != null){return `${integerDisplay}.${decimalDigits}`;}
        else{return integerDisplay}
    }
    
    
    updateDisplay(){
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
        
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
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