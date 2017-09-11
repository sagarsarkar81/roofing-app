import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App} from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, AlertController } from 'ionic-angular';
import { GlobalValidator } from '../../validator/globalvalidator'
import { ToastController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Dashboard } from '../dashboard/dashboard';
import { UserManagement } from '../../pages/user-management/user-management';
/**
 * Generated class for the EditUser page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-edit-user',
  templateUrl: 'edit-user.html',
})
export class EditUser {
  getdata: any;
  loading: any;
  EditUserForm: FormGroup;
  msg: any;
  arr = [];
  submitAttempt: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private nativeStorage: NativeStorage,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    public menuCtrl: MenuController,
    public auth: Auth,
    public apctrl: App) {
    this.nativeStorage.getItem('uesrInfo').then((datax) => {
      if ((datax.type == '5') || (datax.type == '6') || (datax.type == '7')) {
        this.menuCtrl.enable(true, 'authenticated');
        this.menuCtrl.enable(false, 'unauthenticated');
      } else {
        this.menuCtrl.enable(false, 'authenticated');
        this.menuCtrl.enable(true, 'unauthenticated');
      }

    });
    this.getdata = this.navParams.get('val');
    console.log(this.getdata);
    this.EditUserForm = formBuilder.group({
      //  fullname: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: [this.getdata.email, Validators.compose([Validators.required])],
      password_text: ['',],
      username: [this.getdata.username, Validators.compose([Validators.required])],
      first_name: [this.getdata.first, Validators.compose([Validators.required])],
      last_name: [this.getdata.last, Validators.compose([Validators.required])],
      pass_confirm: ['',],
      oldpass: ['',],


      //termcheck: ['',Validators.required]
    });
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditUser');
  }
  updateaction() {
    let env = this;

    if (!this.EditUserForm.valid) {
      this.submitAttempt = true;
      this.msg = "Please fill out all details accurately.";
      this.presentToast(this.msg).then(() => {


      })

    } else {
      this.loading.present();

      let obj = this.EditUserForm.value;


      var postobj = {
        id: this.getdata.id,
        first_name: obj.first_name,
        last_name: obj.last_name,
        username: obj.username,
        password_text: obj.password_text,
        email: obj.email,
        oldpassword: obj.oldpass
      }


      console.log(postobj);
      if ((obj.password_text == obj.pass_confirm)) {

        this.auth.updateuser(postobj).subscribe((res) => {
          if (res.success) {
            this.loading.dismiss();
            this.msg = res.msg;
            this.presentToast(this.msg).then(() => {
              this.auth.alluser().subscribe((res) => {

                this.apctrl.getRootNav().push(UserManagement, { obj: res });
              }, () => {

              });


            })

          } else {
            this.loading.dismiss();
            this.msg = res.msg;
            this.presentToast(this.msg).then(() => {


            })
          }
        }, (error) => {
          this.loading.dismiss();
        });
      } else {
        this.loading.dismiss();
        this.msg = "Both Password Field Must Be Same";
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
  popView() {
    this.navCtrl.pop();
  }
}
