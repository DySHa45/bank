async function fetchExchangeRates() {
    const response = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
    const data = await response.json();
    return data;
}

function updateExchangeRates() {
    fetchExchangeRates().then(data => {
        const tableBody = document.querySelector('#exchangeRates tbody');
        tableBody.innerHTML = ''; 

        data.forEach(rate => {
            const row = document.createElement('tr');
            const currencyCell = document.createElement('td');
            const rateCell = document.createElement('td');

            currencyCell.textContent = rate.cc;
            rateCell.textContent = rate.rate.toFixed(2);

            row.appendChild(currencyCell);
            row.appendChild(rateCell);
            tableBody.appendChild(row);
        });
    }).catch(error => {
        console.error('Error fetching exchange rates:', error);
    });
}
updateExchangeRates();

setInterval(updateExchangeRates, 600000);
