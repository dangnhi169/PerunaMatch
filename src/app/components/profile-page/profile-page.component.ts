import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})

export class ProfilePageComponent implements OnInit {
  dummyUser = {
    name: 'Kevin Queenan',
    userName: 'kqueenan',
    profilePictureUrl: '../../../assets/dummyProfilePic.jpeg',
    strengths: ['machine learning', 'python', 'data science']
  };

  constructor() { }

  ngOnInit() { }

}
