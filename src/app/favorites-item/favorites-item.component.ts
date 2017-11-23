import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { Listing } from '../listing';

@Component({
  selector: 'app-favorites-item',
  templateUrl: './favorites-item.component.html',
  styleUrls: ['./favorites-item.component.css']
})
export class FavoritesItemComponent implements OnInit {

  @Input() favorite: Listing;
  @Input() index: number;

  ngOnInit() { }

  remove() { }
}
