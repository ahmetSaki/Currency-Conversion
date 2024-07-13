document.getElementById('convertBtn').addEventListener('click', () => {
    const currency = document.getElementById('moneyCode').value.trim().toUpperCase();

    if (!currency) {
        document.getElementById('currency').innerHTML = '<p>Please enter a currency code.</p>';
        return;
    }

    const apiKey = 'fca_live_mrBxmdvK0f2GoRn09TiQt3YhofUTERF2rLVhgtm0';
    const url = `https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}&currencies=${currency}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.data && data.data[currency]) {
                const rate = data.data[currency];
                const currencyData = `
                    <p>Exchange Rate (1 USD to ${currency}): ${rate}</p>`;
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
