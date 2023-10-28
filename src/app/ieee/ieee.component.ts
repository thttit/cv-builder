import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ieee',
  templateUrl: './ieee.component.html',
  styleUrls: ['./ieee.component.css']
})
export class IeeeComponent implements OnInit {
  dataIEEE: any;

  constructor() { }

  ngOnInit() {
    this.dataIEEE = JSON.parse(localStorage.getItem('dataIEEE'));
  }
}
