import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IEEEService {
  constructor(private http: HttpClient) { }
  private BtnBuild = new Subject<any>();
  buttonClick$ = this.BtnBuild.asObservable();
  education: any;
  // Link Test
  // https://ieeexplore.ieee.org/author/37265576200
  // https://ieeexplore.ieee.org/author/37280142900
  // https://ieeexplore.ieee.org/author/37271997300
  getProfileIEEE(authorUrl: string) {
    const jsonData = './data_authors.json'
    const linkVariables = [];

    // Iterate over the JSON file and add the link variable of each author to the array
    // for (const author of jsonData) {
    //   linkVariables.push(author.link);

    // }
    const linkVariable = String(jsonData[0].link);
    linkVariable == authorUrl
    return this.http.get<any>(`${authorUrl}`);
  }
  emitButtonClick(result: any) {
    this.BtnBuild.next(result);
  }

}
