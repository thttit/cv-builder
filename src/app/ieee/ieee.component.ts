import { Component, OnInit } from '@angular/core';
import { IEEEService } from '../services/ieeeService';

export interface IEEEModel {
  fullName: string,
  work: string,
  img: string,
  affiliation: string,
  public_topic: string,
  bio: string
}
@Component({
  selector: 'app-ieee',
  templateUrl: './ieee.component.html',
  styleUrls: ['./ieee.component.css']
})
export class IeeeComponent implements OnInit {
  public profileIEEE: IEEEModel = {
    fullName: '',
    work: '',
    img: '',
    affiliation: '',
    public_topic: '',
    bio: ''
  }
  // authorUrl!: string;

  constructor(private ieeeService: IEEEService) { }

  ngOnInit(): void {
    this.ieeeService.buttonClick$.subscribe(
      (data: any) => {
        if (data) {
          this.profileIEEE = {
            fullName: data.info.name,
            work: 'Author',
            img: data.info.img,
            affiliation: data.info.affiliation,
            public_topic: data.info.public_topic,
            bio: data.info.bio
          }
        } else {
          console.log('Error: Author not found');
        }
        console.log(data)
      }
    );
  }
}
