import { Component} from '@angular/core';
import { MessagingService } from './services/messaging.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

constructor(private messagingService:MessagingService){
  this.requestPermission();
  this.listenForMessages();
}



listenForMessages() {
  console.log("listening")
  this.messagingService.getMessages().subscribe(async (msg: any) => {
    alert(msg.notification.body);

    console.log(msg);
    // const talert = await this.alertCtrl.create({
    //   header: msg.notification.title,
    //   subHeader: msg.notification.body,
    //   message: msg.data.info,
    //   buttons: ['OK'],
    // });

    // await talert.present();
  });
}






requestPermission() {
  this.messagingService.requestPermission().subscribe(
    async token => {
   alert(token)
      // const toast = await this.toastCtrl.create({
      //   message: 'Got your token',
      //   duration: 2000
      // });
      // toast.present();
    },
    async (err) => {
      alert(err)
      // const alert = await this.alertCtrl.create({
      //   header: 'Error',
      //   message: err,
      //   buttons: ['OK'],
      // });

    }
  );
}

async deleteToken() {
  this.messagingService.deleteToken();
  alert("token remoced")
//   const toast = await this.toastCtrl.create({
//     message: 'Token removed',
//     duration: 2000
//   });
//   toast.present();
// }


}


}