const selectFrom = document.querySelector('#from-currency');
const selectToCurrencie = document.querySelector('#to-currency');
const form = document.querySelector('form');

function makeRequest(url) {
    const xhr = new XMLHttpRequest();
    
    xhr.addEventListener('load', function(res) {
        if (res.target.status === 200) {
            const response = JSON.parse(res.target.response);

            showCurrencies({
                base: response.base,
                rates: response.rates
            });
        } else {
            console.error(res.target.response);
        }
    });
    xhr.open('GET', url);
    xhr.send();
}

function showCurrencies(options) {
    const selectCurrencieEl = document.querySelectorAll('select');
    selectCurrencieEl.forEach(element => element.innerHTML = '');

    const currencieNames = Object.keys(options.rates);
    const rate = Object.values(options.rates);

    const baseElement = document.createElement('option');
    selectFrom.appendChild(baseElement);
    baseElement.textContent = options.base;

    //loop through all the rates and add an option element for each rate
    currencieNames.forEach((curName, index) => {
        selectCurrencieEl.forEach(element => {
            const optionEl = document.createElement('option');
            optionEl.setAttribute('value', rate[index]);
            optionEl.textContent = curName;
            element.appendChild(optionEl);
        });
    });
}

//convert the value user entered from one currency to another
function calculate() {
    const showConvertedVal = document.querySelector('.converted-value');
    let convertedValue = 0;
    //value user enters
    const convertValue = document.querySelector('#value').value;
    //value of the currency user wants to convert to
    const convertToValue = selectToCurrencie.options[selectToCurrencie.options.selectedIndex].getAttribute('value');

    convertedValue = convertValue * convertToValue;
    //converted currency name
    const convertedCurName = selectToCurrencie.options[selectToCurrencie.options.selectedIndex].textContent;
    showConvertedVal.textContent = `${convertedValue} ${convertedCurName}`;
}
//make a call to the api to get different rates from currency user chooses
selectFrom.addEventListener('change', function() {
    const base = this.options[this.selectedIndex].textContent;
    makeRequest(`https://api.exchangeratesapi.io/latest?base=${base}`);
});

form.addEventListener('submit', e => {
    e.preventDefault();
    calculate();
});

makeRequest('https://api.exchangeratesapi.io/latest');