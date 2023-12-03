import { Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { JobListService } from '../shared/services/job.service';
import { IJobCard } from '../shared/interfaces/job-card.interface';
import { JobCardComponent } from '../shared/components/job-card/job-card.component';
import { DeleteConfirmationOverlayComponent } from '../shared/components/delete-confirmation-overlay/delete-confirmation-overlay.component';
import { switchMap } from 'rxjs';
import { AddNewOverlayComponent } from '../shared/components/add-new-overlay/add-new-overlay.component';
import { ShowDetailsOverlayComponent } from '../shared/components/show-details-overlay/show-details-overlay.component';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { RadioButtonFiltersComponent } from '../shared/components/radio-button-filters/radio-button-filters.component';
import { FilterPipe } from '../shared/pipes/filter/filter.pipe';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  providers: [FilterPipe],
  imports: [
    NgIf,
    NgFor,
    JobCardComponent,
    FormsModule,
    RadioButtonFiltersComponent,
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {
  public jobListData: IJobCard[] = [];
  public cachedList: IJobCard[] = [];
  public filterdArray: IJobCard[] | any[] = [];
  private searchSubject = new Subject<string>();
  private readonly debounceTimeMs = 300; // Set the debounce time (in milliseconds)
  public inputText: string = '';
  @ViewChild('modal', { read: ViewContainerRef })
  modal!: ViewContainerRef;
  constructor(private jobListService: JobListService, private filterPipe: FilterPipe){}
  ngOnInit(): void {
    this.getPageList();
    this.searchSubject.pipe(debounceTime(this.debounceTimeMs)).subscribe((searchValue) => {
      this.performSearch(searchValue);
    });
  }
/**
   * getPageList
   */
public getPageList() {
  this.jobListService.getJobList().subscribe({
    next: (list) => {
      this.jobListData= this.cachedList = list;
      if(this.cachedList.length> 10) {
        this.jobListData = this.cachedList.filter((item,index)=> index <10)
      }
    }

  });

}
 /**
   * createDynamicComponent
   */
 public createDynamicOverlay(dynamicComponent: any) {
  this.modal.clear();
  return this.modal.createComponent(dynamicComponent);
}
/**
 * deleteJobItemFunc
 */
public deleteJobItemFunc(id: any) {
  let ref: any = this.createDynamicOverlay(
    DeleteConfirmationOverlayComponent
  );
  ref.instance.close.subscribe(() => {
    this.modal.clear();
  });
  ref.instance.deleteItem
    .pipe(
      switchMap(() => {
        return this.jobListService.deleteJobInList(id);
      })
    )
    .subscribe(() => {
      this.cachedList.filter((item, index) => {
        if (item?.id === id) {
          this.cachedList.splice(index, 1);
        }
        // this.jobListData = [...this.cachedList];
        if(this.cachedList.length> 10) {
          this.jobListData = this.cachedList.filter((item,index)=> index <10)
        }
      });
      this.modal.clear();
    });
}

 /**
   * addNewFunc
   */
 public addNewFunc() {
  let ref: any = this.createDynamicOverlay(AddNewOverlayComponent);
  ref.instance.chaechedArray = [...this.cachedList];
  ref.instance.close.subscribe(() => {
    this.modal.clear();
  });
  ref.instance.addItemInList
    .pipe(
      switchMap((job: any) => {
        const payload: IJobCard = {
          jobTitle: job?.name,
          description: job?.description,
          sector: job?.sector,
          country: job?.country,
          city: job?.city,
          img: job?.img
        };
        return this.jobListService.createJobInList(payload);
      })
    )
    .subscribe((res: IJobCard) => {
      this.cachedList.unshift(res);
      // this.jobListData = [...this.cachedList];
      if(this.cachedList.length> 10) {
        this.jobListData = this.cachedList.filter((item,index)=> index <10)
      }
      this.modal.clear();
    });
}
/**
 * viewDetailsFun
 */
public viewDetailsFun(item: IJobCard) {
  let ref: any = this.createDynamicOverlay(ShowDetailsOverlayComponent);
  ref.instance.close.subscribe(() => {
    this.modal.clear();
  });
  ref.instance.jobCard = {...item, hideIcon: true};
}

/**
 * onSearch
 */
public onSearch() {
  this.searchSubject.next(this.inputText);
console.log('sess', this.inputText);

}
ngOnDestroy() {
  this.searchSubject.complete();
}

performSearch(searchValue: string) {
  this.jobListData = this.filterPipe.transform(this.cachedList,searchValue, 'jobTitle' );
}
public selectFilter(ev: any) {
  if(ev.ev.target.checked){
    this.filterdArray.push(...this.filterPipe.transform(this.cachedList,ev.ev.target.id, ev.filteredSection ));
  } else {
    this.filterdArray = this.filterdArray.filter((item) =>{
     return item[`${ev.filteredSection}`]?.toLowerCase() !== ev.ev.target.id.toLowerCase()
    })
  }
  if(this.filterdArray.length> 0) {
  this.jobListData = this.filterdArray;
  } else {
    this.jobListData = this.cachedList;
  }
}

public navFun(btnType: string) {
  let savedData =[];
  if(btnType == 'next') {
    savedData = [...this.jobListData];
    this.jobListData = this.cachedList.filter((item,index)=>item?.id && item?.id > this.jobListData.length);
  } else {
    this.jobListData = this.cachedList.filter((item,index)=> item?.id && item?.id < this.jobListData.length)
  }
}
}
