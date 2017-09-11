import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { FileOpener } from '@ionic-native/file-opener';
import { FilePath } from '@ionic-native/file-path';
import { FileTransfer, FileUploadOptions, FileTransferObject, } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { LoadingController, AlertController } from 'ionic-angular'
import { NativeStorage } from '@ionic-native/native-storage';
declare var window: any;
declare var cordova: any;

/**
 * Generated class for the Qoutemodal page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-qoutemodal',
  templateUrl: 'qoutemodal.html',
})
export class Qoutemodal {
  arr: any;
  id: any;
  dt: any;
  storageDirectory: string = '';
  fileTransfer: FileTransferObject;
  API_URL: any;
  loading: any;
  loged_in: any;
  pb: boolean = false;
  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams,
    private fileOpener: FileOpener, private nativeStorage: NativeStorage,
    private alertCtrl: AlertController,
    private filePath: FilePath,
    public loadingCtrl: LoadingController,
    private transfer: FileTransfer, public platform: Platform, private file: File, public androidPermissions: AndroidPermissions) {
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
    this.arr = this.navParams.get('dt');
    this.id = this.navParams.get('id');
    this.pb = this.navParams.get('pb');
    this.loged_in = this.navParams.get('loged_in');
    for (let g of this.arr) {
      if (g.id == this.id) {
        this.dt = g;
        console.log(this.dt)
      }
    }
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    console.log(this.id);
    this.platform.ready().then(() => {
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

    }, () => {

    })



  }
  dismiss() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }
  ionViewDidLoad() {

    console.log('ionViewDidLoad Qoutemodal');
  }
  download(nm) {
    console.log('ok');
    this.loading.present();
    const url = 'http://50.62.31.191/~roofingtracking/public/uploads/attachment_files/';
    console.log(url);
    window.resolveLocalFileSystemURL(this.storageDirectory, (dir) => {
      console.log(dir);
    })
    const imageLocation = url + nm;
    console.log(imageLocation);

    this.fileTransfer.download(imageLocation, this.storageDirectory + nm).then((entry) => {
      console.log('download complete: ' + entry.toURL());
      this.loading.dismiss();
      this.retrieveImage(nm);
    }, (error) => {
      this.loading.dismiss();
      console.log(error);
    });

  }
  retrieveImage(image) {
    let res = image.substr(image.indexOf(".") + 1);
    let path = this.filePath.resolveNativePath(this.storageDirectory)
    this.file.checkFile(this.storageDirectory, image)
      .then(() => {

        const alertSuccess = this.alertCtrl.create({
          title: `File retrieval Succeeded!`,
          subTitle: `${image} was successfully retrieved from: ${this.storageDirectory}`,
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
            .then(() =>{console.log('File is opened');
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
}
