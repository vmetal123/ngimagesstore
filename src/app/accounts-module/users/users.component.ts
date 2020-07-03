import { Component, OnInit } from '@angular/core';

import { AccountService } from '../../services/account.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  private $usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(null);
  $users = this.$usersSubject.asObservable();

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.$users = this.accountService.getUsers().pipe(
      tap(console.log)
    );
  }

}
