import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IJobCard } from '../../interfaces/job-card.interface';
import { AddNewService } from '../../services/add-new.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
    selector: 'app-overlay',
    templateUrl: './add-new-overlay.component.html',
    styleUrls: ['./add-new-overlay.component.scss'],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, NgFor, NgIf]
})
export class AddNewOverlayComponent implements AfterViewInit, OnInit  {
  @Output() close:EventEmitter<string>= new EventEmitter();
  @Output() addItemInList:EventEmitter<any>= new EventEmitter();
  public countriesAndCities: any[] = [];
  public sectors: any;
  @Input() chaechedArray : IJobCard[] = [];
  @ViewChild('container') container!: ElementRef;
  public addForm !: FormGroup;
  public countryIndex: number =0;
  constructor(private fb: FormBuilder,  private addNewService: AddNewService){}
ngAfterViewInit(): void {
  this.container.nativeElement.style.display = 'flex';
  this.container.nativeElement.scrollIntoView({behavior: 'smooth'});

}
ngOnDestroy(): void {
  this.container.nativeElement.style.display = 'none';
}
ngOnInit(): void {
  this.addNewService.getCountryList().subscribe({
    next: (list) => {
      this.countriesAndCities = list;
      console.log('country', this.countriesAndCities[0].cities);
    }
  });
  this.addNewService.getSectorList().subscribe({
    next: (list) => {
      this.sectors = list
      console.log('sectors',this.sectors);
      console.log('sectors',typeof(this.sectors));
    }
  });

  this.addForm = this.formGroupFn();
}
public closeBtn() {
  this.close.emit();
}
/**
 * addItemInListFun
 */
public addItemInListFun() {
        this.addItemInList.emit({name:this.addForm.value.name, description: this.addForm.value.description, sector: this.addForm.value.sector, country:this.addForm.value.country, city: this.addForm.value.city, img: 'job.png' });
}
public formGroupFn(){
  return this.fb.group({
     name: [ null, Validators.required],
     description: [null, Validators.required],
     sector: ['selected', Validators.required],
     country: ['selected', Validators.required],
     city: ['selected', Validators.required],
   });
 }
 public selectCountryFun(ev:any){
  console.log(ev.target.value);
  this.countriesAndCities.filter((item,i)=>{
    if(ev.target.value == item.country) {
     this.countryIndex = i;
    console.log('item.cities', this.countryIndex);
  }
  })
 }
}
