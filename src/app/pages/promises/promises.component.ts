import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styleUrls: []
})
export class PromisesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getUsers().then(resp => console.log(resp));
    // const promesa = new Promise( (resolve, reject) => {
    //   if (false) {
    //     resolve('Hola Mundo');
    //   } else {
    //     reject('Algo salio mal');
    //   }
    // });

    // promesa.then( mensaje => console.log(mensaje))
    // .catch( error => console.log('Error en mi promesa', error) );
  }

  getUsers() {
    return new Promise(resolve => {
      fetch('https://reqres.in/api/users')
      .then(resp => resp.json())
      .then(body => resolve(body.data))
    });
  }

}
