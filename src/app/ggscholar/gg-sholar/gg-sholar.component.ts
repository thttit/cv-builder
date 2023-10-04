import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GgSholarService } from 'src/app/services/ggSholarService';
export interface GgScholarModel {
  fullName?: string,
  education: string[],
  work: string,
  contact: string,
  achivement: string,
  contributions: string[]
}
@Component({
  selector: 'app-gg-sholar',
  templateUrl: './gg-sholar.component.html',
  styleUrls: ['./gg-sholar.component.css']
})

export class GgSholarComponent implements OnInit {
  public profileGgScholar: GgScholarModel = {
    fullName: '',
    education: [],
    work: '',
    contact: '',
    achivement: '',
    contributions: []
  }
  constructor(
    private ggSholarService: GgSholarService) { }
  ngOnInit(): void {
    this.ggSholarService.buttonClick$.subscribe((data: any) => {
      if (data) {
        this.profileGgScholar = {
          education: data.author.affiliations.split(" and "),
          work: 'Author',
          contact: data.author.email.split(" at ")[1],
          achivement: data.author.interests.map((e: any) => e.title).join(", "),
          contributions: data.articles.map((e: any) => `Article ${e.title} co-work with ${e.authors} in ${e.year}`)
        }
      }
    });
  }

}
