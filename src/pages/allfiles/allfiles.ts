import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { FileOpener } from '@ionic-native/file-opener';
import { FilePath } from '@ionic-native/file-path';
import { FileTransfer, FileUploadOptions, FileTransferObject, } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { NativeStorage } from '@ionic-native/native-storage';
import { LoadingController, AlertController, ToastController } from 'ionic-angular';
import { Base64 } from '@ionic-native/base64';
import { FileChooser } from '@ionic-native/file-chooser';
import { Auth } from '../../providers/auth';
declare var window: any;
declare var cordova: any;


/**
 * Generated class for the AllfilesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-allfiles',
  templateUrl: 'allfiles.html',
})
export class AllfilesPage {
  getdata: any;
  arr: any;
  postobj: any;
  storageDirectory: string = '';
  fileTransfer: FileTransferObject;
  API_URL: any;
  roofscope: any = 'No Rootscope file Please Uploads One';
  bsedata: any;
  roodscope: boolean = false;
  project_id: any;
  usernm: any = 'xxx';
  msg: any;
  loading: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private fileOpener: FileOpener, private nativeStorage: NativeStorage,
    private alertCtrl: AlertController,
    private filePath: FilePath, public loadingCtrl: LoadingController, public toastCtrl: ToastController,
    private base64: Base64, private fileChooser: FileChooser,
    private transfer: FileTransfer, public platform: Platform, public auth: Auth, private file: File, public androidPermissions: AndroidPermissions) {
    this.getdata = this.navParams.get('val');
    this.project_id = this.navParams.get('project_id');
    this.arr = this.getdata.data;
    for (let i of this.arr) {

      if (i.attachment_slug == 'Roof-Scope-Drawing-by-Sales-Person') {
        this.roofscope = i.file;
        this.roodscope = true;
      } else {
        this.roodscope = false;
      }

    }
    console.log(this.roodscope);
    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
      success => console.log('Permission granted'),
      err => this.androidPermissions.requestPermissions(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
    );
    if (this.platform.is('ios')) {
      this.storageDirectory = cordova.file.documentsDirectory;
    }
    else if (this.platform.is('android')) {
      this.storageDirectory = cordova.file.documentsDirectory;
      console.log(this.storageDirectory);
    }

    this.fileTransfer = this.transfer.create();

    this.filePath.resolveNativePath(this.file.dataDirectory)
      .then(
      (filePath) => {
        let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
        console.log("Correct_Path" + correctPath);
        this.storageDirectory = this.file.externalApplicationStorageDirectory;

      },
      (err) => {
        console.log("Error" + err);
      });
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad AllfilesPage');
  }
  download(nm) {
    console.log('ok');

    const url = 'http://50.62.31.191/~roofingtracking/public/uploads/attachment_files/';
    console.log(url);
    window.resolveLocalFileSystemURL(this.storageDirectory, (dir) => {
      console.log(dir);
    })
    const imageLocation = url + nm;
    console.log(imageLocation);
    this.loading.present();
    this.fileTransfer.download(imageLocation, this.storageDirectory + nm).then((entry) => {
      console.log('download complete: ' + entry.toURL());
      this.loading.dismiss();
      this.retrieveImage(nm);
    }, (error) => {
      console.log(error);
      this.loading.dismiss();
    });

  }
  retrieveImage(image) {
    let res = image.substr(image.indexOf(".") + 1);
    let path = this.filePath.resolveNativePath(this.storageDirectory)
    this.file.checkFile(this.storageDirectory, image)
      .then(() => {

        const alertSuccess = this.alertCtrl.create({
          title: `File retrieval Succeeded!`,
          //subTitle: `${image} was successfully retrieved from: ${this.storageDirectory}`,
          buttons: ['Ok']
        });

        return alertSuccess.present().then(() => {

          if (res == 'pdf') {
            var cont = 'application/pdf';
          } else if (res == 'png' || res == 'jpg' || res == 'jpeg' || res == 'gif') {
            var cont = 'image/res';
          } else if (res == 'doc') {
            var cont = 'application/msword';
          } else if (res = 'mp4') {
            var cont = 'video/mp4';
          } else if (res = 'mp3') {
            var cont = 'audio/mp3';
          }

          this.fileOpener.open(this.storageDirectory + image, cont)
            .then(() =>{
          console.log('File is opened');
          alertSuccess.dismiss();
          
          } )
            .catch(e => console.log('Error openening file', e));

        });

      })
      .catch((err) => {

        // const alertFailure = this.alertCtrl.create({
        //   title: `File retrieval Failed!`,
        //   subTitle: `${image} was not successfully retrieved. Error Code: ${err.code}`,
        //   buttons: ['Ok']
        // });
        //
        // return alertFailure.present();
        this.download(image);

      });
  }
  Checkrootscope() {
    if (this.roodscope) {
      this.retrieveImage(this.roofscope);
    }
    else {
      this.chooseFile('5');
    }
  }
  chooseFile(data) {
    console.log("data1=" + data);
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
          console.log(this.bsedata);
          let val = '';
          console.log("data2=" + data);
          if (data == "1") {
            val = 'supporting_payment_file';
            this.postobj = {

              supporting_payment_file: this.bsedata,
              project_id: this.project_id,
              username: this.usernm
            }
          } else if (data == "2") {
            val = 'supporting_payment_file';
            this.postobj = {

              supporting_payment_file: this.bsedata,
              project_id: this.project_id,
              username: this.usernm
            }

          } else if (data == "3") {

            val = 'insurance_summary';
            this.postobj = {

              insurance_summary: this.bsedata,
              project_id: this.project_id,
              username: this.usernm
            }
          } else if (data == "4") {

            val = 'tic_sheet';
            this.postobj = {

              tic_sheet: this.bsedata,
              project_id: this.project_id,
              username: this.usernm
            }
          } else if (data == "5") {
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
            val = 'contingency_agreement';
            this.postobj = {

              contingency_agreement: this.bsedata,
              project_id: this.project_id,
              username: this.usernm
            }
          } else if (data == "11") {
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

            console.log(this.postobj);
            this.loading.present();
            this.auth.addattachment(this.postobj).subscribe((res) => {
              this.loading.dismiss();
              console.log('gotchha');
              console.log(res);
              this.msg = res.msg;
              this.presentToast(this.msg).then(() => {


              }, () => {

              })
            }, (error) => {
              this.loading.dismiss();

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
