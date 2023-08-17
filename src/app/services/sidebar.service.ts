import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Main', url: '/' },
        { title: 'ProgressBar', url: 'progress' },
        { title: 'Graph 1', url: 'graph1' },
        { title: 'Promise', url: 'promises' },
        { title: 'RxJs', url: 'rxjs' }
      ]
    }
  ];

  constructor() { }
}
