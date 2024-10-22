import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA], // We use NO_ERRORS_SCHEMA to ignore unknown elements like app-header or app-footer
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Detect changes after creating component
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct title', () => {
    expect(component.title).toBe('movie-webapp');
  });

  it('should contain the <app-header> element', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const headerElement = compiled.querySelector('app-header');
    expect(headerElement).toBeTruthy();
  });

  it('should contain the <router-outlet> element', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const routerOutletElement = compiled.querySelector('router-outlet');
    expect(routerOutletElement).toBeTruthy();
  });

  it('should contain the <app-footer> element', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const footerElement = compiled.querySelector('app-footer');
    expect(footerElement).toBeTruthy();
  });
});
