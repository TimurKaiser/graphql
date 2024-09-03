window.addEventListener('dataReady', (event) => {
    const getData = sessionStorage.getItem('myData');
    
    if (getData) {
        // Convertir la chaîne en JSON pour plus de manipulation
        const myData = JSON.parse(getData);
        const transactions = myData.data.transaction;

        const skillTransaction = transactions.filter(transaction => transaction.type.includes('skill_'));


        // si le tableau acc pour le type skill.type n'existe pas le créé
        // et push tout les skill dedans
        // reduce vas aller parcourir et push implémenter
        const groupedSkills = skillTransaction.reduce((acc, skill) => {
            if (!acc[skill.type] || skill.amount > acc[skill.type].amount) {
                acc[skill.type] = skill;
            }
            return acc;
        }, {});

        console.log(groupedSkills);
        
    } else {
        console.log("No data in filter");
    }
});
