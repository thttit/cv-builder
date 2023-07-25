import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetProfileService {
  constructor(private http: HttpClient) {}

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

  // getProfileLinkedIn1(linkProfileLinkedIn: string){
  //     let linkAPIGetProfileLinkedin = `https://nubela.co/proxycurl/api/v2/linkedin?url=${linkProfileLinkedIn}&fallback_to_cache=on-error&skills=include`
  //     console.log(`Link linkedin profile service: ` + linkAPIGetProfileLinkedin);
  // }
}
