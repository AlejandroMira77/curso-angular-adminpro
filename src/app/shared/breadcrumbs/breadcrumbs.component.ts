import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription, filter, map } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html'
})
export class BreadcrumbsComponent implements OnDestroy {

  title: string = '';
  titleSubs: Subscription;

  constructor(
    private router: Router
  ) {
    this.titleSubs = this.getDataRoute().subscribe( ({title}) => {
      this.title = title;
      document.title = `AdminPro - ${title}`
    });;
  }

  ngOnDestroy(): void {
    this.titleSubs.unsubscribe();
  }

  getDataRoute() {
    return this.router.events.pipe(
      filter((event): event is ActivationEnd => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data)
    );
  }

}
