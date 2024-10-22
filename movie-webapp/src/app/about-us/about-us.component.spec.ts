import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutUsComponent } from './about-us.component'; // Adjust this import path based on your component's location

describe('AboutUsComponent', () => {
  let component: AboutUsComponent;
  let fixture: ComponentFixture<AboutUsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutUsComponent]
    });
    fixture = TestBed.createComponent(AboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger initial change detection
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the "About Us" header and description', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const header = compiled.querySelector('h1.display-4.text-primary');
    const description = compiled.querySelector('p.lead.text-muted');

    expect(header).toBeTruthy();
    expect(header?.textContent).toContain('About Us');
    expect(description).toBeTruthy();
    expect(description?.textContent).toContain('We are passionate about bringing the world of movies to your fingertips.');
  });

  it('should render the "Our Mission" section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const missionHeader = compiled.querySelector('h2.h4.text-success');
    const missionText = compiled.querySelector('div.card-body.bg-light p');

    expect(missionHeader).toBeTruthy();
    expect(missionHeader?.textContent).toContain('Our Mission');
    expect(missionText).toBeTruthy();
    expect(missionText?.textContent).toContain('Our mission is to provide a seamless movie discovery and watching experience for movie lovers around the world.');
  });

  it('should render the "What We Do" section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const whatWeDoHeader = compiled.querySelector('h2.h4.text-dark');
    const whatWeDoText = compiled.querySelector('div.card-body.bg-warning p');

    expect(whatWeDoHeader).toBeTruthy();
    expect(whatWeDoHeader?.textContent).toContain('What We Do');
    expect(whatWeDoText).toBeTruthy();
    expect(whatWeDoText?.textContent).toContain('We offer an easy-to-use platform where users can browse movies, view detailed information such as ratings, reviews, trailers, and more.');
  });

  it('should have correct classes applied to sections', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const missionCard = compiled.querySelector('div.card-body.bg-light');
    const whatWeDoCard = compiled.querySelector('div.card-body.bg-warning');
    const valuesCard = compiled.querySelector('div.card-body.bg-info.text-white');
    const contactCard = compiled.querySelector('div.card-body.bg-success.text-white');

    // Check for background colors
    expect(missionCard).toHaveClass('bg-light');
    expect(whatWeDoCard).toHaveClass('bg-warning');
    expect(valuesCard).toHaveClass('bg-info');
    expect(contactCard).toHaveClass('bg-success');
  });
});
