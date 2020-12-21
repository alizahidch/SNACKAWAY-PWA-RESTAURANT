import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class AlertserviceService {

  constructor(private toastr: ToastrService) { }


  showSuccess(message) {
    this.toastr.success(message, 'SNACK AWAY SUPPORT');
  }



  showError(message){
    this.toastr.error(message, 'SNACK AWAY SUPPORT', {
      timeOut: 3000,
    });
  }



}
