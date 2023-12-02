import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFilteredItems } from './radio-button-filters.interface';
import { FilterUniquePipe } from '../../pipes/filter-unique/filter-unique.pipe';

@Component({
  selector: 'app-radio-button-filters',
  templateUrl: './radio-button-filters.component.html',
  styleUrls: ['./radio-button-filters.component.scss'],
  standalone: true,
  imports: [NgFor, NgIf],
  providers: [FilterUniquePipe]
})
export class RadioButtonFiltersComponent implements OnInit {
  constructor(private filterUniquePipe: FilterUniquePipe){}
@Input() public filteredItems: IFilteredItems = {list: [], section:''};
@Output() public selectFilterEmit: EventEmitter<any> = new EventEmitter()
public section: any;
ngOnInit(): void {
 this.section = this.filteredItems?.section && this.filteredItems?.section.charAt(0).toUpperCase() + this.filteredItems?.section.slice(1);
}

public filteredArray(): any[] {
  if(this.filteredItems?.list) return  this.filterUniquePipe.transform(this.filteredItems?.list, this.filteredItems.section);
  else return []
 }

 public selectFilter(ev: any) {
  this.selectFilterEmit.emit({ev, filteredSection: this.filteredItems?.section});
}
}
