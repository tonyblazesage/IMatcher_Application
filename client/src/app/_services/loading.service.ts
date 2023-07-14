import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loadingRequest = 0;


  constructor(private spinnerService: NgxSpinnerService) { }

  loading(){
    this.loadingRequest++;
    this.spinnerService.show(undefined, {
      type: 'square-jelly-box',
      bdColor: 'rgba(0,0,0,0.8)',
      color: '#008000',
  });
}

idle(){
  this.loadingRequest--;

  if(this.loadingRequest <= 0){
    this.loadingRequest = 0;
    this.spinnerService.hide();
  }
}



}
