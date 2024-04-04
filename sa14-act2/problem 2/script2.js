const convertButton = document.getElementById("convertButton")
convertButton.addEventListener('click', async function() {
    const sourceCurrency = document.getElementById("sourceCurr").value;
    const targetCurrency = document.getElementById("targetCurr").value;
    const amount = document.getElementById("amount").value;
    const result = document.getElementById("result");

    try {
        const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${sourceCurrency}.json`);
        const data = await response.json();
        console.log(data)

        const rate = data[sourceCurrency][targetCurrency]
        console.log(rate)
        const convertedAmount = (rate * amount).toFixed(2)
        result.innerHTML = `Converted Amount: ${convertedAmount} ${targetCurrency.toUpperCase()} Exchange Rate: ${rate.toFixed(4)}`

    } catch (error) {
        console.error(error)
    }



    

}

)
