import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(
    private settingsService: SettingsService
  ) { }

  ngOnInit(): void {
    this.settingsService.checkCurrentTheme();
  }
  
  changeTheme(colorTheme: string) {
    this.settingsService.changeTheme(colorTheme);
  }
}
