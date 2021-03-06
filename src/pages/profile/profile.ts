import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { API_CONFIG } from '../../app/config/api.config';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente: ClienteDTO;
  picture: string;
  cameraOn: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public storage: StorageService,
              public clienteService: ClienteService,
              public camera: Camera) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  private loadData(){
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email)
                         .subscribe( response => {
                           this.cliente = response as ClienteDTO;
                           this.getImageIfExists();                  
                         },
                        error => {
                          if(error.status === 403){
                            this.redirectToHomePage();
                          }
                        });
    } else {
      this.redirectToHomePage();
    }
  }

  redirectToHomePage(){
    this.navCtrl.setRoot('HomePage');
  }

  getImageIfExists(){
    this.clienteService.getImageFromBucket(this.cliente.id)
    .subscribe(response => {
      this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
    },
    error => {})
  }

  getCameraPicture(){
    this.cameraOn = true;
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     this.picture = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });

    this.cameraOn = false;
  }

  sendPicture(){
    this.clienteService.uploadPicture(this.picture)
        .subscribe(response => {
          this.picture = null;
          this.loadData();
        },
      error =>{

      })
  }

  cancel(){
    this.picture = null;
  }

}
