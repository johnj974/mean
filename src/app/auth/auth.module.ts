import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './signup/signup.component';

@NgModule({
  declarations: [LoginComponent, SignUpComponent],
  imports: [FormsModule, CommonModule, MaterialModule, AuthRoutingModule],
})
export class AuthModule {}
