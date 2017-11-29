import { Component, OnInit, Input } from '@angular/core';
import { Favorite } from '../favorite';
import { Subscription } from 'rxjs/Subscription';
import { FavoriteService } from '../services/favorite.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.css']
})
export class FavoritesListComponent implements OnInit {

  favorites: Favorite[] = [];
  subscription: Subscription;
  @Input() projectId: number

  constructor(private favoriteService: FavoriteService, private route: ActivatedRoute,
    private router:Router) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.projectId = +params['id'];
      }
    );

    // Listen to see if favorites changed, use FavoriteService to get Favorites
    this.subscription = this.favoriteService.getFavorites()
    .subscribe(favorites => {
        this.favorites = favorites;
        console.log(this.favorites);
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
