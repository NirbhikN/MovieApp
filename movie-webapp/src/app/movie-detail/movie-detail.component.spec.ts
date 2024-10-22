import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieDetailComponent } from './movie-detail.component';
import { MovieService } from '../service/movie.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;
  let movieService: jasmine.SpyObj<MovieService>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let activatedRoute: jasmine.SpyObj<ActivatedRoute>;
  let sanitizer: jasmine.SpyObj<DomSanitizer>;

  beforeEach(async () => {
    const movieServiceSpy = jasmine.createSpyObj('MovieService', ['getMovieDetails', 'addMovieToFavorites']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getUserIdFromToken']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['params']);
    const sanitizerSpy = jasmine.createSpyObj('DomSanitizer', ['bypassSecurityTrustResourceUrl']);

    await TestBed.configureTestingModule({
      declarations: [MovieDetailComponent],
      providers: [
        { provide: MovieService, useValue: movieServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        { provide: DomSanitizer, useValue: sanitizerSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA], // Ignore unknown elements like <app-header>, <app-footer>
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;
    movieService = TestBed.inject(MovieService) as jasmine.SpyObj<MovieService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    activatedRoute = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>;
    sanitizer = TestBed.inject(DomSanitizer) as jasmine.SpyObj<DomSanitizer>;

    activatedRoute.params = of({ id: '1' }); // Simulate route params
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch movie details based on movieId from route params', () => {
    const movie:any = {
      id: '1',
      title: 'Inception',
      year: 2010,
      rank: 1,
      rating: 8.8,
      genre: 'Action',
      director: 'Nolan',
      writers: ['Nolan'],
      thumbnail: 'thumbnail-url',
      trailer_embed_link: 'https://youtube.com/embed/trailer-link',
      image: 'image-url',
      big_image: 'big-image-url',
      imdb_link: 'https://imdb.com/title/inception',
      description: 'A mind-bending thriller',
    };

    // Mock the service to return the correct movie
    movieService.getMovieDetails.and.returnValue(of(movie));

    component.ngOnInit();

    expect(movieService.getMovieDetails).toHaveBeenCalledWith('1');
    expect(component.movie).toEqual(movie);
  });

});
