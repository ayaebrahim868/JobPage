import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild,  Input } from '@angular/core';
import { IJobCard } from '../../interfaces/job-card.interface';
import { JobCardComponent } from '../job-card/job-card.component';

@Component({
    selector: 'app-overlay',
    templateUrl: './show-details-overlay.component.html',
    styleUrls: ['./show-details-overlay.component.scss'],
    standalone: true,
    imports: [JobCardComponent]
})
export class ShowDetailsOverlayComponent implements AfterViewInit {
  @Output() close:EventEmitter<string>= new EventEmitter();

  @Input() jobCard !: IJobCard;
  @ViewChild('container') container!: ElementRef;
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

}
