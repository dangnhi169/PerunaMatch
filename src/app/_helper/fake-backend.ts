import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { User } from '../../models/user';
import { UsersDB } from './user-db'; 
 
export function fakeBackendFactory(backend: MockBackend, options: BaseRequestOptions) {
    // configure fake backend
    backend.connections.subscribe((connection: MockConnection) => {
        
        let users: User[] = JSON.parse(localStorage.getItem('users')) || UsersDB;
 
        // wrap in timeout to simulate server api call
        setTimeout(() => {
 
            // API: To get a user
            if (connection.request.url.endsWith('/api/user') && connection.request.method === RequestMethod.Post) {
                // get parameters from post request
                let params = JSON.parse(connection.request.getBody());
                let currentUser: any = getUser(users, params.username, params.password);
 
                // check user credentials and return fake jwt token if valid
                if (currentUser) {
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 200, body: {token: currentUser.userID}})
                    ));
                } else {
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 200 })
                    ));
                }
            }

            // API: To create a user
            if (connection.request.url.endsWith('/api/user') && connection.request.method === RequestMethod.Put) {
                // get parameters from post request
                let params = JSON.parse(connection.request.getBody());
                let existedUser: any = getUser(users, params.username, params.password);              
    
                // user exist. can't create same user
                if (existedUser) {
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 401 })
                    ));
                } else {
                    let newUser: User = {
                        userID: params.userID,
                        username: params.username,
                        password: params.password,
                        email: params.email,
                        isProfessor: params.isProfessor
                    }
                    users.push(newUser);
                    localStorage.setItem('users', JSON.stringify(users));                    
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 200, body: {token: newUser.userID}})
                    ));
                }
            }
 
            // to get all users
            if (connection.request.url.endsWith('/api/users') && connection.request.method === RequestMethod.Get) {
                // check for fake auth token in header and return test users if valid, this security is implemented server side
                // in a real application
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 200, body: users })
                    ));
                } else {
                    // return 401 not authorised if token is null or invalid
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 401 })
                    ));
                }
            }
 
        }, 500);
 
    });
 
    return new Http(backend, options);
}
 
export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: Http,
    useFactory: fakeBackendFactory,
    deps: [MockBackend, BaseRequestOptions]
};

function getUser(users: User[], username: string, password: string){
    let currentUser;
    users.forEach(element => {
        if(element.username === username && element.password === password){
            currentUser = element;
        }
    });

    return currentUser || null;
}