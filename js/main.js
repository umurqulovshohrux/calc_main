const numbers = [...document.querySelectorAll('.num')]
const display = document.querySelector('input')
const signs = [...document.querySelectorAll('.sign')]
const dot = document.querySelector('.dot')
const clear = document.querySelector('.c')
const remove = document.querySelector('.r')
const equal = document.querySelector('.equal')

class Calculator {

    signView
    signOperator
    operators = ['÷','-','+','✕']
    setDisplay(value) {
        display.value = display.value + value
    }

    get lastValue() {
        return display.value[display.value.length - 1]
    }

    numbers(event) {
        const num = event.target.textContent

        if(this.lastValue == 0 && display.value.length == 1)
        return display.value = num

        if(
            this.lastValue == 0 && this.signView
        ) return display.value = display.value.slice(0,-1) + num
        
        this.setDisplay(num)
    }
    signs(event) {

        const signView = event.target.textContent.trim()
        const signOperator = event.target.dataset.sign


        if(
            this.operators.includes(this.lastValue)
        )return display.value = display.value.slice(0,-1) + signOperator

        if(
            !display.value ||
            this.lastValue == this.signView ||
            this.lastValue == "."
        )return 

        this.signView = signView
        this.signOperator = signOperator 
        this.setDisplay(signView)

    }

    dot() {


        if(
            !display.value ||
            this.operators.includes(this.lastValue)
        ){
            display.value = display.value + "0."
        }

        if(
            !display.value ||
            this.operators.includes(this.lastValue) ||
            this.lastValue == "."
        )return

        this.setDisplay(".")

    }

    clear() {
        display.value =null
    }

    remove() {
        let deleted = display.value.split('')
        let newValue = deleted.slice(0,-1).join("")
        display.value = newValue

    }

    equal() {
        const [num1,num2] = display.value.split(this.signView)

        display.value = eval(num1 + this.signOperator + num2)
    }
}

const calculator  = new Calculator();

for(const number of numbers) {
    number.addEventListener('click',function(event){
        calculator.numbers(event)
    })
}

for(const sign of signs){
    sign.addEventListener('click',function(event){
        calculator.signs(event)
    })
}

dot.addEventListener('click',function(){
    calculator.dot()
})

clear.addEventListener('click',function(){
    calculator.clear()
})

remove.addEventListener('click',function(){
    calculator.remove()
})

equal.addEventListener('click',function(){
    calculator.equal()
})






