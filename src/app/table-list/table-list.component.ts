import { Component, OnInit ,Inject} from '@angular/core';
import { DataService } from '../shared/services/data.service';
import {AlertserviceService} from '../shared/services/alertservice.service';
import { AuthService } from '../shared/services/auth.service';


export interface DialogData {
  cid:string;
  cname:string;
  
}


@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  cid;
  cname;
  rid;
userData;
categoryName
categoryId;
selectedCategory;
categories:any=[];
userProfile;
  constructor(private api:DataService,private alert:AlertserviceService,private auth:AuthService) {
 

   }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('user'));
    this.auth.fetchUser(this.userData.uid).subscribe(res=>{
      this.userProfile=res;
    })
    this.api.fetchCategories(this.userData.uid).subscribe(res=>{
      this.categories=res;
      console.log(this.categories);
    })

  }

addCategory(){
  this.categoryId=this.makeid(18);
  const x=this.categoryId
let category={
  cid:x,
  rid:this.userData.uid,
  cname:this.categoryName
}
if(this.userProfile.status==="new"){
  this.alert.showError("Your profile isn't complete;kindly complete it and try again ")
}
else{


this.api.addCategory(category,x).then(res=>{
  this.alert.showSuccess("category added successfully")
})
}
}


editCategory(cat){
  console.log(cat);
  this.selectedCategory=cat;
  this.categoryName=this.selectedCategory.cname;
}

deleteCategory(cat){
  this.selectedCategory=cat;
}


delete(){
  this.api.deleteCategory(this.selectedCategory.cid).then(res=>{
    this.alert.showError("category deleted succesfully");
  })
}

saveChange(){
  let changeCategory={
    cid:this.selectedCategory.cid,
    rid:this.selectedCategory.rid,
    cname:this.categoryName
  }
  this.api.updateCategory(changeCategory).then(res=>{
    this.alert.showSuccess("category updated successfully");
  })
}



makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
 
}



