import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Router } from '@angular/router';
import {AlertserviceService} from '../shared/services/alertservice.service';



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  de;
  userData;
  userObject;
  firstName;
  lastName;
  restaurantName;
  openTime;
  closeTime;
  email;
  address;
  city;
  country;
  post;
  reviews;
  lat;
  lng;

  //AGM STUFF

  filePath: String
  dImage;

//pushstuff
currentToken


  constructor(private api: AuthService,
    private ngZone: NgZone, private afStorage: AngularFireStorage, private router: Router,private alert:AlertserviceService) { }

  basePath = '/images';                       //  <<<<<<<
  downloadableURL = '';                      //  <<<<<<<
  task: AngularFireUploadTask;

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('user'));
    this.currentToken = localStorage.getItem("token");
    console.log(this.currentToken);
    let update = {
      cToken: this.currentToken
    }
    this.api.userUpdate(this.userData.uid,update).then(res=>{
      this.alert.showSuccess("token updated")
    }).catch(err=>{
      this.alert.showError("error enabling push notification")
    })
    console.log(this.userData);
    this.api.fetchUser(this.userData.uid).subscribe(res => {
      this.userObject = res;
      this.firstName = this.userObject.firstName;
      this.lastName = this.userObject.lastName;
      this.restaurantName = this.userObject.restaurantName;
      this.openTime = this.userObject.openTime;
      this.closeTime = this.userObject.closeTime;
      this.email = this.userObject.email;
      this.address = this.userObject.address;
      this.city = this.userObject.city;
      this.country = this.userObject.country;
      this.post = this.userObject.post;
      this.reviews = this.userObject.reviews;
      this.downloadableURL = this.userObject.imageurl;

    })

    //agm stuff

  }
  updateUser() {

    let updatedObject = {
      firstName: this.firstName,
      lastName: this.lastName,
      restaurantName: this.restaurantName,
      openTime: this.openTime,
      closeTime: this.closeTime,
      address: this.address,
      city: this.city,
      country: this.country,
      post: this.post,
      status: "active",
      lat: this.lat,
      lng: this.lng,

    }
    if (this.firstName === undefined || this.lastName === undefined || this.restaurantName === undefined || this.openTime === undefined || this.closeTime === undefined || this.address === undefined || this.city === undefined || this.country === undefined || this.post === undefined) {
      this.alert.showError("kindly fill full form")
    }
    else {
      this.api.userUpdate(this.userData.uid, updatedObject).then(res => {
        console.log(res);
        this.alert.showSuccess("profile updated successfully")

      })
    }

  }
  async onFileChanged(event) {
    const file = event.target.files[0];
    if (file) {
      const filePath = `${this.basePath}/${file.name}`;  // path at which image will be stored in the firebase storage
      this.task = this.afStorage.upload(filePath, file);    // upload task

      // this.progress = this.snapTask.percentageChanges();


      (await this.task).ref.getDownloadURL().then(url => {
      this.downloadableURL = url;
        this.api.userUpdate(this.userData.uid, { imageurl: this.downloadableURL }).then(res => {
          console.log(res);
          this.alert.showSuccess("profile pic updated successfully")
        })

      });  // <<< url is found here



    } else {
      alert('No images selected');
      this.downloadableURL = '';
    }



  }


  onLocationSelected($event) {
    console.log($event);
    this.lat = $event.latitude;
    this.lng = $event.longitude;
  }

  onAutocompleteSelected($event) {
    console.log($event)
    this.address = $event.formatted_address;
    console.log(this.address);
  }


  logout() {
    this.api.SignOut().then(res => {
      this.router.navigateByUrl('entry')
    })
  }
}






