import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesDetailsComponent } from './favorites-details.component';

describe('FavoritesDetailsComponent', () => {
  let component: FavoritesDetailsComponent;
  let fixture: ComponentFixture<FavoritesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoritesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
