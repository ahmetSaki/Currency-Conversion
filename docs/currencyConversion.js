document.getElementById('convertBtn').addEventListener('click', () => {
    const fromCurrency = document.getElementById('fromCurrency').value.trim().toUpperCase();
    const toCurrency = document.getElementById('toCurrency').value.trim().toUpperCase();
    const amount = parseFloat(document.getElementById('amount').value.trim());


    if (!currency) {
        document.getElementById('currency').innerHTML = '<p>Please enter a currency code.</p>';
        return;
    }

    const url = `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_mrBxmdvK0f2GoRn09TiQt3YhofUTERF2rLVhgtm0&currencies=${toCurrency}&base_currency=${fromCurrency}`;

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




document.getElementById('changeBtn').addEventListener('click', function () {
    //document.getElementById('changeBtn').style.transform = 'rotate(180deg)'
    var arrowLeft = document.getElementById('arrowLeft');
    var arrowRight = document.getElementById('arrowRight');


    if (arrowLeft.style.transform === 'rotate(180deg)') {
       
        arrowLeft.style.transform = 'rotate(0deg)';
    } else {
   
        arrowLeft.style.transform = 'rotate(180deg)';
    }

    
    if (arrowRight.style.transform === 'rotate(180deg)') {
       
        arrowRight.style.transform = 'rotate(0deg)';
    } else {
     
        arrowRight.style.transform = 'rotate(180deg)';
    }

    fromCurrency.classList.toggle('swap');
    toCurrency.classList.toggle('swap');


    fromCurrency.style.transition = 'none';
    toCurrency.style.transition = 'none';


    fromCurrency.offsetHeight;
    toCurrency.offsetHeight;


    let temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;


    fromCurrency.style.transition = '';
    toCurrency.style.transition = '';


    setTimeout(() => {
        fromCurrency.classList.toggle('swap');
        toCurrency.classList.toggle('swap');


    }, 10);
});




