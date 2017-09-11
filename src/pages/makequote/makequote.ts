import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App } from 'ionic-angular';
import { AddNewUser } from '../../pages/add-new-user/add-new-user';
import { EditUser } from '../../pages/edit-user/edit-user';
import { UserManagement } from '../../pages/user-management/user-management';
import { Userview } from '../../pages/userview/userview';
import { MenuController } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, AlertController } from 'ionic-angular';
import { GlobalValidator } from '../../validator/globalvalidator'
import { ToastController } from 'ionic-angular';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { NativeStorage } from '@ionic-native/native-storage';
import { Yourquote } from '../../pages/yourquote/yourquote';
/**
 * Generated class for the Makequote page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-makequote',
  templateUrl: 'makequote.html',
})
export class Makequote {
  arr: any;
  getdata: any;
  loading: any;
  Addquoteform: any;
  msg: any;
  quote_title: any = '';
  quote_description: any = '';
  aprox_cost: any = '';
  exact_cost: any = '';
  aprox_date: any = '';
  exact_date: any = '';
  total_cost: any = '';
  delivery_date: any = '';
  is_material_shortage: boolean;
  shortage_note: any = '';
  other_note: any = '';
  stchange: boolean;
  photo: any = '';
  loged_in: any;
  submitAttempt: boolean = false;
  submitAttempt2: boolean = false;
  submitAttempt3: boolean = false;
  submitAttempt4: boolean = false;
  submitAttempt5: boolean = false;
  submitAttempt6: boolean = false;
  submitAttempt7: boolean = false;
  submitAttempt8: boolean = false;
  submitAttempt9: boolean = false;
  submitAttempt10: boolean = false;
  submitAttempt11: boolean = false;
  shod: boolean = false;
  showspinner:boolean=false;
  constructor(public navCtrl: NavController, public auth: Auth, public navParams: NavParams, public viewCtrl: ViewController, public menuCtrl: MenuController, public appCtrl: App,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private filePath: FilePath,
    private fileChooser: FileChooser,
    private file: File,
    private nativeStorage: NativeStorage, ) {

    /*  this.Addquoteform = formBuilder.group({
        quotetitale: ['', Validators.compose([Validators.required])],

      });*/

    this.arr = this.navParams.get('val');
    console.log('gotcha to here');
    console.log(this.arr.id);
    this.stchange = false;

    this.nativeStorage.getItem('uesrInfo').then((datax) => {
      if ((datax.type == '5') || (datax.type == '6') || (datax.type == '7')) {
        this.menuCtrl.enable(true, 'authenticated');
        this.menuCtrl.enable(false, 'unauthenticated');
      } else {
        this.menuCtrl.enable(false, 'authenticated');
        this.menuCtrl.enable(true, 'unauthenticated');
      }
      this.loged_in = datax.type;
    });
    this.getdata = this.navParams.get('val');
    console.log(this.getdata);

    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Makequote');
  }
  updateaction() {
    console.log('hit it ok');

    // if ((this.quote_title == '' || this.quote_title == null || this.quote_title == undefined) ) {
    //     this.submitAttempt=true;

    // }
    // else   {
    //       this.submitAttempt=false;
    //   }

    // if ((this.quote_description == '' || this.quote_description == null || this.quote_description == undefined) ) {
    //     this.submitAttempt2=true;

    // }
    // else {
    //     this.submitAttempt2=false;
    // }

    if ((this.aprox_cost == '' || this.aprox_cost == null || this.aprox_cost == undefined)) {
      this.submitAttempt3 = true;

    }
    else {
      this.submitAttempt3 = false;
    }

    // if ((this.exact_cost == '' || this.exact_cost == null || this.exact_cost == undefined) ) {
    //     this.submitAttempt4=true;

    // }
    // else {
    //   this.submitAttempt4=false;
    // }

    if ((this.aprox_date == '' || this.aprox_date == null || this.aprox_date == undefined)) {
      this.submitAttempt5 = true;

    }
    else {
      this.submitAttempt5 = false;
    }

    if ((this.exact_date == '' || this.exact_date == null || this.exact_date == undefined)) {
      this.submitAttempt6 = true;

    }
    else {
      this.submitAttempt6 = false;
    }

    //  if ((this.total_cost == '' || this.total_cost == null || this.total_cost == undefined) ) {
    //     this.submitAttempt7=true;

    // }
    // else {
    //     this.submitAttempt7=false;
    // }

    // if ((this.delivery_date == '' || this.delivery_date == null || this.delivery_date == undefined) ) {
    //     this.submitAttempt8=true;

    // }
    // else {
    //     this.submitAttempt8=false;
    // }

    if ((this.stchange == true)) {
      if ((this.shortage_note == '' || this.shortage_note == null || this.shortage_note == undefined)) {
        this.submitAttempt10 = true;
      }
      else {
        this.submitAttempt10 = false;
      }
    }

    //  if ((this.other_note == '' || this.other_note == null || this.other_note == undefined) ) {
    //     this.submitAttempt11=true;

    // }
    // else{
    //   this.submitAttempt11=false;
    // }

    if (this.aprox_cost != '' && this.photo != '' &&
      this.aprox_date != '' && this.exact_date != '') {

      this.loading.present();
      this.submitAttempt = false;
      this.submitAttempt2 = false;
      this.submitAttempt3 = false;
      this.submitAttempt4 = false;
      this.submitAttempt5 = false;
      this.submitAttempt6 = false;
      this.submitAttempt7 = false;
      this.submitAttempt8 = false;
      this.submitAttempt9 = false;
      this.submitAttempt10 = false;
      this.submitAttempt11 = false;
      this.nativeStorage.getItem('uesrInfo').then((data) => {
        console.log(data);
        if (this.is_material_shortage) {
          let postobj = {
            quote_title: this.quote_title,
            id: this.arr.id,
            user_id: data.id,
            quote_description: this.quote_description,
            aprox_cost: this.aprox_cost,
            exact_cost: this.exact_cost,
            aprox_date: this.aprox_date,
            exact_date: this.exact_date,
            total_cost: this.total_cost,
            delivery_date: this.delivery_date,
            is_material_shortage: '1',
            shortage_note: this.shortage_note,
            other_note: this.other_note,
            material_list: this.photo,

          };
          console.log(postobj);
          this.auth.addquote(postobj).subscribe((res) => {
            console.log(res);
            this.loading.dismiss();
            this.presentToast(res.msg).then(() => {
              this.nativeStorage.getItem('uesrInfo').then((data) => {
                console.log(data);
                let postdata = {
                  id: data.id
                }
                console.log(postdata);
                this.loading.present();
                if (this.loged_in == "5") {
                  this.auth.allsupplierpendingquote(postdata).subscribe((res) => {
                    this.loading.dismiss();
                    console.log(res);
                    this.arr = res.data;

                  }, (err) => {
                    this.loading.dismiss();
                  })
                } else if (this.loged_in == "6") {
                  this.auth.allconstructorpendingquote(postdata).subscribe((res) => {
                    this.loading.dismiss();
                    console.log(res);
                    this.arr = res.data;

                  }, (err) => {
                    this.loading.dismiss();
                  })
                } else if (this.loged_in == "7") {
                  this.auth.allgutterpendingquote(postdata).subscribe((res) => {
                    this.loading.dismiss();
                    console.log(res);
                    this.arr = res.data;

                  }, (err) => {
                    this.loading.dismiss();
                  })
                }
                this.appCtrl.getRootNav().setRoot(Yourquote, { obj: this.arr });
              })

            }, () => {

            })

          }, (err) => {

            this.loading.dismiss();
          })
        } else {
          let postobj = {
            quote_title: this.quote_title,
            id: this.arr.id,
            user_id: data.id,
            quote_description: this.quote_description,
            aprox_cost: this.aprox_cost,
            exact_cost: this.exact_cost,
            aprox_date: this.aprox_date,
            exact_date: this.exact_date,
            total_cost: this.total_cost,
            delivery_date: this.delivery_date,
            is_material_shortage: '0',
            shortage_note: this.shortage_note,
            other_note: this.other_note,
            material_list: this.photo,

          };
          console.log(postobj);
          this.auth.addquote(postobj).subscribe((res) => {
            console.log(res)
            this.loading.dismiss();
            this.presentToast(res.msg).then(() => {
              this.nativeStorage.getItem('uesrInfo').then((data) => {
                console.log(data);
                let postdata = {
                  id: data.id
                }
                console.log(postdata);
                this.loading.present();
                if (this.loged_in == "5") {
                  this.auth.allsupplierpendingquote(postdata).subscribe((res) => {
                    this.loading.dismiss();
                    console.log(res);
                    this.arr = res.data;

                  }, (err) => {
                    this.loading.dismiss();
                  })
                } else if (this.loged_in == "6") {
                  this.auth.allconstructorpendingquote(postdata).subscribe((res) => {
                    this.loading.dismiss();
                    console.log(res);
                    this.arr = res.data;

                  }, (err) => {
                    this.loading.dismiss();
                  })
                } else if (this.loged_in == "7") {
                  this.auth.allgutterpendingquote(postdata).subscribe((res) => {
                    this.loading.dismiss();
                    console.log(res);
                    this.arr = res.data;

                  }, (err) => {
                    this.loading.dismiss();
                  })
                }
                this.appCtrl.getRootNav().setRoot(Yourquote, { obj: this.arr });
              })


            }, () => {

            })
          }, (err) => {
            this.loading.dismiss();

          })
        }


      }, (err) => {


      })

    }
    else {
      if (this.photo == '') {
        var mdf = 'Please Uploads Material List';

      } else {

        var mdf = 'Please Fill out All Fields';
      }
      this.presentToast(mdf).then(() => {

      }, () => {

      })
    }

  }
  updateCucumber() {
    if (this.is_material_shortage) {
      this.stchange = true;
    } else {
      this.stchange = false;
    }
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
              this.showspinner = true;

              setTimeout(()=>{    //<<<---    using ()=> syntax
              this.showspinner = false;
              this.shod=true;
              },3000);
              
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
  // updateaction() {
  //   this.nativeStorage.getItem('uesrInfo').then((data) => {
  //     console.log(data);
  //
  //   });
  // }
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
