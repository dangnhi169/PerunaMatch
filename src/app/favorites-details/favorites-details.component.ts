import { Component, OnInit, Input } from '@angular/core';
import { Favorite } from '../favorite';
import { FavoriteService } from '../services/favorite.service';
import { Subscription } from 'rxjs/Subscription';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-favorites-details',
  templateUrl: './favorites-details.component.html',
  styleUrls: ['./favorites-details.component.css']
})
export class FavoritesDetailsComponent implements OnInit {
  item: Favorite;
  @Input() id:number;
  subscription: Subscription;

  constructor(private favoriteService: FavoriteService,
    public activeModal: NgbActiveModal) { }

  ngOnInit() { 
    this.item = this.favoriteService.getFavorite(this.id);
  }
}
