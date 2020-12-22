import { Component, OnInit } from '@angular/core';
import {DataService} from '../../app/shared/services/data.service'
@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {
categories;
userData;
orders;
selectedOrder;
  constructor(private api:DataService) { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('user'));
    this.api.fetchOrders(this.userData.uid).subscribe(res=>{
this.orders=res;
console.log(this.orders);
    })

  }
  saveChange(){}


  editOrder(x){
this.selectedOrder=x;
console.log(this.selectedOrder);
  }
}
