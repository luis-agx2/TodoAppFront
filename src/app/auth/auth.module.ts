import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GenericsModule } from '../generics/generics.module';
import { MaterialModule } from '../material.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LayoutComponent } from './pages/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

@NgModule({
	declarations: [LoginComponent, RegisterComponent, LayoutComponent],
	imports: [CommonModule, AuthRoutingModule, MaterialModule, ReactiveFormsModule, RouterModule, GenericsModule]
})
export class AuthModule {}
