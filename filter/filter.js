
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
                skill.amount = skill.amount / 100;
            }
            return acc;
        }, {});

        let technoKeys = ['skill_go', 'skill_js', 'skill_html', 'skill_css', 'skill_unix', 'skill_docker'];
        let techno = {};
        let skills = {};


            Object.keys(groupedSkills).forEach((key) => {
                if (technoKeys.includes(key)) {
                    techno[key] = groupedSkills[key];
                } else {
                    skills[key] = groupedSkills[key];
                }
            });
            
            console.log(skills);
            console.log(techno);


            const event = new CustomEvent('skillReady', {detail: skills});
            window.dispatchEvent(event);


        } else {
        console.log("No data in filter");
    }
});