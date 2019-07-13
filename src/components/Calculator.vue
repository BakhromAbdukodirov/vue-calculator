<template>
    <div @keypress.esc="clear">
        <div class="calc-body">
            <div class="calc-screen">
                <div class="calc-operation">{{ displayLine }}</div>
                <div class="calc-typed">{{ result }}<span class="blink-me"></span></div>
            </div>
            <div class="calc-button-row">
                <div @click="process('+')" :class="{clicked: activeButton === '+'}" class="button dark">+</div>
                <div @click="process('-')" :class="{clicked: activeButton === '-'}" class="button dark">-</div>
                <div @click="process('*')" :class="{clicked: activeButton === '*'}" class="button dark">*</div>
                <div @click="process('/')" :class="{clicked: activeButton === '/'}" class="button dark">/</div>
            </div>
            <div class="calc-button-row">
                <div @click="numberPressed(7)" :class="{clicked: activeButton === '7'}" class="button">7</div>
                <div @click="numberPressed(8)" :class="{clicked: activeButton === '8'}" class="button">8</div>
                <div @click="numberPressed(9)" :class="{clicked: activeButton === '9'}" class="button">9</div>
                <div @click="clear" :class="{clicked: activeButton === 'clear'}" class="button c">C</div>
            </div>
            <div class="calc-button-row">
                <div @click="numberPressed(4)" :class="{clicked: activeButton === '4'}" class="button">4</div>
                <div @click="numberPressed(5)" :class="{clicked: activeButton === '5'}" class="button">5</div>
                <div @click="numberPressed(6)" :class="{clicked: activeButton === '6'}" class="button">6</div>
                <div @click="calculate" :class="{clicked: activeButton === '='}" class="button dark">=</div>
            </div>
            <div class="calc-button-row">
                <div @click="numberPressed(1)" :class="{clicked: activeButton === '1'}" class="button">1</div>
                <div @click="numberPressed(2)" :class="{clicked: activeButton === '2'}" class="button">2</div>
                <div @click="numberPressed(3)" :class="{clicked: activeButton === '3'}" class="button">3</div>
                <div @click="numberPressed(0)" :class="{clicked: activeButton === '0'}" class="button">0</div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "calc",
        data() {
            return {
                first: '',
                second: '',
                operator: null,
                displayLine: '',
                result: null,
                activeButton: null
            }
        },
        methods: {
            numberPressed(num) {
                if (this.first === '' || this.operator === null) {
                    if (this.result !== null) {
                        this.result = null;
                        this.first = num;
                    } else {
                        this.first = this.first.ltrim('0') + num;
                    }
                } else {
                    this.second = this.second.ltrim('0') + num;
                }
                this.makeDisplayLine();
            },
            process(opr) {
                if (this.first !== '' && this.second === '') {
                    this.operator = opr;
                } else if (this.second !== '') {
                    this.calculate();
                    this.operator = opr;
                }
                this.makeDisplayLine();
            },
            calculate() {
                if (this.first !== '' && this.second !== '' && this.operator !== null) {
                    let result;
                    let first = parseInt(this.first);
                    let second = parseInt(this.second);
                    switch (this.operator) {
                        case '+':
                            result = first + second;
                            break;
                        case '-':
                            result = first - second;
                            break;
                        case '*':
                            result = first * second;
                            break;
                        case '/':
                            result = first / second;
                            break;
                    }
                    this.result = result;
                    this.makeDisplayLine(1);
                    this.first = String(result);
                    this.second = '';
                    this.operator = null;
                }
            },
            clear() {
                this.first = '';
                this.second = '';
                this.operator = null;
                this.result = null;
                this.makeDisplayLine()
            },
            makeDisplayLine(equal = 0) {
                let first = this.first === null ? '' : this.first;
                let operator = this.operator === null ? '' : this.operator;
                let second = this.second === null ? '' : this.second;

                this.displayLine = first + ' ' + operator + ' ' + second;
                if (equal !== 0) {
                    this.displayLine += ' = ' + this.result;
                }
            },
            buttonClicked(b) {
                this.activeButton = b;
                setTimeout(() => {
                    this.activeButton = null;
                }, 200)
            }
        },
        created() {
            window.onkeyup = (e) => {
                let numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
                let operators = ['/', '*', '-', '+'];
                if (numbers.includes(e.key)) {
                    this.buttonClicked(e.key);
                    this.numberPressed(e.key);
                } else if (operators.includes(e.key)) {
                    this.buttonClicked(e.key);
                    this.process(e.key);
                } else if (e.key === 'Enter' || e.key === '=') {
                    this.buttonClicked('=');
                    this.calculate();
                } else if (e.key === 'Escape') {
                    this.buttonClicked('clear');
                    this.clear();
                }
            }
        }
    }
</script>

<style scoped>

    * {
        box-sizing: border-box;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .calc-body {
        width: 275px;
        margin: auto;
        min-height: 400px;
        border: solid 1px #3A4655;
        box-shadow: 0 8px 50px -7px black;
    }

    .calc-screen {
        background: #3A4655;
        width: 100%;
        height: 150px;
        padding: 20px;
    }

    .calc-operation {
        text-align: right;
        color: #727B86;
        min-height: 36px;
        font-size: 21px;
        padding-bottom: 10px;
        border-bottom: dotted 1px;
    }

    .calc-typed {
        margin-top: 20px;
        font-size: 45px;
        text-align: right;
        color: #fff;
    }

    .calc-button-row {
        width: 100%;
        background: #3C4857;
    }

    .button {
        width: 25%;
        background: #425062;
        color: #fff;
        padding: 20px;
        display: inline-block;
        font-size: 25px;
        text-align: center;
        vertical-align: middle;
        margin-right: -4px;
        border-right: solid 2px #3C4857;
        border-bottom: solid 2px #3C4857;
        transition: all 0.2s ease-in-out;
    }

    .button.dark {
        color: #AEB3BA;
        background: #404D5E;
    }

    .button.c {
        color: #D95D4E;
        background: #404D5E;
    }

    .button:hover {
        cursor: pointer;
        background: #E0B612;
    }

    .button.clicked {
        background: #E0B612;
    }

    .blink-me {
        color: #E0B612;
    }

</style>