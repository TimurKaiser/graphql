window.addEventListener('dataReady', (event) => {
    const storedData = sessionStorage.getItem('myData')
    if (storedData) {
        console.log("Test : ", storedData)
    } else {
        console.log("No data")
    }
})