import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { UtilsService } from '../../../utils/utils.service';

@Component({
  selector: 'app-register',
  standalone: true,
  providers: [UserService, UtilsService],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  @Output() registerView = new EventEmitter<void>();

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    public utils: UtilsService
  ){
    // INITIALIZE REGISTER FORM
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      name: ['', Validators.compose([Validators.required])],
      phone: ['', Validators.compose([Validators.required])],
      country: ['', Validators.compose([Validators.required])],
      city: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  navigateToLogin() {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.valid) {
      this.userService.createUser({
        ...this.registerForm.value,
        type: 'USER'
      }).subscribe((res: any) => {
        if (res) {
          this.utils.navigateTo('/login');
        }
      });
    }
  }

  backToLogin() {
    this.registerView.emit();
  }
}
