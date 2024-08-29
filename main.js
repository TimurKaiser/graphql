import { getToken } from "./module.js"


window.addEventListener('tokenReady', (event) => {
  const token = getToken();
  const url = "https://zone01normandie.org/api/graphql-engine/v1/graphql"

  const queryData = `{
    user {
      id
    }
  }
  `
  
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
  .then(data => {
      console.log(JSON.stringify(data))
  })
  
  .catch(error => {
      console.log(error)
  })
  
});












//const queryData = `{
//    user {
//      auditRatio
//      firstName
//      lastName
//    }
//    event_user {
//      event {
//        path
//      }
//      userLogin
//      level
//    }
//}`;



//const queryData = `{
//  user {
//    auditRatio
//    firstName
//    lastName
//  }
//  event_user {
//    userLogin
//    level
//  }
//}`

//const queryData = `{
//{
//  user {
//    auditRatio
//    firstName
//    lastName
//    xps {
//      amount
//      path
//    }
//  }
//
//
//  event_user {
//    userLogin
//    level
//    xp {
//      amount 
//    }
//    event {
//      path
//    }
//  }
//}
//}`