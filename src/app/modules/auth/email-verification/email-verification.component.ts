import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../core/auth/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'app-email-verification',
    templateUrl: './email-verification.component.html',
})
export class EmailVerificationComponent implements OnInit {

    token: string;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _snackService: MatSnackBar,
        private _router: Router,
    ) {
        this._activatedRoute.params.subscribe(params => {
            if (params?.token) {
                this.token = params?.token;
                this.validateEmail();
            }
        });
    }

    ngOnInit(): void {
    }

    async validateEmail(): Promise<void> {
        try {
            await this._authService.verificationEmail(this.token).toPromise();
            this._router.navigate(['iniciar-sesion']);
            this._snackService.open('Verificacion de correo exitosamente',
                'Cerrar', {duration: 2000});
        } catch (err) {
            throw new Error(err);
        }
    }

}
