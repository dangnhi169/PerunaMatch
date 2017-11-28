import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http, Headers, Response } from '@angular/http';
import { Favorite } from '../favorite';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class FavoriteService {
    private favorites: Favorite[];
    private favoriteAdded: boolean;
    constructor(private http: Http){}
    favoritesChanged = new Subject<Favorite[]>();
    private favorite: Favorite;

    getFavorites(): Observable<Favorite[]>{
        return this.http.get('/api/favorites', JSON.stringify({}))
        .map((response: Response) => {
            // set token property (which is userid)
            this.favorites = response.json().favorites;
            console.log(this.favorites);
            return this.favorites;
        });
    }

    getFavoritesbyProjectId(id:number): Observable<Favorite[]>{
        return this.http.get('/api/favorites/' + id, JSON.stringify({}))
        .map((response: Response) => {
            this.favorites = response.json().favorites;
            return this.favorites;
        });
    }

    getFavoritesbyId(id:number): Observable<Favorite>{
        return this.http.get('/api/favorites/edit/' + id, JSON.stringify({}))
        .map((response: Response) => {
            this.favorite = response.json().favorite;
            return this.favorite;
        });
    }

    addFavorite(favorite:Favorite): Observable<Favorite[]> {
        return this.http.post('/api/dash/addFavorite', favorite)
        .map((response: Response) => {
            this.favorites = response.json().favorite;
            return this.favorites;
        });
    }

    updateFavorite(favorite: Favorite): Observable<Favorite> {
        console.log("in update favorites");
        return this.http.put('/api/update',favorite)
        .map(response => response.json())
    }

    deleteFavorite(id: number): Observable<Favorite> {
        return this.http.delete('/api/listing/' + id)
        .map(response => response.json());
    }

    getFavorite(index: number) {
        return this.favorites[index];
    }
}
