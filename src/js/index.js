import moment from 'moment'

const recharge = document.querySelector('#recharge')
const rechargeButton = document.querySelector('#recharge-event')
const budgetAmount = document.querySelector('.budget-amount')
const regExp = /^\$?\d+(,\d{3})*(\.\d{1,5})?$/

rechargeButton.addEventListener('click', () => {
  if (checkDecimal(recharge.value)) {
    if (budgetAmount.innerHTML === '0') {
      budgetAmount.innerHTML = recharge.value
      refreshBalance()
    } else {
      budgetAmount.innerHTML = (
        parseFloat(recharge.value) + parseFloat(budgetAmount.innerHTML)
      ).toFixed(2)
      refreshBalance()
    }
    historyUpdate('Recarga de tarjeta', recharge.value)
  }
})

const expenseInput = document.querySelector('#expense-amount')
const expenseButton = document.querySelector('.expense-event')
const expenseAmount = document.querySelector('.expense-amount')

expenseButton.addEventListener('click', () => {
  if (checkDecimal(expenseInput.value)) {
    if (expenseAmount.innerHTML === '0') {
      expenseAmount.innerHTML = expenseInput.value * -1
      refreshBalance()
    } else {
      expenseAmount.innerHTML = (
        parseFloat(expenseInput.value) * -1 +
        parseFloat(expenseAmount.innerHTML)
      ).toFixed(2)
      refreshBalance()
    }
    const concept = document.querySelector('#expense-amount-title').value
    historyUpdate(concept, expenseAmount.innerHTML)
  }
})

const checkDecimal = (number) => {
  return !!regExp.test(number)
}

const balance = document.querySelector('.balance-amount')
const refreshBalance = () => {
  const budgetAmount = document.querySelector('.budget-amount').innerHTML
  const expenseAmount = document.querySelector('.expense-amount').innerHTML
  if (budgetAmount === '0' && expenseAmount === '0') {
    balance.innerHTML = '0'
  } else {
    balance.innerHTML = addNumbers(budgetAmount, expenseAmount)
    if (parseInt(balance.innerHTML) >= 0) {
      balance.classList.add('green')
      balance.classList.remove('red')
    } else {
      balance.classList.add('red')
      balance.classList.remove('green')
    }
  }
}

const addNumbers = (num1, num2) => {
  return parseFloat(num1) + parseFloat(num2)
}

const substractNumbers = (num1, num2) => {
  return parseFloat(num1) - parseFloat(num2)
}

const expenseHistoryTitle = document.querySelector('.expense-title-history')
const expenseHistoryAmount = document.querySelector('.expense-value-history')
const expenseHistoryDelete = document.querySelector('.edit')

const historyUpdate = (concept, amount) => {
  const conceptElement = document.createElement('div')
  const amountElement = document.createElement('div')
  const editElement = document.createElement('div')
  conceptElement.innerHTML = concept
  amountElement.innerHTML = amount + '€'
  const time = moment().format('MMMM Do YYYY, h:mm:ss a')
  editElement.innerHTML = time
  expenseHistoryTitle.append(conceptElement)
  expenseHistoryAmount.append(amountElement)
  expenseHistoryDelete.append(editElement)
}
