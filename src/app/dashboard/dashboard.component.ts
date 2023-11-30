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
import { debounceTime, takeUntil } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    JobCardComponent,
    FormsModule,
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {
  public jobListData: IJobCard[] = [];
  public cachedList: IJobCard[] = [];
  private searchSubject = new Subject<string>();
  private readonly debounceTimeMs = 300; // Set the debounce time (in milliseconds)
  public inputText: string = '';
  @ViewChild('modal', { read: ViewContainerRef })
  modal!: ViewContainerRef;
  constructor(private jobListService: JobListService){}
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
      this.jobListData= this.cachedList = list.reverse();
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
        // this.searchForm.reset();
        this.jobListData = [...this.cachedList];
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
          description: job?.description
        };
        return this.jobListService.createJobInList(payload);
      })
    )
    .subscribe((res: IJobCard) => {
      this.cachedList.unshift(res);
      this.jobListData = [...this.cachedList];
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
  this.jobListData = [];
    this.cachedList.filter((item) => {
      if (
        item.jobTitle?.toLowerCase()
          .includes(searchValue.toLowerCase())
      ) {
        this.jobListData.push(item);
      }
    });
}

}
