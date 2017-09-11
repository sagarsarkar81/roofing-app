import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, AlertController } from 'ionic-angular';
import { GlobalValidator } from '../../validator/globalvalidator'
import { ToastController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Auth } from '../../providers/auth';
import { Dashboard } from '../dashboard/dashboard';
/**
 * Generated class for the ChangePassword page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePassword {
  loading: any;
  ChangePassword: FormGroup;
  msg: any;
  arr = [];
  submitAttempt: boolean = false;
  constructor(public navCtrl: NavController, private nativeStorage: NativeStorage,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    public menuCtrl: MenuController,
    public navParams: NavParams,
    public auth: Auth) {
    // this.nativeStorage.getItem('uesrInfo').then((datax) => {
    //   if ((datax.type == '5') || (datax.type == '6') || (datax.type == '7')) {
    //     this.menuCtrl.enable(true, 'authenticated');
    //     this.menuCtrl.enable(false, 'unauthenticated');
    //   } else {
    //     this.menuCtrl.enable(false, 'authenticated');
    //     this.menuCtrl.enable(true, 'unauthenticated');
    //   }
    //
    // });
    this.auth.menuectrl().then(()=>{

    },()=>{

    })
    this.ChangePassword = formBuilder.group({
      //  fullname: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      confirm_password: ['', Validators.compose([Validators.required])],
      password_text: ['', Validators.compose([Validators.required,Validators.minLength(4)])],
      new_password: ['', Validators.compose([Validators.required,Validators.minLength(4)])],

      //termcheck: ['',Validators.required]
    });
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePassword');
  }
  changepassaction() {
    let env = this;
    if (!this.ChangePassword.valid) {
      this.submitAttempt = true;
      this.msg = "Please fill out all details accurately.";
      this.presentToast(this.msg).then(() => {


      })
    } else {
      this.loading.present();
      this.nativeStorage.getItem('uesrInfo').then((data) => {
        console.log(data);
        let obj = this.ChangePassword.value;
        let postobj = {
          id: data.id,
          password_text: obj.password_text,
          new_password: obj.new_password,
          confirm_password: obj.confirm_password
        }
        console.log(postobj);
        //ccccc
        if (obj.new_password == obj.confirm_password) {
          this.auth.changpass(postobj).subscribe((res) => {
            this.loading.dismiss();
            if (res.success) {
              this.msg = res.msg;
              this.presentToast(this.msg).then(() => {

                this.navCtrl.setRoot(Dashboard);
              })
            } else {
              this.msg = res.msg;
              this.presentToast(this.msg).then(() => {


              })
            }
            console.log(res);
          }, (error) => {
            this.loading.dismiss();
          });
        } else {
          this.loading.dismiss();
          this.msg = 'New Password And ConfirmPassword Field Shoul Same';
          this.presentToast(this.msg).then(() => {


          })
        }
        //cccc
      });
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
