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

  getProfileCrossref(linkProfileCrossref: string): Observable<any> {
    const url = `https://api.crossref.org/works/${linkProfileCrossref}`;
    // Định nghĩa các headers cần thiết cho yêu cầu
    const headers = {
      Accept: 'application/json',
    };
    // Gửi yêu cầu GET đến trang Crossref
    return this.http.get<any>(url, { headers });
  }
  getLocationCrossref(idmember: string): Observable<any> {
    // this.getProfileCrossref()
    const url = `https://api.crossref.org/members/${idmember}`;
    // Định nghĩa các headers cần thiết cho yêu cầu
    const headers = {
      Accept: 'application/json',
    };
    // Gửi yêu cầu GET đến trang Crossref
    return this.http.get<any>(url, { headers });
  }


  getProfileIEEE(linkProfileIEEE: string): Observable<any> {
    const url = `https://api-json-server-84l9.onrender.com/${linkProfileIEEE}`;
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
