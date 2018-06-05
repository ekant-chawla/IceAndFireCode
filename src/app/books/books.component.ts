import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpDataService } from '../http-data.service';
import { Location } from '@angular/common'
import { HelperService } from '../helper.service';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {


  private _maxItem: number = 5;
  gotResponse: boolean;
  bookObject;
  constructor(private _route: ActivatedRoute, private _router: Router, private _http: HttpDataService, private _helper: HelperService, private _location: Location) { }

  ngOnInit():void {
    let id: string = this._route.snapshot.paramMap.get('id');
    this._http.getSingleBook(id).subscribe(resp => {
      this.bookObject = resp;

      if (this.bookObject) {
        this.getCharacters();
        this.getPovCharacters();
      }
      this.gotResponse = true;
    },
      err => {
        console.log("error");
        this.gotResponse = true;
      },
    );
  }


  getCharacters():void {
    if (this.bookObject.characters && this.bookObject.characters.length > 0 && this.bookObject.characters[0] != '') {
      let counter: number = 0;
      this.bookObject['charactersArray'] = [];//initializing a blank array

      for (let url of this.bookObject.characters) {

        if (this._maxItem != -1 && counter == this._maxItem) break;
        counter++;

        this._http.getDataFromUrl(url).subscribe(
          resp => {

            this.bookObject['charactersArray'].push({
              name: this._helper.extractName(resp),
              id: this._helper.extractId(resp['url'])
            })
          },
          err => {
            console.log("Error getting details from character url");
          }
        );
      }
    }
  }

  getPovCharacters():void {
    if (this.bookObject.povCharacters && this.bookObject.povCharacters.length > 0 && this.bookObject.povCharacters[0] != '') {
      let counter: number = 0;
      this.bookObject['povCharactersArray'] = [];//initializing a blank array

      for (let url of this.bookObject.povCharacters) {

        if (this._maxItem != -1 && counter == this._maxItem) break;
        counter++;

        this._http.getDataFromUrl(url).subscribe(
          resp => {

            this.bookObject['povCharactersArray'].push({
              name: this._helper.extractName(resp),
              id: this._helper.extractId(resp['url'])
            })
          },
          err => {
            console.log("Error getting details from character url");
          }
        );
      }
    }
  }





  goBack():void {
    this._location.back();
  }
}
