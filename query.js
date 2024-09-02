import { getToken } from "./module.js"



const queryData = `{
  user {
    firstName
    lastName
    id
  }
  transaction {
    type
    amount
    attrs
    createdAt
    path  
  }
}
`


window.addEventListener('tokenReady', (event) => {
  const token = getToken();
  const url = "https://zone01normandie.org/api/graphql-engine/v1/graphql"
  
  fetch(url, {
      method:"POST",
      headers: {
          "Content-Type": "application/json",
          //Bearer est utilisé car c'est un token et nom user+mdp
          "Authorization": `Bearer ${token}`
      },  
      body: JSON.stringify({query: queryData})
  })
  
  .then(response => response.json())
  .then(dataBase => {

    const transactions = dataBase.data.transaction;
    const skillTransaction = transactions.filter(transaction => 
      typeof transaction.type === 'string' && transaction.type.startsWith('skill_')
    );

      console.log(JSON.stringify(skillTransaction))
  })
  
  .catch(error => {
      console.log(error)
  })
  
});


//{
//  user {
//    firstName
//    lastName
//    id
//  }
//  transaction {
//    type
//    amount
//    attrs
//    createdAt
//    path
//    
//    
//  }
//  event_user {
//    level
//    userLogin
//    
//    event {
//      path
//    }
//  }
//}