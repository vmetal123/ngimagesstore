import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { AccountsRoutingModule } from './accounts-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [RegistrationComponent, LoginComponent, UsersComponent],
  imports: [CommonModule, AccountsRoutingModule, ReactiveFormsModule],
  exports: [RegistrationComponent, LoginComponent, UsersComponent],
})
export class AccountsModuleModule {}
