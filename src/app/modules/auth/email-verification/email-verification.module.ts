import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailVerificationComponent } from './email-verification.component';
import {RouterModule} from '@angular/router';
import {authEmailVerificationRoutes} from './email-verification.routing';
import {MatButtonModule} from '@angular/material/button';
import {FuseCardModule} from '../../../../@fuse/components/card';
import {SharedModule} from '../../../shared/shared.module';



@NgModule({
  declarations: [
    EmailVerificationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(authEmailVerificationRoutes),
    MatButtonModule,
    FuseCardModule,
    SharedModule
  ]
})
export class EmailVerificationModule { }
