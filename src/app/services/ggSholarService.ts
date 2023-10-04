import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class GgSholarService {
    private clickBtnBuild = new Subject<any>();
    buttonClick$ = this.clickBtnBuild.asObservable();
    education: any;
    constructor(private http: HttpClient) { }

    //link availble:
    // https://serpapi.com/search.json?engine=google_scholar_author&author_id=LSsXyncAAAAJ
    // https://serpapi.com/search.json?author_id=7IUCbE4AAAAJ&engine=google_scholar_author&hl=en
    // https://serpapi.com/search.json?author_id=wwxk-JMAAAAJ&engine=google_scholar_author&hl=en
    getGgscholar(link: string) {
        return this.http.get(
            `${link}&api_key=444fd25cc1b66ad1b56d8139ab2fc7b7bf24b5a8e28ddc0e44536c2d8ff6fd65`
        ).pipe(map(res => res));
    }
    emitButtonClick(result: any) {
        this.clickBtnBuild.next(result);
    }
}
