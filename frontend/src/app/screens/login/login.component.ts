import { Component } from '@angular/core';
import { UtilsService } from '../utils/utils.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedFacade } from '../../state/shared.facade';
import { RegisterComponent } from './components/register/register.component';
import { LoadingComponent } from '../components/loading/loading.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  providers: [UtilsService, UserService, SharedFacade],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    RegisterComponent,
    LoadingComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  registerView: boolean;
  isLoading$: Observable<boolean>;

  constructor(
    public utils: UtilsService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private sharedFacade: SharedFacade
  ) {
    this.isLoading$ = this.sharedFacade.appLoading$;
    this.registerView = false;
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  navigateToHomeAdmin() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.sharedFacade.setLoading(true);
      this.userService
        .getUser(this.loginForm.value.email)
        .subscribe((res: any) => {
          this.sharedFacade.setLoading(false);
          this.sharedFacade.setUserInformation(res);
          if (res['password'] === this.loginForm.value.password) {
            this.utils.navigateTo('/admin');
          } else {
            alert('Invalid password');
          }
        });
    }
  }

  backToLogin() {
    this.registerView = false;
  }
}
