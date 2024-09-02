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
  .then(myData => {
    sessionStorage.setItem('myData', JSON.stringify(myData));
    console.log("Data is stored");

    window.dispatchEvent( new CustomEvent('dataReady', {detail: myData}));
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