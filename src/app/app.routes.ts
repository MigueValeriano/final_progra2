import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SearchComponent } from './pages/search/search.component';
import { RegisterComponent } from './pages/register/register.component';
import { FeedComponent } from './pages/feed/feed.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { NewPostComponent } from './pages/new-post/new-post.component';
import { ViewProfileComponent } from './pages/view-profile/view-profile.component';
import { HomeComponent } from './pages/home/home.component';
import { EventoComponent } from './pages/evento/evento.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { EventosComponent } from './pages/events/events.component';
import { EventoFormComponent } from './pages/events-form/events-form.component';




export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'home', component: HomeComponent},
  { path: 'search', component: SearchComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'feed', component: FeedComponent },
  { path: 'edit-profile', component: EditProfileComponent },
  { path: 'new-post', component: NewPostComponent },
  { path: 'view-post/:identificador', component: NewPostComponent },
  { path: 'view-profile/:id', component: ViewProfileComponent },
  { path: 'carrito', component: CarritoComponent},
  { path: 'evento/:id', component: EventoComponent },
  { path: 'events', component: EventosComponent },
  { path: 'events-form/create', component: EventoFormComponent},
  { path: 'events-form/:action/:id', component: EventoFormComponent},  
];
