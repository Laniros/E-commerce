fetch = require('node-fetch');
const User = require('./models/user');

async  function BackTest() {
  /*  //check signup
    let ans = await signUp("testRoy","testRoy@gmail.com", "123456");
    checkIfValuesAreOk ("testRoy", ans.user.name);
    checkIfValuesAreOk ("testRoy@gmail.com", ans.user.email);
*/
    //check signin
   let ans = await signIn("roy.einhorn@gmail.com", "310056932");
    checkIfValuesAreOk ("Roy", ans.user.name);
    checkIfValuesAreOk ( "roy.einhorn@gmail.com", ans.user.email);
    //cant check token because changes


}
BackTest();


function checkIfValuesAreOk (ans, number) {
    console.assert( ans === number, `wrong answer , expected: ${ans}  but was: ${number}`);
}

async function signUp (name,email, password) {
    return fetch('http://localhost:5000/api/signup', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        })
    }).then(res => res.json());
}

async function signIn(email, password) {
    return fetch('http://localhost:5000/api/signin', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: email,
            password: password
        })
    }).then(res => res.json());
}
