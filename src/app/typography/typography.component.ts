import { Component, OnInit,ChangeDetectionStrategy  } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import {AlertserviceService} from '../shared/services/alertservice.service';
import {Router} from '@angular/router';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,

  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {

itemName;
itemIngredients;
preperationtime;
shortDescription;
categories:any=[];
menu:any=[];
userData;
selectedCategory;
price;
foodId;
editItem;

//image stuff

basePath = '/menuimages';                       //  <<<<<<<
downloadableURL = '';                      //  <<<<<<<
task: AngularFireUploadTask;


  constructor(private api:DataService,private alert:AlertserviceService,private router:Router,private afStorage: AngularFireStorage) {
   }

  ngOnInit() {

    this.userData = JSON.parse(localStorage.getItem('user'));

    this.api.fetchCategories(this.userData.uid).subscribe(res=>{
      this.categories=res;
      console.log(this.categories);
      if(this.categories.length===0){
        this.alert.showError("kindly created menu category first");
        this.router.navigateByUrl('/menu-categories')
      }
      else{
        console.log("categories exist");
      
      }
    })

    this.api.fetchFood(this.userData.uid).subscribe(res=>{
      this.menu=res;
      console.log(this.menu);
    })
  }



  async onFileChanged(event) {
    const file = event.target.files[0];
    if (file) {
      const filePath = `${this.basePath}/${file.name}`;  // path at which image will be stored in the firebase storage
      this.task = this.afStorage.upload(filePath, file);    // upload task

      // this.progress = this.snapTask.percentageChanges();


      (await this.task).ref.getDownloadURL().then(url => {
      this.downloadableURL = url;
       this.alert.showSuccess("photo uploaded successfully")

      });  // <<< url is found here



    } else {
      alert('No images selected');
      this.downloadableURL = '';
    }



  }



  addFood(){
    console.log(this.selectedCategory)
    this.foodId=this.makeid(18);
    const x=this.foodId;
    let foodObject={
      name:this.itemName,
      ingridients:this.itemIngredients,
      preperationtime:this.preperationtime,
      shortDescription:this.shortDescription,
      cid:this.selectedCategory.cid,
      image:this.downloadableURL,
      rid:this.userData.uid,
price:this.price,
fid:x

    }

if(this.itemName===undefined||this.itemIngredients===undefined||this.preperationtime===undefined||this.shortDescription===undefined||this.selectedCategory===undefined||this.downloadableURL===undefined||this.price===undefined)
{
  this.alert.showError("kindly fill all fields to create menu item")
}
else{
this.api.addFood(foodObject,x).then(res=>{
  this.alert.showSuccess("menu item created successfully");
})
}

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


editStart(x){
 this.editItem=x;
this.itemName=x.name;
this.itemIngredients=x.ingridients;
this.preperationtime=x.preperationtime;
this.shortDescription=x.shortDescription;
this.downloadableURL=x.image;
this.price=x.preperationtime
}


deleteItem(cat){
  this.editItem=cat;
}

delete(){
this.api.deleteFood(this.editItem.fid).then(res=>{
  this.alert.showError("item deleted successfully");
})
}

saveChange(){
  let changeItem={
    name:this.itemName,
    ingridients:this.itemIngredients,
    preperationtime:this.preperationtime,
    shortDescription:this.shortDescription,
    cid:this.editItem.cid,
    image:this.downloadableURL,
    rid:this.userData.uid,
price:this.price,
fid:this.editItem.fid
  }
  this.api.updateFood(changeItem).then(res=>{
    this.alert.showSuccess("item updated successfully");
    this.itemName=[];
    this.itemIngredients=[];
    this.preperationtime=[];
    this.shortDescription=[];
    this.downloadableURL='';
    this.price=[]

  })

}


}
