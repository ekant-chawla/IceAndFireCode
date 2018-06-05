import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpDataService } from '../http-data.service';
import { Location } from '@angular/common'
import { HelperService } from '../helper.service';


@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.css']
})
export class HousesComponent implements OnInit {

  private _maxItem: number = 5;//controls the maximum urls that will be hit for any given field as some may contain too many such as swornMembers. Make it -1 to get all names.
  houseObject// = { "url": "https://www.anapioficeandfire.com/api/houses/362", "name": "House Stark of Winterfell", "region": "The North", "coatOfArms": "A running grey direwolf, on an ice-white field", "words": "Winter is Coming", "titles": ["King in the North", "Lord of Winterfell", "Warden of the North", "King of the Trident"], "seats": ["Scattered (formerly Winterfell)"], "currentLord": "", "heir": "", "overlord": "https://www.anapioficeandfire.com/api/houses/16", "founded": "Age of Heroes", "founder": "https://www.anapioficeandfire.com/api/characters/209", "diedOut": "", "ancestralWeapons": ["Ice"], "cadetBranches": ["https://www.anapioficeandfire.com/api/houses/170", "https://www.anapioficeandfire.com/api/houses/215"], "swornMembers": ["https://www.anapioficeandfire.com/api/characters/2", "https://www.anapioficeandfire.com/api/characters/20", "https://www.anapioficeandfire.com/api/characters/97", "https://www.anapioficeandfire.com/api/characters/98", "https://www.anapioficeandfire.com/api/characters/136", "https://www.anapioficeandfire.com/api/characters/143", "https://www.anapioficeandfire.com/api/characters/148", "https://www.anapioficeandfire.com/api/characters/170", "https://www.anapioficeandfire.com/api/characters/181", "https://www.anapioficeandfire.com/api/characters/192", "https://www.anapioficeandfire.com/api/characters/206", "https://www.anapioficeandfire.com/api/characters/207", "https://www.anapioficeandfire.com/api/characters/208", "https://www.anapioficeandfire.com/api/characters/209", "https://www.anapioficeandfire.com/api/characters/210", "https://www.anapioficeandfire.com/api/characters/212", "https://www.anapioficeandfire.com/api/characters/216", "https://www.anapioficeandfire.com/api/characters/232", "https://www.anapioficeandfire.com/api/characters/259", "https://www.anapioficeandfire.com/api/characters/324", "https://www.anapioficeandfire.com/api/characters/339", "https://www.anapioficeandfire.com/api/characters/340", "https://www.anapioficeandfire.com/api/characters/349", "https://www.anapioficeandfire.com/api/characters/351", "https://www.anapioficeandfire.com/api/characters/354", "https://www.anapioficeandfire.com/api/characters/389", "https://www.anapioficeandfire.com/api/characters/461", "https://www.anapioficeandfire.com/api/characters/561", "https://www.anapioficeandfire.com/api/characters/583", "https://www.anapioficeandfire.com/api/characters/584", "https://www.anapioficeandfire.com/api/characters/589", "https://www.anapioficeandfire.com/api/characters/591", "https://www.anapioficeandfire.com/api/characters/593", "https://www.anapioficeandfire.com/api/characters/603", "https://www.anapioficeandfire.com/api/characters/648", "https://www.anapioficeandfire.com/api/characters/668", "https://www.anapioficeandfire.com/api/characters/716", "https://www.anapioficeandfire.com/api/characters/737", "https://www.anapioficeandfire.com/api/characters/777", "https://www.anapioficeandfire.com/api/characters/887", "https://www.anapioficeandfire.com/api/characters/891", "https://www.anapioficeandfire.com/api/characters/911", "https://www.anapioficeandfire.com/api/characters/912", "https://www.anapioficeandfire.com/api/characters/916", "https://www.anapioficeandfire.com/api/characters/917", "https://www.anapioficeandfire.com/api/characters/918", "https://www.anapioficeandfire.com/api/characters/957", "https://www.anapioficeandfire.com/api/characters/1101", "https://www.anapioficeandfire.com/api/characters/1111", "https://www.anapioficeandfire.com/api/characters/1148", "https://www.anapioficeandfire.com/api/characters/1158", "https://www.anapioficeandfire.com/api/characters/1175", "https://www.anapioficeandfire.com/api/characters/1185", "https://www.anapioficeandfire.com/api/characters/1190", "https://www.anapioficeandfire.com/api/characters/1254", "https://www.anapioficeandfire.com/api/characters/1260", "https://www.anapioficeandfire.com/api/characters/1326", "https://www.anapioficeandfire.com/api/characters/1336", "https://www.anapioficeandfire.com/api/characters/1383", "https://www.anapioficeandfire.com/api/characters/1396", "https://www.anapioficeandfire.com/api/characters/1407", "https://www.anapioficeandfire.com/api/characters/1488", "https://www.anapioficeandfire.com/api/characters/1489", "https://www.anapioficeandfire.com/api/characters/1499", "https://www.anapioficeandfire.com/api/characters/1515", "https://www.anapioficeandfire.com/api/characters/1526", "https://www.anapioficeandfire.com/api/characters/1565", "https://www.anapioficeandfire.com/api/characters/1602", "https://www.anapioficeandfire.com/api/characters/1620", "https://www.anapioficeandfire.com/api/characters/1649", "https://www.anapioficeandfire.com/api/characters/1650", "https://www.anapioficeandfire.com/api/characters/1706", "https://www.anapioficeandfire.com/api/characters/1737", "https://www.anapioficeandfire.com/api/characters/1749", "https://www.anapioficeandfire.com/api/characters/1787", "https://www.anapioficeandfire.com/api/characters/1796", "https://www.anapioficeandfire.com/api/characters/1816", "https://www.anapioficeandfire.com/api/characters/1819", "https://www.anapioficeandfire.com/api/characters/1843", "https://www.anapioficeandfire.com/api/characters/1946", "https://www.anapioficeandfire.com/api/characters/1950", "https://www.anapioficeandfire.com/api/characters/1979", "https://www.anapioficeandfire.com/api/characters/2019", "https://www.anapioficeandfire.com/api/characters/2020", "https://www.anapioficeandfire.com/api/characters/2037", "https://www.anapioficeandfire.com/api/characters/2068", "https://www.anapioficeandfire.com/api/characters/2089", "https://www.anapioficeandfire.com/api/characters/2119"] };
  gotResponse: boolean = false;

  constructor(private _route: ActivatedRoute, private _router: Router, private _http: HttpDataService, private _helper: HelperService, private _location: Location) {
    this._router.routeReuseStrategy.shouldReuseRoute = () => false; // to reload the page when re routing to the same componenet.
  }

  ngOnInit():void {

    let id: string = this._route.snapshot.paramMap.get('id');

    this._http.getSingleHouse(id).subscribe(resp => {
      console.log(resp);

      this.houseObject = resp;

      if (this.houseObject) {
        this.getCurrentLord();
        this.getHeir();
        this.getFounder();
        this.getOverlord();
        this.getCadetBranches();
        this.getMembers();
      }
      this.gotResponse = true;
    },
      err => {
        console.log("error");
        this.gotResponse = true;
      },
    );

  }


  getCurrentLord():void {
    if (this.houseObject.currentLord && this.houseObject.currentLord != '') {
      this._http.getDataFromUrl(this.houseObject.currentLord).subscribe(resp => {

        this.houseObject["lordObject"] = {
          name: this._helper.extractName(resp),
          id: this._helper.extractId(resp['url'])
        };
      },
        err => {
          console.log("Error getting detial from lord url");
        }
      );
    }
  }

  getHeir():void {
    if (this.houseObject.heir && this.houseObject.heir != '') {

      this._http.getDataFromUrl(this.houseObject.heir).subscribe(
        resp => {

          this.houseObject["heirObject"] = {
            name: this._helper.extractName(resp),
            id: this._helper.extractId(resp['url'])
          };

        },
        err => {
          console.log("Error getting detial from heir url");
        }
      );
    }
  }

  getFounder():void {
    if (this.houseObject.founder && this.houseObject.founder != '') {
      this._http.getDataFromUrl(this.houseObject.founder).subscribe(
        resp => {

          this.houseObject["founderObject"] = {
            name: this._helper.extractName(resp),
            id: this._helper.extractId(resp['url'])
          };

        },
        err => {
          console.log("Error getting detial from founder url");
        }
      );
    }
  }

  getOverlord():void {
    if (this.houseObject.overlord && this.houseObject.overlord != '') {

      this._http.getDataFromUrl(this.houseObject.overlord).subscribe(
        resp => {

          this.houseObject["overlordObject"] = {
            name: this._helper.extractName(resp),
            id: this._helper.extractId(resp['url'])
          };

        },
        err => {
          console.log("Error getting detial from overlord url");
        }
      );
    }

  }

  getCadetBranches():void {
    if (this.houseObject.cadetBranches && this.houseObject.cadetBranches.length > 0 && this.houseObject.cadetBranches[0] != '') {

      let counter: number = 0;
      this.houseObject['cadets'] = [];//initializing a blank array

      for (let url of this.houseObject.cadetBranches) {

        if (this._maxItem != -1 && counter == this._maxItem) break;
        counter++;

        this._http.getDataFromUrl(url).subscribe(
          resp => {

            this.houseObject['cadets'].push({
              name: this._helper.extractName(resp),
              id: this._helper.extractId(resp['url'])
            })

          },
          err => {
            console.log("Error getting details from cadet url");
          }
        );
      }
    }
  }


  getMembers():void {
    if (this.houseObject.swornMembers && this.houseObject.swornMembers.length > 0 && this.houseObject.swornMembers[0] != '') {

      let counter: number = 0;
      this.houseObject['members'] = [];//initializing a blank array

      for (let url of this.houseObject.swornMembers) {

        if (this._maxItem != -1 && counter == this._maxItem) break;
        counter++;

        this._http.getDataFromUrl(url).subscribe(
          resp => {

            this.houseObject['members'].push({
              name: this._helper.extractName(resp),
              id: this._helper.extractId(resp['url'])
            })

          },
          err => {
            console.log("Error getting details from cadet url");
          }
        );
      }
    }
  }

  goBack():void {
    this._location.back();
  }
}




