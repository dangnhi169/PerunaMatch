import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { User } from '../../models/user';
import { Listing } from '../listing';
import { Project } from '../../models/project';
import { UserDB } from './user-db';
import { projectsDB } from './project-db';
import { listingDB } from './listing-db';

export function fakeBackendFactory(backend: MockBackend, options: BaseRequestOptions) {
    // configure fake backend
    backend.connections.subscribe((connection: MockConnection) => {

        let users: User[] = JSON.parse(localStorage.getItem('users')) || UserDB;
        let listings: Listing[] = listingDB;
      //  let projects: Project[] = projectsDB;
        console.log(listings);
      // JSON.parse(localStorage.getItem('listings')) ||
        let projects: Project[] = JSON.parse(localStorage.getItem('projects')) || projectsDB;
        // wrap in timeout to simulate server api call
        setTimeout(() => {

            // API: To get a user
            if (connection.request.url.endsWith('/api/login') && connection.request.method === RequestMethod.Post) {
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

            // API: To get all projects
            if (connection.request.url.endsWith('/api/projects') && connection.request.method === RequestMethod.Get) {
                if(!projectsDB){
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 400 })
                    ));
                } else {
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 200, body: {projects: projectsDB}})
                    ));
                }
            }

            // API: To get all listings
            if (connection.request.url.endsWith('/api/listing') && connection.request.method === RequestMethod.Get) {
                if(!listingDB){
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 400 })
                    ));
                } else {
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 200, body: {listings: listingDB}})
                    ));
                }
            }

            // API: To get all listings with specific product id
            if (connection.request.url.match(/\/api\/listing\/\d+$/) && connection.request.method === RequestMethod.Get) {
            /*  if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {*/
              if(!listingDB){
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 400 })
                    ));
                }else{
                    //find matching id in Listings Array
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length-1]);
                    let matchedListings = listings.filter(listing => {return listing.projectId === id;});

                    //respond with listings that match the project ID
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 200, body: {listings: matchedListings}})
                    ));
            }
          }

          // API: To get listing with specific id
          if (connection.request.url.match(/\/api\/listing\/edit\/\d+$/) && connection.request.method === RequestMethod.Get) {
          /*  if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {*/
            if(!listingDB){
                  connection.mockRespond(new Response(
                      new ResponseOptions({ status: 400 })
                  ));
              }else{
                  //find matching id in Listings Array
                  console.log("edit");
                  let urlParts = connection.request.url.split('/');
                  let id = parseInt(urlParts[urlParts.length-1]);
                  let matchedListings = listings.filter(listing => {return listing.id === id;});
                  console.log(matchedListings);
                  let listing = matchedListings.length ? matchedListings[0] : null;
                  console.log(listing);
                  //respond with listings that match the project ID
                  connection.mockRespond(new Response(
                      new ResponseOptions({ status: 200, body: {listing: listing}})
                  ));
          }
        }

          // API: To get all projects with specific product id and corsponding listings
          if (connection.request.url.match(/\/api\/dash\/\d+$/) && connection.request.method === RequestMethod.Get) {
          /*  if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {*/
            if(!projectsDB){
                  connection.mockRespond(new Response(
                      new ResponseOptions({ status: 400 })
                  ));
              }else{
                  //find matching id in Projects Array
                  let urlParts = connection.request.url.split('/');
                  let id = parseInt(urlParts[urlParts.length-1]);
                  let matchedProjects = projects.filter(project => {return project.posterID === id;});

                  var matchedListings = [];
                  var ml;
                  for (var i  = 0; i < matchedProjects.length; i++){
                    let projectId = matchedProjects[i].projectID;
                    //var matchedListings;
                    console.log(projectId);
                    let id = +projectId;
                    ml = listings.filter(listing => {return listing.projectId === projectId;});
                    console.log(ml);
                    if(ml.length > 0)
                    for(var k = 0; k < ml.length;k++)
                    matchedListings.push(ml[k]);
                    console.log(matchedListings);
                  }
                  //console.log(matchedListings);
                  //respond with listings that match the project ID
                  connection.mockRespond(new Response(
                      new ResponseOptions({ status: 200, body: {projects: matchedProjects,listings: matchedListings }})
                  ));
          }
        }

        // delete listing
            if (connection.request.url.match(/\/api\/listing\/\d+$/) && connection.request.method === RequestMethod.Delete) {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                //if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    console.log("delete");
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    for (let i = 0; i < listings.length; i++) {
                        let listing = listings[i];
                        if (listing.id === id) {
                            // delete user
                            listings.splice(i, 1);
                            //localStorage.setItem('users', JSON.stringify(users));
                            break;
                        }
                  //  }
                    console.log(listings);

                    // respond 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
                } //else {
                    // return 401 not authorised if token is null or invalid
                  //  connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
              //  }

                return;
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

       // add Listing
    if (connection.request.url.endsWith('/api/dash/addListing') &&
        connection.request.method === RequestMethod.Post) {
        let receivedListing = JSON.parse(connection.request.getBody());
        //let newEmployee = Object.assign(receivedEmployee, {id: uuid.generate()});
        //data[data.length] = newEmployee;
        listings.push(receivedListing);
        //localStorage.setItem('listings', JSON.stringify(receivedListing));

        connection.mockRespond(new Response(new ResponseOptions({
            status: 200,
            body: {listing: listingDB }
        })));

        return;
    }

//update lisitng
if (connection.request.url.endsWith('/api/update') &&
    connection.request.method === RequestMethod.Put) {{
      console.log("in update");
    let receivedListing = JSON.parse(connection.request.getBody());
    //let clonedListing = receivedListing;
    console.log("cloned listing" , receivedListing);
    receivedListing.start = new Date(receivedListing.start);
    receivedListing.end = new Date(receivedListing.end);
    let listingWasFound = false;
    listings.some((element: Listing, index: number) => {
        if (element.id === receivedListing.id) {
          console.log("found");
            listings[index] = receivedListing;
            listingWasFound = true;
            return true;
        }
    });
    if (!listingWasFound) {
            connection.mockRespond(new Response(new ResponseOptions({
                status: 400,
                body: 'Employee could not be updated because was not found'
            })));
        } else {
          //  localStorage.setItem('employees', JSON.stringify(data));
            //listings[index] =
            connection.mockRespond(new Response(new ResponseOptions({status: 200})));
        }

        return;
  }}

    // add Project
 if (connection.request.url.endsWith('/api/dash/addProject') &&
     connection.request.method === RequestMethod.Post) {
    let receivedProject = JSON.parse(connection.request.getBody());
    receivedProject.projectID = projects.length;
     projects.push(receivedProject);
     localStorage.setItem('projects', JSON.stringify(projects));

     // return projects for the current poster
     let projectsForCurUser: Project[] = [];
     projectsDB.forEach(element => {
        if(element.posterID === receivedProject.posterID ){
            projectsForCurUser.push(element);
        }
    });

     connection.mockRespond(new Response(new ResponseOptions({
         status: 200,
         body: {projects: projectsForCurUser }
     })));

     return;
 }



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
