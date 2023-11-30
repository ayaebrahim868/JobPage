import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-general-error-page',
  templateUrl: './general-error-page.component.html',
  styleUrls: ['./general-error-page.component.scss'],
  standalone: true
})
export class GeneralErrorPageComponent implements OnInit {
  /** error MSG */
  public errorMsg: any;
  constructor(private location: Location) {
    const state: any = location?.getState();
      this.errorMsg = state?.errorMsg

  }
  ngOnInit(): void {

  }
}
