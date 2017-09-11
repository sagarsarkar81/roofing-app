import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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


/**
 * Generated class for the AllProjects page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-allearning',
  templateUrl: 'allearning.html',

})
export class Allearning {

  createnewproject = CreateProject;
  loading: any;
  //Loginform: FormGroup;
  msg: any;
  arr: Commonpost;
  originalarr: Commonpost;
  sortdata: boolean;
  submitAttempt: boolean = false;
  log_type: any;
  id: any;
  myInput:any='';
  constructor(public navCtrl: NavController, private _zone: NgZone, public navParams: NavParams, public popoverCtrl: PopoverController, private nativeStorage: NativeStorage,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    public menuCtrl: MenuController,
    public auth: Auth) {
    this.auth.menuectrl().then(() => {


    })
    this.sortdata = false;
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    this.alldata();

  }
  ionViewDidLoad() {
    //this.alldata();
  }
  alldata() {
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
          console.log(obj);
          this.auth.allearningsales(obj).subscribe((data) => {
            if (data.success) {
              this.loading.dismiss();
              this.arr = data.data;
              console.log(this.arr);
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

          this.auth.allearning().subscribe((data) => {
            if (data.success) {
              this.loading.dismiss();
              this.arr = data.data;
              console.log(this.arr);
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
      });

    }

  }
  createproject() {
    (this.navCtrl.setRoot(this.createnewproject));
  }


  presentPopoverProjectListEdit(myEvent) {
    let popover = this.popoverCtrl.create(PopoverProjectListEdit);
    popover.present({
      ev: myEvent
    });
  }

  presentPopoverProjectSort(myEvent) {
    let popover = this.popoverCtrl.create(PopoverProjectSort);
    popover.present({
      ev: myEvent
    });
  }


  presentPopoverProjectListFilter(myEvent) {
    let popover = this.popoverCtrl.create(PopoverProjectListFilter);
    popover.present({
      ev: myEvent
    });
  }

  search(searchEvent) {
    let term = searchEvent.target.value
    console.log(term);
    // We will only perform the search if we have 3 or more characters
    if (term.trim() === '' || term.trim().length < 3) {
      // Load cached users
      this.arr = this.originalarr;
    } else {
      this.nativeStorage.getItem('uesrInfo').then((data) => {
        if (data.type == '4') {

          let obj = {
            name: term,
            id: data.id
          };
          this.auth.allearningearchsales(obj).subscribe(res => {
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

          let obj = {
            name: term,
          };
          this.auth.allearningearch(obj).subscribe(res => {
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

}
