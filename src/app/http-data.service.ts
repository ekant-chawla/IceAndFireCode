import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpDataService {

  private baseUrl: string = "https://www.anapioficeandfire.com/api/";

  constructor(private client: HttpClient) { }

  getAllCharacters(name:string, gender:string, culture:string, isAlive:boolean): any {

    let url = this.baseUrl + "characters?";
    if (name) url += "name=" + name + "&";
    if (gender) url += "gender=" + gender + "&";
    if (culture) url += "culture=" + culture + "&";
    if (isAlive!=undefined) url += "isAlive=" + isAlive;

    return this.client.get(url);

  }
  getAllHouses(name: string, region: string, words: string, hasDiedOut: boolean): any {
    let url = this.baseUrl + "houses?";
    if (name) url += "name=" + name + "&";
    if (region) url += "region=" + region + "&";
    if (words) url += "words=" + words + "&";
    if (hasDiedOut!=undefined) url += "hasDiedOut=" + hasDiedOut;

    return this.client.get(url);
  }
  getAllBooks(name: string): any {
    if (name) return this.client.get(this.baseUrl + "books?name=" + name);
    else return this.client.get(this.baseUrl + "books")
  }

  getSingleBook(id:string){
    return this.client.get(this.baseUrl+"books/"+id);
  }
  getSingleCharacter(id:string){
    return this.client.get(this.baseUrl+"characters/"+id);
    
  }
  getSingleHouse(id:string){
    return this.client.get(this.baseUrl+"houses/"+id);
  }

  getDataFromUrl(url:string){
    return this.client.get(url);
  }

}
