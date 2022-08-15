import { Route } from '@angular/router';
import {EmailVerificationComponent} from './email-verification.component';

export const authEmailVerificationRoutes: Route[] = [
    {
        path     : ':token',
        component: EmailVerificationComponent
    }
];
