import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { UserApiService } from '../../shared/http/user-api.service';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
	selector     : 'login',
	templateUrl  : './login.component.html',
	styleUrls    : ['./login.component.scss'],
	encapsulation: ViewEncapsulation.None,
	animations   : fuseAnimations
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	serverError: boolean;

	/**
	 * Constructor
	 *
	 * @param {FuseConfigService} _fuseConfigService
	 * @param {FormBuilder} _formBuilder
	 */
	constructor(
		private _fuseConfigService: FuseConfigService,
		private _formBuilder: FormBuilder,
		private userApiService: UserApiService,
		private authService: AuthService,
		private router: Router,
	) {
		// Configure the layout
		this._fuseConfigService.config = {
			layout: {
				navbar   : {
					hidden: true
				},
				toolbar  : {
					hidden: true
				},
				footer   : {
					hidden: true
				},
				sidepanel: {
					hidden: true
				}
			}
		};
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Lifecycle hooks
	// -----------------------------------------------------------------------------------------------------

	/**
	 * On init
	 */
	ngOnInit(): void
	{
		this.loginForm = this._formBuilder.group({
			email   : ['admin@project.com', [Validators.required, Validators.email]],
			password: ['password', Validators.required]
		});
	}

	submit() {
		if (!this.loginForm.valid) return;
		this.serverError = false;
		this.userApiService.signIn(this.loginForm.value)
			.subscribe(
				({user, token}) => {
					this.authService.setToken(token);
					this.authService.changeUser(user);
					console.log('submit user', user);
					this.router.navigate(['/admin/info']);
				},
				(e) => {
					this.serverError = true;
				},
			);  
	}
}
