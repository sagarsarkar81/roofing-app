import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CreateProjectStep4 } from '../create-project-step-4/create-project-step-4';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { NativeStorage } from '@ionic-native/native-storage';
import { Auth } from '../../providers/auth';
import { LoadingController, AlertController } from 'ionic-angular';
import { GlobalValidator } from '../../validator/globalvalidator'
import { ToastController } from 'ionic-angular';
import { Base64 } from '@ionic-native/base64';
/**
 * Generated class for the CreateProjectStep3 page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-create-project-step-3',
  templateUrl: 'create-project-step-3.html',
})
export class CreateProjectStep3 {
  checkcopy: any;
  cardauth: any;
  rcdraw: any;
  ors: any;
  show1: boolean;
  show2: boolean = true;
  show3: boolean = true;
  show4: boolean;
  bsedata: any;
  project_id: any;
  postobj: any;
  createnewprojectstep4 = CreateProjectStep4;
  usernm: any;
  loading: any;
  msg: any;
  mimetype: any;
  check: any = 1;
  showbox: boolean = false;
  showspinner: boolean = false;
  typelist = [];
validating=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: Auth, private filePath: FilePath,
    private fileChooser: FileChooser, public base64: Base64,
    private file: File, private nativeStorage: NativeStorage, public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController) {
    this.show1 = false;
    this.show2 = true;
    this.show3 = true;
    this.show4 = false;
    this.project_id = this.navParams.get('p_id');
    this.showbox = this.navParams.get('showbox');
    this.nativeStorage.getItem('uesrInfo').then((data) => {

      this.usernm = data.name;


    });
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    //  this.presentAlert();
  }
  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Allowed File Extension .pdf,.doc,.jpg,.png',
      buttons: ['Dismiss']
    });
    alert.present();
  }
  presentAlert1(msg) {
    let alert = this.alertCtrl.create({
      title: msg,
      buttons: ['Dismiss']
    });
    alert.present();
  }
  notify(v) {
  console.log(v);
    if (v=='Check-Copy') {
      this.show1 = true;
      this.show2 = false;
    }
  }
  notify1(v) {
  console.log(v);
    if (v=='Credit-Card-Authorization-Form') {
      this.show1 = false;
      this.show2 = true;
    }
  }
  createprojectstep4() {
    console.log(this.validating.length);

    let obj = {
      id: this.project_id
    }
    this.auth.getallprojectfile(obj).subscribe((data) => {
      console.log(data);
      if (data.success) {
        let filelength = data.data.length;
        console.log(filelength);
        if (this.check == 1) {
          if (this.validating.length == 7) {
            console.log("hhhhhhhhhh")
            this.navCtrl.push(this.createnewprojectstep4, { project_id: this.project_id });
          }
          else {
            let str = '';
            console.log("uuuuuuu");
            for (let i of data.data) {
              str += i.attachment_title + ',';
            }

            let msg = 'You already Uploaded ' + str + ' but Some file are Missing'
            this.presentAlert1(msg);
          }
        }
        else {
          if (this.validating.length == 6) {
            console.log("hhhhhhhhhh")
            this.navCtrl.push(this.createnewprojectstep4, { project_id: this.project_id });
          }
          else {
            console.log("iiiiiiiii")
            let str = '';
            console.log("ooooooooooooo");
            for (let i of data.data) {
              str += i.attachment_title + ',';
            }

            let msg = 'You already Uploaded ' + str + ' but Some file are Missing'
            this.presentAlert1(msg);
          }
        }



      }

    }, (error) => {
    })


  }
  oh() {
    this.navCtrl.pop().then(() => {

    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateProjectStep3');
  }
  func1() {
    console.log('func1');
    if (this.show1) {
      this.show1 = false;
      this.show2 = true;
    } else {
      this.show1 = true;
      this.show2 = false;
    }

  }
  func2() {
    console.log('func2');
    if (this.show2) {
      this.show2 = false;
      this.show1 = true;
    } else {
      this.show2 = true;
      this.show1 = false;
    }

  }
  func3(v) {
    this.check = 1;
    if(v=='Roof-Scope-Drawing-by-Sales-Person'){
    this.show3=true;
    }

  }
  func4(v) {
    this.check = 2;
   if(v=='Order-Roof-Scope'){
    this.show3=false;
   }

  }
  chooseFile(data) {
    console.log("data1=" + data);
    var type = data;
    this.fileChooser.open()
      .then((uri) => {
        console.log(uri);

        //  let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
        //var currentName = uri.substr(uri.lastIndexOf('/') + 1);
        //  console.log(correctPath);
        //  console.log(currentName);
        //this.readAsDataURL(correctPath, currentName).then((res) => {
        this.base64.encodeFile(uri).then((base64File: string) => {
          console.log(base64File);
          this.bsedata = base64File.slice(base64File.indexOf('base64,') + 7);
          //  console.log(this.bsedata);
          let val = '';
          console.log("data2=" + data);
          if (data == "1") {
            this.validating.push(data);
            val = 'supporting_payment_file';
            this.postobj = {

              supporting_payment_file: this.bsedata,
              project_id: this.project_id,
              username: this.usernm
            }
          } else if (data == "2") {
           
             this.validating.push(data);
            val = 'supporting_payment_file';
            this.postobj = {

              supporting_payment_file: this.bsedata,
              project_id: this.project_id,
              username: this.usernm
            }

          } else if (data == "3") {
 this.validating.push(data);
            val = 'insurance_summary';
            this.postobj = {

              insurance_summary: this.bsedata,
              project_id: this.project_id,
              username: this.usernm
            }
          } else if (data == "4") {
 this.validating.push(data);
            val = 'tic_sheet';
            this.postobj = {

              tic_sheet: this.bsedata,
              project_id: this.project_id,
              username: this.usernm
            }
          } else if (data == "5") {
             this.validating.push(data);
            val = 'roof_scope_drawing_by_sales_person';
            this.postobj = {

              roof_scope_drawing_by_sales_person: this.bsedata,
              project_id: this.project_id,
              username: this.usernm
            }
          } else if (data == "6") {
            val = 'gutter_drawing';
            this.postobj = {

              gutter_drawing: this.bsedata,
              project_id: this.project_id,
              username: this.usernm
            }
          } else if (data == "7") {
            val = 'Other_drawing';
            this.postobj = {

              Other_drawing: this.bsedata,
              project_id: this.project_id,
              username: this.usernm
            }
          } else if (data == "8") {
             this.validating.push(data);
            val = 'work_order';
            this.postobj = {

              work_order: this.bsedata,
              project_id: this.project_id,
              username: this.usernm
            }
          } else if (data == "9") {
            val = 'city_permit';
            this.postobj = {

              city_permit: this.bsedata,
              project_id: this.project_id,
              username: this.usernm
            }
          } else if (data == "10") {
             this.validating.push(data);  
            val = 'contingency_agreement';
            this.postobj = {

              contingency_agreement: this.bsedata,
              project_id: this.project_id,
              username: this.usernm
            }
          } else if (data == "11") {
             this.validating.push(data);
            val = 'scope_of_work';
            this.postobj = {

              scope_of_work: this.bsedata,
              project_id: this.project_id,
              username: this.usernm
            }
          }
          //  this.loading.present();
          console.log(this.postobj);
          this.nativeStorage.getItem('uesrInfo').then((data) => {
            this.showspinner = true;
            console.log(this.postobj);
            this.auth.addattachment(this.postobj).subscribe((res) => {
              //    this.loading.dismiss();
              if (res.success) {
                this.showspinner = false;
                console.log('gotchha');
                console.log(res);
                this.msg = res.msg;
                this.presentToast(this.msg).then(() => {

                  if (type) {
                    this.typelist[type] = type;

                  }

                }, () => {

                })
              } else {
                this.showspinner = false;
                console.log('gotchhaerr');
                console.log(res);
                this.msg = res.msg;
                this.presentToast(this.msg).then(() => {


                }, () => {

                })

              }


            }, (error) => {
              this.showspinner = false;

            })

          });


        }, (error) => {
          let mdg = 'Please provide pdf or doc';
          this.presentToast(mdg).then((res) => {

          }, () => {

          })
        });

        // this.message=res;
        // this.chatService.sendMessagewithatt(this.message);



      },
      (err) => {
        //console.log('Error while selecting File.' + err);
      });


  }
  readAsDataURL(path, file): Promise<any> {
    return new Promise((resolve, reject) => {
      this.file.readAsDataURL(path, file).then(success => {
        //console.log("success" + success);
        //  console.log();
        this.mimetype = this.base64MimeType(success);
        if (this.mimetype == 'application/msword' || this.mimetype == 'application/pdf') {
          let attachementData = success.slice(success.indexOf('base64,') + 7);
          resolve(attachementData);

        } else {
          reject('1');
        }


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
  base64MimeType(encoded) {
    var result = null;

    if (typeof encoded !== 'string') {
      return result;
    }

    var mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);

    if (mime && mime.length) {
      result = mime[1];
    }

    return result;
  }

}
