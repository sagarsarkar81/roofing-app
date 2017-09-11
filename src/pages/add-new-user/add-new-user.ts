import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, AlertController } from 'ionic-angular';
import { GlobalValidator } from '../../validator/globalvalidator'
import { ToastController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Dashboard } from '../dashboard/dashboard';
import { UserManagement } from '../user-management/user-management';
/**
 * Generated class for the AddNewUser page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-new-user',
  templateUrl: 'add-new-user.html',
})
export class AddNewUser {
  role: any;
  loading: any;
  AddUserForm: FormGroup;
  msg: any;
  arr = [];
  submitAttempt: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private nativeStorage: NativeStorage,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    public menuCtrl: MenuController,

    public auth: Auth) {
    this.nativeStorage.getItem('uesrInfo').then((datax) => {
      if ((datax.type == '5') || (datax.type == '6') || (datax.type == '7')) {
        this.menuCtrl.enable(true, 'authenticated');
        this.menuCtrl.enable(false, 'unauthenticated');
      } else {
        this.menuCtrl.enable(false, 'authenticated');
        this.menuCtrl.enable(true, 'unauthenticated');
      }

    });
    this.auth.getrole().subscribe((data) => {
      if (data.success) {
        this.role = data.data;
      } else {

      }

    })
    this.AddUserForm = formBuilder.group({
      //  fullname: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*'), Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.pattern('[a-z0-9!#$%&*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*')])],
      password_text: ['', Validators.compose([Validators.required,Validators.minLength(4)])],
      username: ['', Validators.compose([Validators.required, Validators.pattern('[A-Za-z0-9@%$]+(?:[ _-][A-Za-z0-9]+)*')])],
      first_name: ['', Validators.compose([Validators.required])],
      last_name: ['', Validators.compose([Validators.required])],
      pass_confirm: ['', Validators.compose([Validators.required,Validators.minLength(4)])],
      user_type: ['', Validators.required],

      //termcheck: ['',Validators.required]
    });
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddNewUser');
  }
  staffaction() {
    let env = this;

    if (!this.AddUserForm.valid) {
      this.submitAttempt = true;
      this.msg = "Please fill out all details accurately.";
      this.presentToast(this.msg).then(() => {


      })

    } else {

      let obj = this.AddUserForm.value;
      console.log(obj);
      if (obj.password_text == obj.pass_confirm) {


        let postobj = {
          first_name: obj.first_name,
          last_name: obj.last_name,
          username: obj.username,
          email: obj.email,
          user_type: obj.user_type,
          password_text: obj.password_text,
          confirm_password: obj.pass_confirm
        };
        this.loading.present();
        this.auth.adduser(postobj).subscribe((res) => {
          if (res.success) {
            this.loading.dismiss();
           // this.navCtrl.setRoot(Dashboard);
            this.auth.alluser().subscribe((res) => {
this.navCtrl.setRoot(UserManagement,{obj:res.data});

 });
          } else {
            this.loading.dismiss();
            this.msg = res.msg;
            this.presentToast(this.msg).then(() => {
 

            })
          }

        }, (error) => {
          this.loading.dismiss();
        })

      } else {
        this.loading.dismiss();
        this.msg = "Both Password Field Value Must Be Same";
        this.presentToast(this.msg).then(() => {


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
