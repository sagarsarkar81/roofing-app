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
import { ForgotPassword } from '../forgot-password/forgot-password';
/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  loading: any;
  Loginform: FormGroup;
  msg: any;
  arr = [];
  submitAttempt: boolean = false;
  constructor(public navCtrl: NavController,
    private nativeStorage: NativeStorage,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    public menuCtrl: MenuController,
    public navParams: NavParams,
    public auth: Auth) {
    this.menuCtrl.enable(false);
    this.Loginform = formBuilder.group({
      //  fullname: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],

      //termcheck: ['',Validators.required]
    });
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }
  /**
  @param
  @return

  LOGIN
   */
  loginaction() {
    let env = this;
    if (!this.Loginform.valid) {
      this.submitAttempt = true;
      this.msg = "Please fill out all details accurately.";
      this.presentToast(this.msg).then(() => {


      })
    } else {
      this.submitAttempt = false;
      let obj = this.Loginform.value;
      let postobj = {
        username: obj.email,
        password_text: obj.password
      };
      this.loading.present();
      this.auth.login(postobj).subscribe((data) => {


        console.log(this.arr);
        if (data.success) {
          console.log(data.data);
          this.loading.dismiss();
          for (let dt of data.data) {
            this.arr.push(dt.email);
            this.arr.push(dt.first_name);
            this.arr.push(dt.last_name);
            this.arr.push(dt.username);
            this.arr.push(dt.id);
            this.arr.push(dt.name);

          }
          console.log(this.arr);
          this.nativeStorage.setItem('uesrInfo', { email: this.arr[0], first_name: this.arr[1], last_name: this.arr[2], name: this.arr[3], id: this.arr[4], type: this.arr[5] })
            .then(
            (data) => {
              console.log('Stored item!');
              console.log(data);
              this.menuCtrl.enable(true);
              this.navCtrl.setRoot(Dashboard);
            },
            error => console.error('Error storing item', error)
            );

        } else {
          this.loading.dismiss();
          this.msg = data.msg;
          this.presentToast(this.msg).then((res) => {

          }, (err) => {

          });
        }
      }, (error) => {
        console.log(error);
      })
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
    forgetpass(){
    this.navCtrl.setRoot(ForgotPassword);
    }
}
