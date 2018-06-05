import { Component, OnInit } from '@angular/core';
import { HttpDataService } from '../http-data.service';
import { HelperService } from '../helper.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private syncArray: boolean[] = [false, false, false]; // this is used to disable the button untill all previous requests has returned and also to display data.
  displayDataArray: any[];
  //variable for common filtering
  find: string = "All";
  findOptions = ["All", "Books", "Characters", "Houses"];
  name: string;
  //variables for filtering characters
  isAlive: string = "Any";
  gender: string = "Any";
  culture: string;
  isAliveOptions = ["Any", "Yes", "No"];
  genderOptions = ["Any", "Male", "Female"];
  //variables for filtering houses
  region: string;
  words: string;
  hasDiedOut: string = 'Any';
  hasDiedOutOptions = ["Any", "Yes", "No"];

  constructor(private _http: HttpDataService, private _helper: HelperService) { }

  ngOnInit():void {
    this.fetchBooks();
    this.fetchCharacters();
    this.fetchHouses();
  }

  emptyData(): void {
    //remove all data from the display array while keeping it intact.
    this.displayDataArray.splice(0, this.displayDataArray.length);
  }

  fetchBooks(useFilters: boolean = false): void {
    this.syncArray[0] = false;
    this._http.getAllBooks(this.name).subscribe(resp => {
      resp.forEach(element => {
        element.type = "book";
        element.id = this._helper.extractId(element.url);
      });

      if (this.displayDataArray) {
        this.displayDataArray = this.displayDataArray.concat(resp);
      }
      else this.displayDataArray = resp;

      this.syncArray[0] = true;
      this.sortData();
    },
      error => {
        console.log("Failed to get Characters Data")
        this.syncArray[0] = true;
      }

    );
  }

  fetchCharacters(useFilters: boolean = false): void {

    let gender: string, isAlive: boolean, culture: string;
    // set values of this filter option if we have to use filters.Note: Name is always used.
    if (useFilters) {
      culture = this.culture;
      isAlive = this.isAlive == "Any" ? undefined : this.isAlive == "Yes";
      gender = this.gender == "Any" ? undefined : this.gender;
    }
    this.syncArray[1] = false;
    this._http.getAllCharacters(this.name, gender, culture, isAlive).subscribe(resp => {
      resp.forEach(element => {
        element.type = "character";
        element.id = this._helper.extractId(element.url);
        // if the name is not present of is blank and we have at least 1 alias then use that 
        if ((!element.name || element.name == '') && element.aliases && element.aliases.length > 0 && element.aliases[0] != '') {
          element.name = element.aliases.shift();
        }
      });

      if (this.displayDataArray) {
        this.displayDataArray = this.displayDataArray.concat(resp);
      }
      else this.displayDataArray = resp;
      this.syncArray[1] = true;
      this.sortData();

    },
      error => {
        console.log("Failed to get Characters Data")
        this.syncArray[1] = true;

      }
    );
  }

  fetchHouses(useFilters: boolean = false): void {

    let region: string, words: string, isDead: boolean;
    // set values of this filter option if we have to use filters.Note: Name is always used.
    if (useFilters) {
      region = this.region;
      words = this.words;
      isDead = this.hasDiedOut == "Any" ? undefined : this.hasDiedOut == "Yes";
    }
    this.syncArray[2] = false;
    this._http.getAllHouses(this.name, region, this.words, isDead).subscribe(resp => {
      resp.forEach(element => {
        element.type = "house";
        element.id = this._helper.extractId(element.url);
      });

      if (this.displayDataArray) {
        this.displayDataArray = this.displayDataArray.concat(resp);
      }
      else this.displayDataArray = resp;

      this.syncArray[2] = true;
      this.sortData();

    },
      error => {
        console.log("Failed to get Characters Data");
        this.syncArray[2] = true;
      }
    );

  }

  sortData(): void {
    this.displayDataArray.sort((a, b) => {

      let nameA = a.name && a.name != '' ? a.name : (a.aliases && a.aliases.length > 0 ? a.aliases[0] : '');//assign name or alias of this item to local variable otherwise a blank string.
      let nameB = b.name && b.name != '' ? b.name : (b.aliases && b.aliases.length > 0 ? b.aliases[0] : '');//assign name or alias of this item to local variable otherwise a blank string.
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
  }

  dataIsReady(): boolean {
    return this.syncArray.reduce((a: boolean, b: boolean) => a && b);
  }

  getData(): void {

    console.log("form submitted");

    this.emptyData();

    if (this.find == 'All') {
      this.fetchBooks();
      this.fetchCharacters();
      this.fetchHouses();
    }

    if (this.find == 'Books') {
      this.fetchBooks(true);
    }

    if (this.find == 'Characters') {
      this.fetchCharacters(true);
    }

    if (this.find == 'Houses') {
      this.fetchHouses(true);
    }
  }



}
