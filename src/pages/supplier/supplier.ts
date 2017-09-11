import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { Popsupplier } from '../popsupplier/popsupplier';
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
 * Generated class for the Supplier page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-supplier',
  templateUrl: 'supplier.html',
})
export class Supplier {

  createnewproject = CreateProject;
  loading: any;
  //Loginform: FormGroup;
  msg: any;
  arr: Commonpost;
  originalarr: Commonpost;
  sortdata: boolean;
  submitAttempt: boolean = false;
  myInput:any='';
  constructor(public navCtrl: NavController, private _zone: NgZone, public navParams: NavParams, public popoverCtrl: PopoverController, private nativeStorage: NativeStorage,
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

    this.sortdata = false;
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });



  }
  ionViewDidLoad() {
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
      this.auth.getopenassignement().subscribe((data) => {
        if (data.success) {
          this.loading.dismiss();
          this.arr = data.data;
          console.log(this.arr);
          this.originalarr = data.data;
        } else {
          this.loading.dismiss();
          let msg = data.msg;
          this.presentToast(msg).then(() => {

          })
        }

      }, (error) => {

      })
    }
  }
  createproject() {
    (this.navCtrl.setRoot(this.createnewproject));
  }


  presentPopoverProjectListEdit(myEvent, id) {
    let passdata = {
      id: id
    };
    let popover = this.popoverCtrl.create(Popsupplier, { passdata: passdata });
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
      // Get the searched users from github
      let obj = {
        name: term,
      };
      this.auth.getallprojectssearchass(obj).subscribe(res => {
        if(res.success){

           this.arr = res.data;
        //this.myInput='';
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
