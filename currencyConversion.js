document.getElementById('convertBtn').addEventListener('click', () => {
    const fromCurrency = document.getElementById('fromCurrency').value.trim().toUpperCase();
    const toCurrency = document.getElementById('toCurrency').value.trim().toUpperCase();
    const amount = parseFloat(document.getElementById('amount').value.trim());  

    if (!currency) {
        document.getElementById('currency').innerHTML = '<p>Please enter a currency code.</p>';
        return;
    }



    const apiKey = 'fca_live_mrBxmdvK0f2GoRn09TiQt3YhofUTERF2rLVhgtm0';
    const url = `https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}&currencies=${toCurrency}&base_currency=${fromCurrency}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.data && data.data[toCurrency]) {
                const rate = data.data[toCurrency];
                const convertedAmount = (amount * rate).toFixed(2);
                const currencyData = `
                    <p>Exchange Rate (${fromCurrency} to ${toCurrency}): ${rate}</p>
                    <p>Converted Amount: ${convertedAmount} ${toCurrency}</p>`;
                document.getElementById('currency').innerHTML = currencyData;
            } else {
                document.getElementById('currency').innerHTML = `<p>Invalid currency code. Please try again.</p>`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('currency').innerHTML = '<p>An error occurred. Please try again.</p>';
        });
});
