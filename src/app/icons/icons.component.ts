import { Component, OnInit } from '@angular/core';
import {DataService} from '../../app/shared/services/data.service';
import {AuthService} from '../shared/services/auth.service';
import {AlertserviceService} from '../shared/services/alertservice.service'
@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {
categories;
userData;
orders:any=[];
selectedOrder;
editCategory;
selectedTime;
customerDetails;
time;
status=[
  {value:'open',name:"open"},
  {value:'ready',name:"accepted"},
  {value:'rejected',name:"rejected"},
  {value:'ready',name:"preparing"},
  {value:'pickedup',name:"pickedup"},
  {value:'finished',name:"finished"},




]



  constructor(private api:DataService,private auth:AuthService,private alert:AlertserviceService) { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('user'));
    this.api.fetchOrders(this.userData.uid).subscribe(res=>{
      this.orders=[];
      res.forEach(element => {
        const data = element.payload.doc.data() as {};
        const id = element.payload.doc.id as {};
        this.orders.push({...data,id})
      });


console.log(this.orders);
    })

  }
  saveChange(){

    console.log(this.editCategory);
    console.log(this.selectedTime);
if(this.selectedTime===undefined)
{
  this.selectedTime=this.selectedOrder.deliveryTime
}

else{
  console.log("it's defined")
}
let update={
  status:this.editCategory,
  deliveryTime:this.selectedTime,
  id:this.selectedOrder.id
}
this.api.updateOrder(update).then(res=>{
  this.sendNotification();
}).catch(err=>{
  console.log(err);
})
  }


  editOrder(x){
this.selectedOrder=x;
this.editCategory=x.status;
this.auth.fetchUser(this.selectedOrder.uid).subscribe(res=>{
this.customerDetails=res;
console.log(this.customerDetails.email);
})
  }


  sendNotification(){
    let notification={
      rid:this.userData.uid,
      email:this.customerDetails.email,
      cid:this.customerDetails.uid,
      uname:this.customerDetails.username,
      message:"Greetings! your order from "+this.selectedOrder.resname+" has been updated and now the status is " + this.editCategory + "And will be ready at " + this.selectedTime
    
    }
    this.api.createNotification(notification).then(res=>{
      this.alert.showSuccess("order updated and user notified ");
    })
  }


}
