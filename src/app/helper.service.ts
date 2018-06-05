import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  extractName(obj: any): string {
    return obj['name'] && obj['name'] != '' ? obj['name'] : (obj['aliases'] && obj['aliases'].length > 0 && obj['aliases'][0] != '' ? obj['aliases'][0] : '');
    //return the name if not present then set the first alias as name incase it is present otherwise set an empty string.
    //as it checks for presence of alias, it works for characters and houses both.
  }

  extractId(url: string): string {
    return url.substring(url.lastIndexOf('/') + 1);
  }
  
}
