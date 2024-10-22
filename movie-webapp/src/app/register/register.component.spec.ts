import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { User } from '../model/user.model';
import { FormsModule } from '@angular/forms'; // Import FormsModule

class MockUserService {
  addUser(userData: User) {
    return of({
      userName: userData.userName,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phoneNo: userData.phoneNo,
    });
  }
}

class MockRouter {
  navigate(path: string[]) {}
}

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let userService: UserService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule], // Add FormsModule here
      declarations: [RegisterComponent],
      providers: [
        { provide: UserService, useClass: MockUserService },
        { provide: Router, useClass: MockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form fields to empty', () => {
    expect(component.userName).toBe('');
    expect(component.firstName).toBe('');
    expect(component.lastName).toBe('');
    expect(component.email).toBe('');
    expect(component.phone).toBe('');
    expect(component.password).toBe('');
    expect(component.confirmPassword).toBe('');
    expect(component.securityQuestion).toBe('');
    expect(component.securityAnswer).toBe('');
  });

  // it('should validate password correctly', () => {
  //   component.password = 'Short1!';
  //   component.confirmPassword = 'Short1!';
  //   component.validatePassword();
  //   expect(component.passwordErrors).toContain('Password must be at least 8 characters long.');

  //   component.password = 'Valid1!';
  //   component.validatePassword();
  //   expect(component.passwordErrors).toContain('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.');

  //   component.password = 'Valid1@Password';
  //   component.confirmPassword = 'Valid1@Password';
  //   component.validatePassword();
  //   expect(component.passwordErrors.length).toBe(0);
  // });

  it('should call onRegister() and handle successful registration', () => {
    spyOn(userService, 'addUser').and.callThrough();
    spyOn(router, 'navigate');

    component.userName = 'testUser';
    component.firstName = 'Test';
    component.lastName = 'User';
    component.email = 'test@example.com';
    component.phone = '1234567890';
    component.password = 'Valid1@Password';
    component.confirmPassword = 'Valid1@Password';
    component.securityQuestion = 'What is your pet\'s name?';
    component.securityAnswer = 'Fluffy';

    component.onRegister();

    expect(userService.addUser).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
    expect(component.passwordErrors.length).toBe(0);
  });

  // it('should handle registration error', () => {
  //   spyOn(userService, 'addUser').and.returnValue(throwError('Registration error'));
  //   spyOn(window, 'alert');

  //   component.onRegister();

  //   expect(window.alert).toHaveBeenCalledWith('Registration failed. Please try again.');
  // });

  it('should toggle password visibility', () => {
    expect(component.passwordVisible).toBeFalse();
    component.togglePasswordVisibility();
    expect(component.passwordVisible).toBeTrue();
    component.togglePasswordVisibility();
    expect(component.passwordVisible).toBeFalse();
  });

  it('should reset the form', () => {
    component.userName = 'testUser';
    component.resetForm();
    expect(component.userName).toBe('');
    expect(component.firstName).toBe('');
    expect(component.lastName).toBe('');
    expect(component.email).toBe('');
    expect(component.phone).toBe('');
    expect(component.password).toBe('');
    expect(component.confirmPassword).toBe('');
    expect(component.securityQuestion).toBe('');
    expect(component.securityAnswer).toBe('');
  });
});
