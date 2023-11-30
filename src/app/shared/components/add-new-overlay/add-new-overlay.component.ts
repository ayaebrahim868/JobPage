import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IJobCard } from '../../interfaces/job-card.interface';

@Component({
    selector: 'app-overlay',
    templateUrl: './add-new-overlay.component.html',
    styleUrls: ['./add-new-overlay.component.scss'],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule]
})
export class AddNewOverlayComponent implements AfterViewInit, OnInit  {
  @Output() close:EventEmitter<string>= new EventEmitter();
  @Output() addItemInList:EventEmitter<any>= new EventEmitter();

  @Input() chaechedArray : IJobCard[] = [];
  @ViewChild('container') container!: ElementRef;
  public addForm !: FormGroup;
  constructor(private fb: FormBuilder){}
ngAfterViewInit(): void {
  this.container.nativeElement.style.display = 'flex';
  this.container.nativeElement.scrollIntoView({behavior: 'smooth'});

}
ngOnDestroy(): void {
  this.container.nativeElement.style.display = 'none';
}
ngOnInit(): void {
  this.addForm = this.formGroupFn();
}
public closeBtn() {
  this.close.emit();
}
/**
 * addItemInListFun
 */
public addItemInListFun() {
        this.addItemInList.emit({name:this.addForm.value.name, description: this.addForm.value.description});
}
public formGroupFn(){
  return this.fb.group({
     name: [ null, Validators.required],
     description: [null, Validators.required],
   });
 }
}
