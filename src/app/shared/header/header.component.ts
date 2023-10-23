import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  userInfo: User;

  constructor(
    private userService: UserService
  ) {
    this.userInfo = userService.userInfo;
  }

  ngOnInit(): void {
  }

  logout() {
    this.userService.logout();
  }

}
