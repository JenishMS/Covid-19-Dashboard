import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base',
  template: ''
})
export class BaseComponent implements OnInit {
  serverUrl = 'sfgs';
  constructor() { }

  ngOnInit(): void {
  }

}
