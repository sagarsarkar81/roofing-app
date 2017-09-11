import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App } from 'ionic-angular';
import { Auth } from '../../providers/auth';
// import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { NativeStorage } from '@ionic-native/native-storage';
import { AllProjects } from '../../pages/allProjects/allProjects';
import { Confirmdelivery } from '../../pages/confirmdelivery/confirmdelivery';

import { MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, AlertController } from 'ionic-angular';
import { GlobalValidator } from '../../validator/globalvalidator'
import { ToastController } from 'ionic-angular';


/**
 * Generated class for the Addconstructer page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-addconstructer',
  templateUrl: 'addconstructer.html',
})
export class Addconstructer {

  data: any;
  arr: any;
  project_id: any;
  id: any
  msg: any;
  loading: any;
  apxdt: any;
  apxcost: any;
  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, public auth: Auth, private filePath: FilePath,

    private file: File, private nativeStorage: NativeStorage, public menuController: MenuController, public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    public appCtrl: App) {
    this.nativeStorage.getItem('uesrInfo').then((datax) => {
      if ((datax.type == '5') || (datax.type == '6') || (datax.type == '7')) {
        this.menuController.enable(true, 'authenticated');
        this.menuController.enable(false, 'unauthenticated');
      } else {
        this.menuController.enable(false, 'authenticated');
        this.menuController.enable(true, 'unauthenticated');
      }

    });
    this.arr = this.navParams.get('passdata');
    console.log(this.arr.id);
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.auth.allconstructor().subscribe((res) => {
      if (res.success) {
        this.data = res.data;
      }

    }, () => {


    })
  }
  presentToast(msg): Promise<any> {
    return new Promise((resolve, reject) => {
      let toast = this.toastCtrl.create({
        message: msg,
        duration: 3000
      });
      toast.present().then(() => {
        resolve('ok');

      }, (error) => {
        reject('not ok');

      });

    });
  }
  finalsubmit() {
    if (this.apxcost == '' || this.apxcost == null || this.apxcost == undefined || this.apxdt == '' || this.apxdt == null || this.apxdt == undefined|| this.id == '' || this.id == null || this.id == undefined) {
      this.presentToast('Please fill out all field').then(() => {

      }, () => {

      })
    } else {

      this.nativeStorage.getItem('uesrInfo').then((datx) => {
        let postobj = {
          project_id: this.arr.id,
          constructor_id: this.id,
          date: this.apxdt,
          cost: this.apxcost,
        };
        console.log(postobj);
        this.loading.present();
        this.auth.addconstructur(postobj).subscribe((res) => {
          this.loading.dismiss();
          console.log(res);
          this.auth.confirmdeliveryproject().subscribe((resx) => {
            this.menuController.enable(true, 'unauthenticated');
            this.navCtrl.setRoot(Confirmdelivery, { obj: resx });
          }, (err) => {

            this.loading.dismiss();
          })


        }, (erro) => {
          console.log(erro);
          this.loading.dismiss();

        })

      });
    }

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Addsupplier');
  }
  popView() {
    this.navCtrl.pop();
  }


}
