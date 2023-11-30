import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild, OnInit } from '@angular/core';

@Component({
    selector: 'app-delet-confirmation-overlay',
    templateUrl: './delete-confirmation-overlay.component.html',
    styleUrls: ['./delete-confirmation-overlay.component.scss'],
    standalone: true
})
export class DeleteConfirmationOverlayComponent implements AfterViewInit{
  @Output() close:EventEmitter<string>= new EventEmitter();
  @Output() deleteItem:EventEmitter<any>= new EventEmitter();
  @ViewChild('container') container!: ElementRef;
  constructor(){}
ngAfterViewInit(): void {
  this.container.nativeElement.style.display = 'flex';
  this.container.nativeElement.scrollIntoView({behavior: 'smooth'});

}
ngOnDestroy(): void {
  this.container.nativeElement.style.display = 'none';
}
public closeBtn() {
  this.close.emit();
}
/**
 * deleteItemFun
 */
public deleteItemFun() {  
  this.deleteItem.emit();
}

}