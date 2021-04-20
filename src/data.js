import Authenticator from './authenticator';

export default class Data {

    async getSecrets() {
        const myHeaders = new Headers();

        const myRequest = new Request('https://gongfetest.firebaseio.com/secrets.json', {
            method: 'GET',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default',
        });


        const response = await fetch(myRequest)
            .then(response => response.json())
            .then(data => {return data});

        return response;
    }

    async getUsers() {
        const myHeaders = new Headers();

        const myRequest = new Request('https://gongfetest.firebaseio.com/users.json', {
            method: 'GET',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default',
        });


        const response = await fetch(myRequest)
            .then(response => response.json())
            .then(data => {return data});

        return response;
    }


    checkLoginData(secrets, user) {
        console.log("secrets", secrets);
        let mapSecret = new Map(Object.entries(secrets));
        console.log("mapSecret", mapSecret);
        console.log("user", user);


        const auth = new Authenticator();
        const secret = auth.encode(user.username, user.password);
        console.log("secret", secret);

        const userId = mapSecret.get(secret);
        console.log("userId", userId);
        return userId;
    }

    //Not in use
    async updatePassword(data) {
        const myHeaders = new Headers(
            {
                "dataType": "json",
                "contentType": "application/json"
            },
        );
        const auth = new Authenticator();
        const secret = auth.encode(data.selectedEmployee.email, data.password);
        console.log("new secret!", secret);
        const myRequest = new Request('https://gongfetest.firebaseio.com/users/12321.json', {
            method: 'POST',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify(data.password) // body data type must match "Content-Type" header
        });


        const response = await fetch(myRequest)
            .then(response => response.json())
            .then(data => {return data});

        return response;
    }

    async updateEmployee(selectedEmployee) {
        console.log("Updating employee with index", selectedEmployee.index);
        const myHeaders = new Headers(
            {
                "dataType": "json",
                "contentType": "application/json",
                '_method': 'PATCH',
                'Authorization': ''
            },
        );

        const myRequest = new Request(`https://gongfetest.firebaseio.com/users/${selectedEmployee.index}.json`, {
            method: 'PATCH',
            headers: myHeaders,
            cache: 'default',
            body: JSON.stringify({"age": selectedEmployee.age})
        });


        const response = await fetch(myRequest)
            .then(response => response.json())
            .then(data => {return data});

        return response;
    }

    async deleteEmployee(selectedEmployee) {

        console.log("Deleteing employee with index", selectedEmployee.index);
        const myRequest = new Request(`https://gongfetest.firebaseio.com/users/${selectedEmployee.index}/age.json`, {
            method: 'DELETE'
        });


        const response = await fetch(myRequest)
            .then(response => response.json())
            .then(data => {return data})
            .catch(data=> {
                console.log("Que paso?");
                return data
            });

        return response;
    }

}