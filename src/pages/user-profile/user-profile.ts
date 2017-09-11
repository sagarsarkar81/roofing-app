import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, AlertController } from 'ionic-angular';
import { GlobalValidator } from '../../validator/globalvalidator'
import { ToastController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Auth } from '../../providers/auth';
import { Dashboard } from '../dashboard/dashboard';
import {UPLOAD_DIRECTIVES} from 'ng2-file-uploader/ng2-file-uploader';
/**
 * Generated class for the UserProfile page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',

})
export class UserProfile {
  loading: any;
  email: any;
  name: any;
  msg: any;
  submitAttempt: boolean = false;
  base64Image: any;
  iscam: boolean;
  isremote: boolean;
  arr: any;
  id: any;
  employee_code: any;
  father_name: any;
  mother_name: any;
  date_of_birth: any;
  date_of_joining: any;
  date_of_leaving: any;
  contact_number: any;
  alternate_contact_number: any;
  alternate_email: any;
  present_address: any;
  permanent_address: any;
  facebook_link: any;
  twitter_link: any;
  blogger_link: any;
  linkedin_link: any;
  googleplus_link: any;
  photo: any;
  constructor(public navCtrl: NavController,
    private camera: Camera,
    public navParams: NavParams,
    private filePath: FilePath,
    private fileChooser: FileChooser,
    private file: File, private nativeStorage: NativeStorage,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    public menuCtrl: MenuController,
    public auth: Auth) {
    this.iscam = false;
    this.isremote = true;
    this.employee_code = "";
    this.father_name = "";
    this.mother_name = "";
    this.date_of_birth = "";
    this.date_of_joining = "";
    this.date_of_leaving = "";
    this.contact_number = "";
    this.alternate_contact_number = "";
    this.alternate_email = "";
    this.present_address = "";
    this.permanent_address = "";
    this.facebook_link = "";
    this.twitter_link = "";
    this.blogger_link = "";
    this.linkedin_link = "";
    this.googleplus_link = "";
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.nativeStorage.getItem('uesrInfo').then((datax) => {
      if ((datax.type == '5') || (datax.type == '6') || (datax.type == '7')) {
        this.menuCtrl.enable(true, 'authenticated');
        this.menuCtrl.enable(false, 'unauthenticated');
      } else {
        this.menuCtrl.enable(false, 'authenticated');
        this.menuCtrl.enable(true, 'unauthenticated');
      }

    });
  }

  ionViewDidLoad() {
    this.nativeStorage.getItem('uesrInfo').then((data) => {
      //console.log(data);
      let dt = {
        id: data.id
      }
      this.id = data.id;
      this.email = data.email;
      this.name = data.first_name + ' ' + data.last_name;
      //console.log(dt);
      this.loading.present();
      this.auth.getprofiledata(dt).subscribe((data) => {

        this.arr = data.data;
        //console.log(this.arr.employee_code);
        this.employee_code = this.arr.employee_code;
        this.father_name = this.arr.father_name;
        this.mother_name = this.arr.mother_name;
        this.date_of_birth = this.arr.date_of_birth;
        this.date_of_joining = this.arr.date_of_joining;
        this.date_of_leaving = this.arr.date_of_leaving;
        this.contact_number = this.arr.contact_number;
        this.alternate_contact_number = this.arr.alternate_contact_number;
        this.alternate_email = this.arr.alternate_email;
        this.present_address = this.arr.present_address;
        this.permanent_address = this.arr.permanent_address;
        this.facebook_link = this.arr.facebook_link;
        this.twitter_link = this.arr.twitter_link;
        this.blogger_link = this.arr.blogger_link;
        this.linkedin_link = this.arr.linkedin_link;
        this.googleplus_link = this.arr.googleplus_link;
        this.photo = this.arr.PRO;
        this.loading.dismiss();
      }, (error) => {
        //console.log(error);
      });

    }, () => {

    });
  }
  chooseFile() {
    this.fileChooser.open()
      .then((uri) => {

        this.filePath.resolveNativePath(uri)
          .then(
          (filePath) => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            var currentName = uri.substr(uri.lastIndexOf('/') + 1);
            this.readAsDataURL(correctPath, currentName).then((res) => {
              //console.log(res);
              this.photo = res;
            }, (error) => {

            });

            // this.message=res;
            // this.chatService.sendMessagewithatt(this.message);

          },
          (err) => {
            //console.log("Error" + err);
          });

      },
      (err) => {
        //console.log('Error while selecting File.' + err);
      });


  }

  readAsDataURL(path, file): Promise<any> {
    return new Promise((resolve, reject) => {
      this.file.readAsDataURL(path, file).then(success => {
        //console.log("success" + success);
        let attachementData = success.slice(success.indexOf('base64,') + 7);
        resolve(attachementData);
      }, error => {
        //console.log("error" + error);
      });
    });
  }
  openCamera() {
    this.iscam = true;
    this.isremote = false;
    const options: CameraOptions = {
      quality: 10,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    }

    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/png;base64,' + imageData;
      //console.log(imageData);
      //this.message=this4Image;
      this.photo = imageData;
    }, (err) => {
    });

  }
  submitaction() {
    let obj = {
      user_id: this.id,
      employee_code: this.employee_code,
      father_name: this.father_name,
      mother_name: this.mother_name,
      date_of_birth: this.date_of_birth,
      date_of_joining: this.date_of_joining,
      date_of_leaving: this.date_of_leaving,
      contact_number: this.contact_number,
      alternate_contact_number: this.alternate_contact_number,
      alternate_email: this.alternate_email,
      present_address: this.present_address,
      permanent_address: this.permanent_address,
      facebook_link: this.facebook_link,
      twitter_link: this.twitter_link,
      blogger_link: this.blogger_link,
      linkedin_link: this.linkedin_link,
      googleplus_link: this.googleplus_link,
      photo: this.photo
    }

    const sub = this.auth.profileupdate(obj).subscribe((res) => {

      console.log(res);
      if (res.success) {

        sub.unsubscribe();
        this.msg = res.msg;
        this.presentToast(this.msg).then((resz) => {
          //  this.navCtrl.pop();

        }, (err) => {
          console.log(err);
        })
      }


    }, (error) => {

    }, () => {
      console.log('complete');
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
}
