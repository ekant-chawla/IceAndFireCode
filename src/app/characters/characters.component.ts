import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpDataService } from '../http-data.service';
import { Location } from '@angular/common'
import { HelperService } from '../helper.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  private _maxItem: number = 5;//controls the maximum urls that will be hit for any given field as some may contain too many such as swornMembers. Make it -1 to get all names.
  characterObject// = { "url": "https://www.anapioficeandfire.com/api/characters/148", "name": "Arya Stark", "gender": "Female", "culture": "Northmen", "born": "In 289 AC, at Winterfell", "died": "here", "titles": ["Princess", "No One"], "aliases": ["Arya Horseface", "Arya Underfoot", "Arry", "Lumpyface", "Lumpyhead", "Stickboy", "Weasel", "Nymeria", "Squan", "Saltb", "Cat of the Canaly", "Bets", "The Blind Girh", "The Ugly Little Girl", "Mercedenl", "Mercye"], "father": "https://www.anapioficeandfire.com/api/characters/339", "mother": "https://www.anapioficeandfire.com/api/characters/232", "spouse": "https://www.anapioficeandfire.com/api/characters/232", "allegiances": ["https://www.anapioficeandfire.com/api/houses/362"], "books": ["https://www.anapioficeandfire.com/api/books/1"], "povBooks": ["https://www.anapioficeandfire.com/api/books/1", "https://www.anapioficeandfire.com/api/books/2", "https://www.anapioficeandfire.com/api/books/3", "https://www.anapioficeandfire.com/api/books/5", "https://www.anapioficeandfire.com/api/books/8"], "tvSeries": ["Season 1", "Season 2", "Season 3", "Season 4", "Season 5", "Season 6"], "playedBy": ["Maisie Williams"] };
  gotResponse: boolean = false;

  constructor(private _route: ActivatedRoute, private _router: Router, private _http: HttpDataService, private _helper: HelperService, private _location: Location) {
    this._router.routeReuseStrategy.shouldReuseRoute = () => false; // to reload the page when re routing to the same componenet.
  }

  ngOnInit():void {
    let id: string = this._route.snapshot.paramMap.get('id');

    this._http.getSingleCharacter(id).subscribe(resp => {

      if ((!resp['name'] || resp['name'] == '') && resp['aliases'] && resp['aliases'].length > 0 && resp['aliases'][0] != '') {
        resp['name'] = resp['aliases'].shift();
      }

      this.characterObject = resp;

      if (this.characterObject) {
        this.getFather();
        this.getMother();
        this.getSpouse();
        this.getAllegiance();
        this.getBooks();
        this.getPovBooks();
      }
      this.gotResponse = true;
    },
      err => {
        console.log("error");
        this.gotResponse = true;
      },

    );
  }

  getFather():void {
    if (this.characterObject.father && this.characterObject.father != '') {
      this._http.getDataFromUrl(this.characterObject.father).subscribe(resp => {
        this.characterObject["fatherObject"] = {
          name: this._helper.extractName(resp),
          id: this._helper.extractId(resp['url'])
        };
      },
        err => {
          console.log("Error getting detial from father url");
        }
      )
    }
  }

  getMother():void {
    if (this.characterObject.mother && this.characterObject.mother != '') {
      this._http.getDataFromUrl(this.characterObject.mother).subscribe(resp => {
        this.characterObject["motherObject"] = {
          name: this._helper.extractName(resp),
          id: this._helper.extractId(resp['url'])
        };
      },
        err => {
          console.log("Error getting detial from mother url");
        }
      )
    }
  }

  getSpouse():void {
    if (this.characterObject.spouse && this.characterObject.spouse != '') {
      this._http.getDataFromUrl(this.characterObject.spouse).subscribe(resp => {
        this.characterObject["spouseObject"] = {
          name: this._helper.extractName(resp),
          id: this._helper.extractId(resp['url'])
        };
      },
        err => {
          console.log("Error getting detial from spouse url");
        }
      )
    }
  }

  getBooks():void {
    if (this.characterObject.books && this.characterObject.books.length > 0 && this.characterObject.books[0] != '') {
      let counter: number = 0;
      this.characterObject['booksArray'] = [];//initializing a blank array

      for (let url of this.characterObject.books) {

        if (this._maxItem != -1 && counter == this._maxItem) break;
        counter++;

        this._http.getDataFromUrl(url).subscribe(
          resp => {

            this.characterObject['booksArray'].push({
              name: this._helper.extractName(resp),
              id: this._helper.extractId(resp['url'])
            })
          },
          err => {
            console.log("Error getting details from book url");
          }
        );
      }
    }
  }

  getPovBooks():void {
    if (this.characterObject.povBooks && this.characterObject.povBooks.length > 0 && this.characterObject.povBooks[0] != '') {
      let counter: number = 0;
      this.characterObject['povBooksArray'] = [];//initializing a blank array

      for (let url of this.characterObject.povBooks) {

        if (this._maxItem != -1 && counter == this._maxItem) break;
        counter++;

        this._http.getDataFromUrl(url).subscribe(
          resp => {

            this.characterObject['povBooksArray'].push({
              name: this._helper.extractName(resp),
              id: this._helper.extractId(resp['url'])
            })
          },
          err => {
            console.log("Error getting details from pov book url");
          }
        );
      }
    }
  }

  getAllegiance():void {
    if (this.characterObject.allegiances && this.characterObject.allegiances.length > 0 && this.characterObject.allegiances[0] != '') {
      let counter: number = 0;
      this.characterObject['allyArray'] = [];//initializing a blank array

      for (let url of this.characterObject.allegiances) {

        if (this._maxItem != -1 && counter == this._maxItem) break;
        counter++;

        this._http.getDataFromUrl(url).subscribe(
          resp => {

            this.characterObject['allyArray'].push({
              name: this._helper.extractName(resp),
              id: this._helper.extractId(resp['url'])
            })
          },
          err => {
            console.log("Error getting details from ally url");
          }
        );
      }
    }
  }

  goBack():void {
    this._location.back();
  }

}
