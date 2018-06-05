import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BooksComponent } from './books/books.component';
import { CharactersComponent } from './characters/characters.component';
import { HousesComponent } from './houses/houses.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HttpDataService } from './http-data.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import {Location} from '@angular/common';
import { HelperService } from './helper.service';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BooksComponent,
    CharactersComponent,
    HousesComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path:'home',component:HomeComponent},
      {path:'',redirectTo:"/home",pathMatch:'full'},
      {path:'books/:id',component:BooksComponent},
      {path:'characters/:id',component:CharactersComponent},
      {path:'houses/:id',component:HousesComponent},
      {path:'**',component:PageNotFoundComponent}
    ]),
    HttpClientModule,
    FormsModule
  ],
  providers: [HttpDataService,Location,HelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
