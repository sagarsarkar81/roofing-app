import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App } from 'ionic-angular';
import { Auth } from '../../providers/auth';
//import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { NativeStorage } from '@ionic-native/native-storage';
import { AllProjects } from '../../pages/allProjects/allProjects';
import { Supplier } from '../../pages/supplier/supplier';

import { MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, AlertController } from 'ionic-angular';
import { GlobalValidator } from '../../validator/globalvalidator'
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the Addsupplier page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-addsupplier',
  templateUrl: 'addsupplier.html',
})
export class Addsupplier {
  data: any;
  arr: any;
  project_id: any;
  id: any = null;
  msg: any;
  loading: any;
  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, public auth: Auth, private filePath: FilePath,
    //private fileChooser: FileChooser,
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
    this.auth.allsupplier().subscribe((res) => {
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
    if (this.id == null) {
      this.presentToast('Please Select Atleast One Supplier').then(() => {

      })
    } else {
      this.nativeStorage.getItem('uesrInfo').then((datx) => {
        let postobj = {
          project_id: this.arr.id,
          supplier_id: this.id

        };
        console.log(postobj);
        this.loading.present();
        this.auth.addsupplier(postobj).subscribe((res) => {
          this.loading.dismiss();
          console.log(res);
          this.auth.getopenassignement().subscribe((resx) => {
            this.menuController.enable(true, 'unauthenticated');
            this.navCtrl.setRoot(Supplier, { obj: resx });
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
