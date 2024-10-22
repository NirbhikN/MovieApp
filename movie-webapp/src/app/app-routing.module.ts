import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserViewComponent } from './user-view/user-view.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ResetComponent } from './reset/reset.component';
import { movieGuard } from './guard/movie.guard';
import { AboutUsComponent } from './about-us/about-us.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'movie/:id', component: MovieDetailComponent },
  { path: 'user', component: UserViewComponent,canActivate:[movieGuard]},
  { path: 'user/edit', component: UserEditComponent,canActivate:[movieGuard] },
  { path: 'wishlist', component: WishlistComponent,canActivate:[movieGuard] },
  { path: 'reset', component: ResetComponent },
  { path: 'about-us', component: AboutUsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
