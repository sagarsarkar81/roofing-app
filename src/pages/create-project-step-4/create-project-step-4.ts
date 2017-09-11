import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { NativeStorage } from '@ionic-native/native-storage';
import { Dashboard } from '../dashboard/dashboard';
import { MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, AlertController } from 'ionic-angular';
import { GlobalValidator } from '../../validator/globalvalidator'
import { ToastController } from 'ionic-angular';
/**
 * Generated class for the CreateProjectStep4 page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-create-project-step-4',
  templateUrl: 'create-project-step-4.html',
})
export class CreateProjectStep4 {
  data = [];
  project_id: any;
  id: any
  msg: any;
  loading: any;
  data_id: any = '';
  disable: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: Auth, private filePath: FilePath,
    private fileChooser: FileChooser,
    private file: File, private nativeStorage: NativeStorage, public menuController: MenuController, public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    private alertCtrl: AlertController, ) {
    this.project_id = this.navParams.get('project_id');
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present().then(() => {

      this.nativeStorage.getItem('uesrInfo').then((data) => {
        if (data.type == '4') {

          this.data_id = data.id;
          this.auth.getsalesman().subscribe((res) => {
            if (res.success) {
              this.loading.dismiss();
              for (let resx of res.data) {
                if (resx.id != this.data_id) {

                  this.data.push(resx)
                }

              }
              console.log(this.data);
            }

          }, () => {

          })

        } else {

          this.auth.getsalesman().subscribe((res) => {
            if (res.success) {
              this.loading.dismiss();
              for (let resx of res.data) {


                this.data.push(resx)


              }
              console.log(this.data);
            }

          }, () => {

          })
        }

      });

    }, () => {

    })


  }

  ionViewDidLoad() {

  }
  finalsubmit() {
    console.log(this.id);
    this.disable = true;
    var arr = [];
    if (this.id != undefined) {
      arr.push(this.id);
    }
    let str = '';
    for (var i = 0; i < arr.length; i++) {
      console.log(arr[i]);
      str += arr[i] + ',';
    }
    if (this.data_id != '') {

      str += this.data_id + ',';
    }
    str = str.replace(/,\s*$/, "");
    console.log(str);
    if (this.data_id != '') {
      console.log(str);
      let postobj = {
        user_id: str,
        project_id: this.project_id,
      }
      this.loading.present();
      this.auth.addsalesman(postobj).subscribe((res) => {

        this.loading.dismiss();
        console.log('final gotcha');
        console.log(postobj);
        if (res.success) {
          this.msg = res.msg;
          this.presentToast(this.msg).then(() => {
            this.menuController.enable(true);
            this.navCtrl.setRoot(Dashboard);

          })

        }


      }, (error) => {
        this.loading.dismiss();
      })
    } else {

      if (this.id == undefined) {
        console.log('ok');
        this.presentToast('Select Atleast One Sales Man').then(() => {

        })

      } else {
        console.log(str);
        let postobj = {
          user_id: str,
          project_id: this.project_id,
        }
        this.loading.present();
        this.auth.addsalesman(postobj).subscribe((res) => {

          this.loading.dismiss();
          console.log('final gotcha');
          console.log(postobj);
          if (res.success) {
            this.msg = res.msg;
            this.presentToast(this.msg).then(() => {
              this.menuController.enable(true);
              this.navCtrl.setRoot(Dashboard);

            })

          }


        }, (error) => {
          this.loading.dismiss();
        })
      }

    }


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

}
