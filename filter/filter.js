window.addEventListener('dataReady', (event) => {
    const getData = sessionStorage.getItem('myData')
    if (getData) {
        // convertir la chaine en json pour plus de manipulation
        const myData = JSON.parse(getData);
        const transactions = myData.data.transaction;
        const skillTransaction = transactions.filter(transaction => transaction.type.includes('skill_'))

        console.log(skillTransaction);


    } else {
        console.log("No data in filter")
    }


});






