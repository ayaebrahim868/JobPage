import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IJobCard } from '../../interfaces/job-card.interface';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss'],
  standalone: true,
  imports: [NgIf]
})
export class JobCardComponent {
 /** jobData */
 @Input() public jobData: IJobCard = {};
 /** viewDetails */
 @Output() public viewDetails: EventEmitter<any>= new EventEmitter();
  /** deleteItem */
  @Output() public deleteItem: EventEmitter<any>= new EventEmitter();
  /**
   * deleteItemFun
   */
  public deleteItemFun() {
    this.deleteItem.emit();
  }
  /**
   * viewDetailsFun
   */
  public viewDetailsFun() {
    this.viewDetails.emit();
  }
}
