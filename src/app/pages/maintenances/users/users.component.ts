import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { SearchService } from 'src/app/services/search.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: []
})
export class UsersComponent implements OnInit, OnDestroy {

  totalUsers: number = 0;
  users: User[] = [];
  usersTemp: User[] = [];
  from: number = 0;
  loading: boolean = true;
  imgSubs!: Subscription;

  constructor(
    private userService: UserService,
    private search: SearchService,
    private modalImagenService: ModalImagenService
  ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.loadUsers();
    this.imgSubs = this.modalImagenService.newImage.subscribe(() => this.loadUsers());
  }

  loadUsers() {
    this.loading = true;
    this.userService.loadUsers(this.from).subscribe(
      ({ total, users }) => {
        this.totalUsers = total;
        this.users = users;
        this.usersTemp = users;
        this.loading = false;
      });
  }

  changePage(value: number) {
    this.from += value;
    if (this.from < 0) {
      this.from = 0;
    } else if (this.from >= this.totalUsers) {
      this.from -= value;
    }
    this.loadUsers();
  }

  searchUser(term: string) {
    if (term.length === 0) {
      return this.users = this.usersTemp;
    }
    this.search.search('usuarios', term).subscribe(resp => {
      this.users = resp
    });
    return true;
  }

  deleteUser(user: User) {
    if (user.uid === this.userService.uid) {
      return Swal.fire('Error', 'No puede borrarse a si mismo', 'error')
    }
    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Esta a punto de borrar a ${ user.name }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user).subscribe(resp => {
          Swal.fire(
            'Eliminado!',
            `El usuario ha sido eliminado`,
            'success'
          );
          this.loadUsers();
        });
      }
    });
    return;
  }

  changeRole(user: User) {
    this.userService.saveUser(user).subscribe();
  }

  openModal(user: User) {
    this.modalImagenService.showModal('usuarios', user.uid, user.img);
  }

}
