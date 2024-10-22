import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResetComponent } from './reset.component';
import { FormBuilder, ReactiveFormsModule, FormsModule, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar
import { Router } from '@angular/router'; // Import Router for navigation
import { UserService } from '../service/user.service'; // Import the UserService
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ResetComponent', () => {
  let component: ResetComponent;
  let fixture: ComponentFixture<ResetComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['resetPassword']);
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ResetComponent],
      imports: [ReactiveFormsModule, FormsModule], // Import necessary modules for form handling
      providers: [
        FormBuilder,
        { provide: UserService, useValue: userServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
        { provide: Router, useValue: routerSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA], // Ignore unknown elements like material components
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with valid fields', () => {
    const form = component.forgotPasswordForm;
    expect(form).toBeDefined();
    expect(form.get('email')).toBeDefined();
    expect(form.get('securityQuestion')).toBeDefined();
    expect(form.get('securityAnswer')).toBeDefined();
    expect(form.get('newPassword')).toBeDefined();
  });

  it('should open snackbar with correct message and action', () => {
    const message = 'Password reset successfully';
    const action = 'Close';
    component.openSnackBar(message, action);

    expect(snackBar.open).toHaveBeenCalledWith(message, action, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['custom-snackbar'],
    });
  });

  it('should mark all fields as touched if form is invalid on submit', () => {
    const invalidFormValues = {
      email: '',
      securityQuestion: '',
      securityAnswer: '',
      newPassword: ''
    };

    component.forgotPasswordForm.setValue(invalidFormValues);

    component.onSubmit();

    expect(component.forgotPasswordForm.get('email')?.touched).toBeTrue();
    expect(component.forgotPasswordForm.get('securityQuestion')?.touched).toBeTrue();
    expect(component.forgotPasswordForm.get('securityAnswer')?.touched).toBeTrue();
    expect(component.forgotPasswordForm.get('newPassword')?.touched).toBeTrue();
  });
});
