import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: []
})
export class SearchComponent implements OnInit {

  users: User[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({term}) => {
      this.globalSearch(term);
    })
  }

  globalSearch(term: string) {
    this.searchService.globalSearch(term).subscribe((resp: any) => {
      console.log(resp);
      this.users = resp.users;
      this.medicos = resp.medicos;
      this.hospitales = resp.hospitales;
    });
  }

}
