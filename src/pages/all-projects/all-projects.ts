import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { PopoverProjectSort } from '../popover-project-sort/popover-project-sort';
import { PopoverProjectListEdit } from '../popover-project-list-edit/popover-project-list-edit';
import { PopoverProjectListFilter } from '../popover-project-list-filter/popover-project-list-filter';
import { CreateProject } from '../create-project/create-project';
import { MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, AlertController } from 'ionic-angular';
import { GlobalValidator } from '../../validator/globalvalidator'
import { ToastController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Auth } from '../../providers/auth';
import { Dashboard } from '../dashboard/dashboard';
import {Commonpost} from '../../models/commonpost';
import { FileOpener } from '@ionic-native/file-opener';
import { FilePath } from '@ionic-native/file-path';
import { FileTransfer, FileUploadOptions, FileTransferObject, } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { AndroidPermissions } from '@ionic-native/android-permissions';
declare var window: any;
declare var cordova: any;
/**
 * Generated class for the AllProjects page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-all-projects',
  templateUrl: 'all-projects.html',

})
export class AllProjects {

  createnewproject = CreateProject;
  loading: any;
  //Loginform: FormGroup;
  msg: any;
  arr: any;
  originalarr: any;
  sortdata: boolean;
  submitAttempt: boolean = false;
  storageDirectory: string = '';
  fileTransfer: FileTransferObject;
  API_URL: any;
  log: any = '';
  myInput:any='';
  st:any='';
  constructor(public navCtrl: NavController, private _zone: NgZone, public navParams: NavParams, private fileOpener: FileOpener, public popoverCtrl: PopoverController, private nativeStorage: NativeStorage,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    public menuCtrl: MenuController,
    public auth: Auth,
    private filePath: FilePath,
    private transfer: FileTransfer, public platform: Platform, private file: File, public androidPermissions: AndroidPermissions) {
    this.nativeStorage.getItem('uesrInfo').then((datax) => {
      if ((datax.type == '5') || (datax.type == '6') || (datax.type == '7')) {
        this.menuCtrl.enable(true, 'authenticated');
        this.menuCtrl.enable(false, 'authenticated1');
        this.menuCtrl.enable(false, 'unauthenticated');

      } else if ((datax.type == '4')) {
        this.menuCtrl.enable(false, 'authenticated');
        this.menuCtrl.enable(true, 'authenticated1');
        this.menuCtrl.enable(false, 'unauthenticated');


      } else {
        this.menuCtrl.enable(false, 'authenticated');
        this.menuCtrl.enable(true, 'unauthenticated');
        this.menuCtrl.enable(false, 'authenticated1');
      }
      this.log = datax.type;
    });
    this.sortdata = false;
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
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
    this.alldata();

  }
  ionViewDidLoad() {
    this.alldata();
  }
  alldata() {
    console.log("9999999999999999999999999999999999999999999")
    let obj = this.navParams.get('obj');

    if (obj.success) {
      this._zone.run(() => {

        console.log('ok');
        this.arr = obj.data;
        console.log(this.arr);
        this.originalarr = obj.data;
      });
    } else {
      console.log('ok ok');
      this.loading.present();
      this.nativeStorage.getItem('uesrInfo').then((data) => {
        if (data.type == '4') {
          let obj = {
            id: data.id
          }
          this.auth.getallprojectsx(obj).subscribe((data) => {
            if (data.success) {
              this.loading.dismiss();
              this.arr = data.data;
              //  console.log(this.arr);
              this.originalarr = data.data;
            } else {
              this.loading.dismiss();
              let msg = data.msg;
              this.presentToast(msg).then(() => {

              }, () => {
                //this.alldata();
              })
            }

          }, (error) => {
            let msg = 'Reconnecting....'
            this.presentToast(msg).then(() => {

            }, () => {
              this.alldata();
            })

          })

        } else {

          this.auth.getallprojects().subscribe((data) => {
            if (data.success) {
              this.loading.dismiss();
              this.arr = data.data;
              //  console.log(this.arr);
              this.originalarr = data.data;
            } else {
              this.loading.dismiss();
              let msg = data.msg;
              this.presentToast(msg).then(() => {

              }, () => {
                //this.alldata();
              })
            }

          }, (error) => {
            let msg = 'Reconnecting....'
            this.presentToast(msg).then(() => {

            }, () => {
              this.alldata();
            })

          })
        }

      })
    }

  }
  createproject() {
    (this.navCtrl.setRoot(this.createnewproject));
  }


  presentPopoverProjectListEdit(myEvent, id) {
    let passdata = {

      id: id
    }
    let popover = this.popoverCtrl.create(PopoverProjectListEdit, { passdata: passdata });
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss((popoverData) => {


      this.arr = popoverData;
      if (this.arr == null) {

        this.arr = this.originalarr;
      }else  if (this.arr == ''){
   this.arr = this.originalarr;
      }

      console.log(this.arr);
    })
  }

  presentPopoverProjectSort(myEvent) {
    let popover = this.popoverCtrl.create(PopoverProjectSort, { check: '1' });
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss((popoverData) => {

      this.arr = '';
      this.arr = popoverData;
      if (this.arr == '') {

        this.arr = this.originalarr;
      }else  if (this.arr == ''){
   this.arr = this.originalarr;
      }

      console.log(this.arr);
    })
  }


  presentPopoverProjectListFilter(myEvent) {
    let popover = this.popoverCtrl.create(PopoverProjectListFilter);
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss((popoverData) => {

    console.log('get data from');
    console.log(popoverData.st);
    if(popoverData!=null || popoverData != '' || popoverData !=undefined){
      this.arr='';
      this.originalarr='';
       this.arr = popoverData.obj;
      this.originalarr=popoverData.obj;
      this.st=popoverData.st;

    }else{
       this.arr = this.originalarr;
       this.presentToast('Not Found').then(()=>{

        })
    }
     

      if (this.arr == null) {

        this.arr = this.originalarr;
        this.presentToast('Not Found').then(()=>{

        })
      }else  if (this.arr == ''){
   this.arr = this.originalarr;
    this.presentToast('Not Found').then(()=>{

        })
      }else  if (this.arr == undefined){
   this.arr = this.originalarr;
    this.presentToast('Not Found').then(()=>{

        })
      }


      console.log(this.arr);
    })
  }

  search(searchEvent) {
    let term = searchEvent.target.value
    console.log(term);
    // We will only perform the search if we have 3 or more characters
    if (term.trim() === '' || term.trim().length < 3) {
      // Load cached users
      this.arr = this.originalarr;
    } else {
      // Get the searched users from github
      this.nativeStorage.getItem('uesrInfo').then((data) => {
        if (data.type == '4') {

          let obj = {
            id: data.id,
            name: term,
          };
          this.auth.getallprojectssearchx(obj).subscribe(res => {
             if(res.success){

           this.arr = res.data;
      //  this.myInput='';
        console.log(this.arr);
        }else{
          this.presentToast(res.msg).then(()=>{

        this.arr = this.originalarr;
      //  this.myInput='';
        console.log(this.arr);

          })
       

        }
       
          });
        } else {
          if(this.st==''){
          let obj = {
          name: term,
          };
          this.auth.getallprojectssearch(obj).subscribe(res => {
             if(res.success){

           this.arr = res.data;
      //  this.myInput='';
        console.log(this.arr);
        }else{
          this.presentToast(res.msg).then(()=>{

        this.arr = this.originalarr;
       // this.myInput='';
        console.log(this.arr);

          })
       

        }
       
          });

}else{
          let obj = {
          name: term,
          status:this.st
          };
        console.log(obj);
          this.auth.getallprojectssearchst(obj).subscribe(res => {
             if(res.success){

           this.arr = res.data;
      //  this.myInput='';
        console.log(this.arr);
        }else{
          this.presentToast(res.msg).then(()=>{

        this.arr = this.originalarr;
       // this.myInput='';
        console.log(this.arr);

          })
       

        }
       
          });




}
         



        }
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
  menuopen() {
    this.menuCtrl.enable(true);
    this.menuCtrl.toggle();

  }
  getback() {
    this.navCtrl.pop();
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
      //  console.log('download complete: ' + entry.toURL());
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
