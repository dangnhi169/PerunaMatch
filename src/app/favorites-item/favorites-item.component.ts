import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { Favorite } from '../favorite';

@Component({
  selector: 'app-favorites-item',
  templateUrl: './favorites-item.component.html',
  styleUrls: ['./favorites-item.component.css']
})
export class FavoritesItemComponent implements OnInit {

  @Input() favorite: Favorite;
  @Input() index: number;

  ngOnInit() {
    console.log(this.favorite);
  }

  removeFavorite() {
    
  }
}
