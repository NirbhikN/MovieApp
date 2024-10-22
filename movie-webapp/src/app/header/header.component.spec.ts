import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { AuthService } from '../auth.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

class MockAuthService {
  isLoggedIn$ = of(false); // Initial state as not logged in
  logout() { /* Mock logout method */ }
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useValue: {} } // Mock Router if needed
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges(); // Trigger initial data binding
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display Sign Up and Sign In buttons when not logged in', () => {
    component.isLoggedIn = false; // Ensure logged out state
    fixture.detectChanges();
    
    const signUpButton = fixture.debugElement.query(By.css('a[routerLink="register"]'));
    const signInButton = fixture.debugElement.query(By.css('a[routerLink="login"]'));
    
    expect(signUpButton).toBeTruthy();
    expect(signInButton).toBeTruthy();
  });

  it('should display Wishlist and Profile when logged in', () => {
    component.isLoggedIn = true; // Ensure logged in state
    fixture.detectChanges();
    
    const wishlistButton = fixture.debugElement.query(By.css('a[routerLink="wishlist"]'));
    const profileButton = fixture.debugElement.query(By.css('button#userDropdown'));
    
    expect(wishlistButton).toBeTruthy();
    expect(profileButton).toBeTruthy();
  });

  it('should call logout on AuthService when logout is invoked', () => {
    spyOn(authService, 'logout').and.callThrough();
    component.logout();
    
    expect(authService.logout).toHaveBeenCalled();
    expect(component.isLoggedIn).toBeFalse(); // Ensure isLoggedIn is updated
  });

  it('should update isLoggedIn when AuthService emits a new value', () => {
    component.isLoggedIn = false; // Ensure initial state is false
    authService.isLoggedIn$ = of(true); // Simulate user logging in
    authService.isLoggedIn$.subscribe(loggedIn => {
      component.isLoggedIn = loggedIn;
    });
    fixture.detectChanges();
    
    expect(component.isLoggedIn).toBeTrue(); // Verify the component reflects the new state
  });
});
