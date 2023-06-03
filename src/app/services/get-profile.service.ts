import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GetProfileService {
    constructor(private http: HttpClient) {

    }

    getProfileLinkedIn(linkProfileLinkedIn: string){
        return this.http.get(`https://nubela.co/proxycurl/api/v2/linkedin?url=${linkProfileLinkedIn}&fallback_to_cache=on-error&skills=include`);
    }

    // getProfileLinkedIn1(linkProfileLinkedIn: string){
    //     let linkAPIGetProfileLinkedin = `https://nubela.co/proxycurl/api/v2/linkedin?url=${linkProfileLinkedIn}&fallback_to_cache=on-error&skills=include`
    //     console.log(`Link linkedin profile service: ` + linkAPIGetProfileLinkedin);
    // }
}
