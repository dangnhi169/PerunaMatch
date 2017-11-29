import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { User } from '../../models/user';
import { Listing } from '../listing';
import { Favorite } from '../favorite';
import { Project } from '../../models/project';
import { UserDB } from './user-db';
import { projectsDB } from './project-db';
import { listingDB } from './listing-db';
import { favoriteDB } from './favorite-db'

export function fakeBackendFactory(backend: MockBackend, options: BaseRequestOptions) {
    // configure fake backend
    backend.connections.subscribe((connection: MockConnection) => {

        let users: User[] = JSON.parse(localStorage.getItem('users')) || UserDB;
        let listings: Listing[] = listingDB;
        let favorites: Favorite[] = favoriteDB;
      //  let projects: Project[] = projectsDB;
        console.log(listings);
        console.log(favorites);
      // JSON.parse(localStorage.getItem('listings')) ||
        let projects: Project[] = JSON.parse(localStorage.getItem('projects')) || projectsDB;
        console.log(projects);
        // wrap in timeout to simulate server api call
        setTimeout(() => {

            // API: To get all favorites
            if (connection.request.url.endsWith('/api/favorites') && connection.request.method === RequestMethod.Get) {
                if(!favoriteDB){
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 400 })
                    ));
                } else {
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 200, body: {favorites: favoriteDB}})
                    ));
                }
            }

            // API: To get all favorites with specific product id
            if (connection.request.url.match(/\/api\/favorites\/\d+$/) && connection.request.method === RequestMethod.Get) {
                /*  if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {*/
                if(!favoriteDB){
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 400 })
                    ));
                }else{
                    //find matching id in Favorites Array
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length-1]);
                    let matchedFavorites = favorites.filter(favorite => {return favorite.projectId === id;});

                    //respond with favorites that match the project ID
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 200, body: {favorites: matchedFavorites}})
                    ));
                }
            }
    
            // API: To get favorite with specific id
            if (connection.request.url.match(/\/api\/favorites\/edit\/\d+$/) && connection.request.method === RequestMethod.Get) {
                /*  if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {*/
                if(!favoriteDB){
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 400 })
                    ));
                }else{
                    //find matching id in Favorites Array
                    console.log("edit");
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length-1]);
                    let matchedFavorites = favorites.filter(favorite => {return favorite.id === id;});
                    console.log(matchedFavorites);
                    let favorite = matchedFavorites.length ? matchedFavorites[0] : null;
                    console.log(favorite);
                    //respond with favorites that match the project ID
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 200, body: {favorite: Favorite}})
                    ));
                }
            }
    
              // API: To get all projects with specific product id and corsponding favorites
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

                    var matchedFavorites = [];
                    var ml;
                    for (var i  = 0; i < matchedProjects.length; i++){
                        let projectId = matchedProjects[i].projectID;
                        //var matchedFavorites;
                        console.log(projectId);
                        let id = +projectId;
                        ml = favorites.filter(favorite => {return favorite.projectId === projectId;});
                        console.log(ml);
                        if(ml.length > 0)
                        for(var k = 0; k < ml.length;k++)
                            matchedFavorites.push(ml[k]);
                        console.log(matchedFavorites);
                    }
                    //console.log(matchedFavorites);
                    //respond with favorites that match the project ID
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 200, body: {projects: matchedProjects,favorites: matchedFavorites }})
                    ));
                }
            }
    
            // delete favorite
            if (connection.request.url.match(/\/api\/favorites\/\d+$/) && connection.request.method === RequestMethod.Delete) {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                //if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    console.log("delete");
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    for (let i = 0; i < favorites.length; i++) {
                        let favorite = favorites[i];
                        if (favorite.id === id) {
                            // delete user
                            favorites.splice(i, 1);
                            //localStorage.setItem('users', JSON.stringify(users));
                            break;
                        }
                    //  }
                    console.log(favorites);

                    // respond 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
                } //else {
                    // return 401 not authorised if token is null or invalid
                    //  connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                //  }

                return;
            }

                // add Favorite
            if (connection.request.url.endsWith('/api/dash/addFavorite') &&
            connection.request.method === RequestMethod.Post) {
                let receivedFavorite = JSON.parse(connection.request.getBody());
                //let newEmployee = Object.assign(receivedEmployee, {id: uuid.generate()});
                //data[data.length] = newEmployee;
                favorites.push(receivedFavorite);
                //localStorage.setItem('favorites', JSON.stringify(receivedFavorite));

                connection.mockRespond(new Response(new ResponseOptions({
                    status: 200,
                    body: {favorite: favoriteDB }
                })));

                return;
            }

            //update favorite
            if (connection.request.url.endsWith('/api/update') &&
            connection.request.method === RequestMethod.Put) {{
            console.log("in update");
            let receivedFavorite = JSON.parse(connection.request.getBody());
            //let clonedFavorite = receivedFavorite;
            console.log("cloned favorite" , receivedFavorite);
            receivedFavorite.start = new Date(receivedFavorite.start);
            receivedFavorite.end = new Date(receivedFavorite.end);
            let favoriteWasFound = false;
            favorites.some((element: Favorite, index: number) => {
                if (element.id === receivedFavorite.id) {
                console.log("found");
                    favorites[index] = receivedFavorite;
                    favoriteWasFound = true;
                    return true;
                }
            });
            if (!favoriteWasFound) {
                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 400,
                        body: 'Employee could not be updated because was not found'
                    })));
                } else {
                //  localStorage.setItem('employees', JSON.stringify(data));
                    //favorites[index] =
                    connection.mockRespond(new Response(new ResponseOptions({status: 200})));
                }

                return;
            }}

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
              if (!listingDB) {
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 400 })
                    ));
                }else {
                    // find matching id in Listings Array
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
                  //console.log("edit");
                  let urlParts = connection.request.url.split('/');
                  let id = parseInt(urlParts[urlParts.length-1]);
                  let matchedListings = listings.filter(listing => {return listing.id === id;});
                  //console.log(matchedListings);
                  let listing = matchedListings.length ? matchedListings[0] : null;
                //  console.log(listing);
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
                  //  console.log(projectId);
                    let id = +projectId;
                    ml = listings.filter(listing => {return listing.projectId === projectId;});
                  //  console.log(ml);
                    if(ml.length > 0)
                    for(var k = 0; k < ml.length;k++)
                    matchedListings.push(ml[k]);
                  //  console.log(matchedListings);
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
                    //console.log("delete");
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    for (let i = 0; i < listings.length; i++) {
                        let listing = listings[i];
                        if (listing.id === id) {
                            listings.splice(i, 1);
                            localStorage.setItem('listings', JSON.stringify(listings));
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


            // to get a SINGLE user from userId appended to end of URL
            if (connection.request.url.match(/\/api\/user\/\d+$/) && connection.request.method === RequestMethod.Get) {

                  if (!listingDB) {
                        connection.mockRespond(new Response(
                            new ResponseOptions({ status: 400 })
                        ));
                    }else {
                        // find matching id in Listings Array
                        const urlParts = connection.request.url.split('/');
                        const id = parseInt(urlParts[urlParts.length-1]);
                        const matchedUsers = users.filter(user => {return user.userID === id; });
                        const user = matchedUsers.length ? matchedUsers[0] : null;
                        console.log(user);
                        // respond with user that matches the userId
                        connection.mockRespond(new Response(
                            new ResponseOptions({ status: 200, body: {matchedUser: user} })
                        ));
                }
              }


        }, 500);

       // add Listing
    if (connection.request.url.endsWith('/api/dash/addListing') &&
        connection.request.method === RequestMethod.Post) {
        let receivedListing = JSON.parse(connection.request.getBody());
        listings.push(receivedListing);
        localStorage.setItem('listings', JSON.stringify(listings));

        connection.mockRespond(new Response(new ResponseOptions({
            status: 200,
            body: {listing: listingDB }
        })));

        return;
    }

//update lisitng
if (connection.request.url.endsWith('/api/update') &&
    connection.request.method === RequestMethod.Put) {{
    //  console.log("in update");
    let receivedListing = JSON.parse(connection.request.getBody());
    //let clonedListing = receivedListing;
  //  console.log("cloned listing" , receivedListing);
    receivedListing.start = new Date(receivedListing.start);
    receivedListing.end = new Date(receivedListing.end);
    let listingWasFound = false;
    listings.some((element: Listing, index: number) => {
        if (element.id === receivedListing.id) {
      //    console.log("found");
            listings[index] = receivedListing;
            listingWasFound = true;
            localStorage.setItem('listings', JSON.stringify(listings));
            return true;
        }
    });
    if (!listingWasFound) {
            connection.mockRespond(new Response(new ResponseOptions({
                status: 400,
                body: 'Listing not found'
            })));
        } else {
            connection.mockRespond(new Response(new ResponseOptions({status: 200})));
        }

        return;
  }}

    // add Project
 if (connection.request.url.endsWith('/api/dash/addProject') &&
     connection.request.method === RequestMethod.Post) {
    let receivedProject = JSON.parse(connection.request.getBody());
    receivedProject.projectID = projects[projects.length - 1].projectID + 1;
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

    // delete project
    if (connection.request.url.match(/\/api\/project\/\d+$/)
        && connection.request.method === RequestMethod.Delete) {

        let urlParts = connection.request.url.split('/');
        let id = parseInt(urlParts[urlParts.length - 1]);

        projects.forEach( function(item, i) {
            if(item.projectID == id){
                projects.splice(i, 1);
                localStorage.setItem('projects', JSON.stringify(projects));
            }
        });

        // return projects for the current poster
        let projectsForCurUser: Project[] = [];
        var curUserID = JSON.parse(localStorage.getItem('currentUser'));        
        projectsDB.forEach(element => {
            if(element.posterID === curUserID.token ){
                projectsForCurUser.push(element);
            }
        });

        // respond 200 OK
        connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: {projects: projectsForCurUser } })));
    }
    return;

  }, 10);

    return new Http(backend, options);
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: Http,
    useFactory: fakeBackendFactory,
    deps: [MockBackend, BaseRequestOptions]
};

function getUser(users: User[], username: string, password: string) {
    let currentUser;
    users.forEach(element => {
        if(element.username === username && element.password === password){
            currentUser = element;
        }
    });

    return currentUser || null;
}
