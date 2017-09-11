import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, AlertController } from 'ionic-angular';
import { GlobalValidator } from '../../validator/globalvalidator'
import { ToastController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Auth } from '../../providers/auth';
import { Login } from '../login/login';
/**
 * Generated class for the ForgotPassword page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPassword {
 Forgetform: FormGroup;
 loading:any;
  submitAttempt: boolean = false;
  msg:any;
  constructor(public navCtrl: NavController,  private nativeStorage: NativeStorage,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    public menuCtrl: MenuController,
    public navParams: NavParams,
   public auth: Auth) {

 this.menuCtrl.enable(false);
    this.Forgetform = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern('[a-z0-9!#$%&*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*')])],
      
    });
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPassword');
  }
          forgetcheck(){
          let env = this;
          if (!this.Forgetform.valid) {
          this.submitAttempt = true;
          this.msg = "Please fill out all details accurately.";
          this.presentToast(this.msg).then(() => {


          })
          } else {
          this.submitAttempt = false;
          let obj = this.Forgetform.value;
          let postobj = {
          email: obj.email,

          };
          this.loading.present();
          this.auth.forgetpass(postobj).subscribe((data) => {
            console.log(data);
             this.loading.dismiss();
          if(data.success){
          this.presentToast(data.msg).then(() => {


          })
          }else{
             this.loading.dismiss();
          this.presentToast(data.msg).then(() => {


          })
          }


          },()=>{
             this.loading.dismiss();
          this.presentToast('Some Error Occured Reconnecting...').then(() => {

          this.forgetcheck();
          })
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
  login(){
this.navCtrl.setRoot(Login);

  }
}
