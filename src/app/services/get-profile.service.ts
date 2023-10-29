import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetProfileService {
  constructor(private http: HttpClient) { }

  getProfileLinkedIn(linkProfileLinkedIn: string) {
    return this.http.get(
      `https://nubela.co/proxycurl/api/v2/linkedin?url=${linkProfileLinkedIn}&fallback_to_cache=on-error&skills=include`
    );
  }

  getProfileORCID(linkProfileORCID: string) {
    const url = `https://pub.orcid.org/v3.0/${linkProfileORCID}`;

    const headers = {
      Accept: 'application/json',
    };

    return this.http.get<any>(url, { headers });
  }
  getProfileIEEE(linkProfileIEEE: string) {
    const jsonData = './data_authors.json'
    const linkVariable = String(jsonData[0].link);
    linkVariable == linkProfileIEEE
    return this.http.get<any>(`${linkProfileIEEE}`);
    // const url = `http://ieeexploreapi.ieee.org/api/v1/search/articles?querytext=altmetrics&format=json&apikey=ux9rgx2rthg3c548b82ekwu5`
  }
  getGgscholar(link: string) {
    return this.http.get(
      `${link}&api_key=444fd25cc1b66ad1b56d8139ab2fc7b7bf24b5a8e28ddc0e44536c2d8ff6fd65`
    ).pipe(map(res => res));
  }
  // getProfileLinkedIn1(linkProfileLinkedIn: string){
  //     let linkAPIGetProfileLinkedin = `https://nubela.co/proxycurl/api/v2/linkedin?url=${linkProfileLinkedIn}&fallback_to_cache=on-error&skills=include`
  //     console.log(`Link linkedin profile service: ` + linkAPIGetProfileLinkedin);
  // }
}
