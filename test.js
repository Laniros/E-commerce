fetch = require('node-fetch');
const User = require('./models/user');

async function BackTest() {
    //check signup
    let ans = await signUp("testRoy", "testRoy@gmail.com", "123456");
    checkIfValuesAreOk("testRoy", ans.user.name);
    checkIfValuesAreOk("testRoy@gmail.com", ans.user.email);
    //check signin
    let ans1 = await signIn("roy.einhorn@gmail.com", "310056932");
    checkIfValuesAreOk("Roy", ans1.user.name);
    checkIfValuesAreOk("roy.einhorn@gmail.com", ans1.user.email);
    //cant check token because changes
    //delete category
    const data = await signIn("laniros18692@gmail.com", "123123");

    const {token} = data;
    const id = data.user._id;
    //delete toDelete category from DB
    await deleteCategory("5d73c456c7e3b11ac4289020", token);

    //search by product
    let response = await searchSpecificGame('Control PS4', token);
    const {name} = response[0];
    checkIfValuesAreOk(name, "Control PS4");

    //update profile
    //change name
    let update = await updateProfile("Or Lanir", "laniros18692@gmail.com", id, token)

    //get category Info
    let ps4 = await getCategoryInfo("5d66865165a8cb1a845ddf73");
    checkIfValuesAreOk("PS4", ps4.name)

}

BackTest();


function checkIfValuesAreOk(test, realVal) {
    console.assert(test === realVal, `wrong answer , expected: ${realVal}  but was: ${test}`);
}

async function signUp(name, email, password) {
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

async function deleteCategory(categoryId, token) {
    let url = "http://localhost:5000/api/category/" + categoryId + "/5d66811793021d291424c4af";
    return fetch(url, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
}

async function searchSpecificGame(gameName, token) {
    return fetch("http://localhost:5000/api/products/search?search=control", {
            method: "GET",
            headers: {'Content-Type': 'application/json'}

        }
    ).then(res => res.json())

}

async function updateProfile(newName, newEmail, userId, token) {
    return fetch("http://localhost:5000/api/user/" + userId, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                body: JSON.stringify({
                    name: newName,
                    email: newEmail,
                    password: "123123"
                })
            }
        }
    )

}

async function getCategoryInfo(categoryId, token) {
    let url = "http://localhost:5000/api/category/" + categoryId;
    return fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then(res => res.json())
}


