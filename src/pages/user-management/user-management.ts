import { Component, NgZone, OnInit, OnDestroy, trigger, state, style, transition, animate, ViewChild, ElementRef, AfterViewChecked, ChangeDetectorRef} from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { Popover } from '../popover/popover';
import { PopoverSort } from '../popover-sort/popover-sort';
import { AddNewUser } from '../add-new-user/add-new-user';
import { Auth } from '../../providers/auth';
import { LoadingController, AlertController } from 'ionic-angular';
import {Commonpost} from '../../models/commonpost';
import { Network } from '@ionic-native/network';
import { NativeStorage } from '@ionic-native/native-storage';
/**
 * Generated class for the UserManagement page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-user-management',
  templateUrl: 'user-management.html',
  animations: [
    trigger(
      'myAnimation',
      [
        transition(
          ':enter', [
            style({ transform: 'translateY(100%)', opacity: 0 }),
            animate('500ms ease-in', style({ transform: 'translateY(0)', 'opacity': 1 }))
          ]
        ),
        transition(
          ':leave', [
            style({ transform: 'translateY(0)', 'opacity': 1 }),
            animate('500ms ease-out', style({ transform: 'translateY(100%)', 'opacity': 0 })),

          ]
        )]),

    trigger(
      'zoomAnimation',
      [
        transition(
          ':enter', [
            style({ transform: 'translateY(-100%)', opacity: 0, width: '20%' }),
            animate('500ms ease-in', style({ transform: 'translateY(0)', 'opacity': 1, width: '100%' }))
          ]
        ),
        transition(
          ':leave', [
            style({ transform: 'translateY(0)', opacity: 0, width: '100%' }),
            animate('500ms ease-out', style({ transform: 'translateY(-100%)', 'opacity': 1, width: '20%' }))

          ]
        )
      ]),

    trigger(
      'dropAnimation',
      [
        transition(
          ':enter', [
            style({ transform: 'translateY(-100%)', opacity: 0 }),
            animate('500ms ease-in', style({ transform: 'translateY(0)', 'opacity': 1 }))
          ]
        )
      ]),

    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'translateX(100%)' }))
      ])
    ])



  ],
})
export class UserManagement {

  addnewuser = AddNewUser;
  loading: any;
  msg: any;
  alluser: Commonpost;
  orginaluser: Commonpost;
  myInput:any='';
  constructor(public navCtrl: NavController, public nativeStorage: NativeStorage, public auth: Auth, public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public popoverCtrl: PopoverController, public menuCtrl: MenuController, private network: Network, private _zone: NgZone) {
    this.nativeStorage.getItem('uesrInfo').then((datax) => {
      if ((datax.type == '5') || (datax.type == '6') || (datax.type == '7')) {
        this.menuCtrl.enable(true, 'authenticated');
        this.menuCtrl.enable(false, 'unauthenticated');
      } else {
        this.menuCtrl.enable(false, 'authenticated');
        this.menuCtrl.enable(true, 'unauthenticated');
      }

    });
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.alldata();

  }

  ionViewDidLoad() {
    //  this.alldata();
  }
  alldata() {
    let obj = this.navParams.get('obj');
    if (obj.success) {
      this._zone.run(() => {

        console.log('ok');
        this.alluser = obj.data;
        console.log(this.alluser);
        this.orginaluser = obj.data;
      });
    } else {
      this.loading.present();
      this.auth.alluser().subscribe((res) => {
        this.loading.dismiss();
        if (res.msg) {
          this.alluser = res.data;
          this.orginaluser = res.data;
        } else {
          let msg = res.msg;
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
  presentPopover(myEvent, id, first, last, username, email) {
    let passdata = {
      from_page: 'userman',
      id: id,
      first: first,
      last: last,
      username: username,
      email: email,
    }
    console.log(passdata);
    let popover = this.popoverCtrl.create(Popover, { passdata: passdata });
    popover.present({
      ev: myEvent
    });

  }

  presentPopoverSort(myEvent) {
    let popover = this.popoverCtrl.create(PopoverSort);
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss((popoverData) => {
      this.alluser = popoverData;
      if (this.alluser == null) {
        this.alluser = this.orginaluser;

      }
      console.log('ok')
    })
  }

  adduser() {
    (this.navCtrl.push(this.addnewuser));
  }

  search(searchEvent) {
    let term = searchEvent.target.value
    console.log(term);
    // We will only perform the search if we have 3 or more characters
    if (term.trim() === '' || term.trim().length < 3 || term == undefined) {
      // Load cached users
      console.log('this.alluser');
      this.alluser = this.orginaluser;
    } else {
      // Get the searched users from github
      let obj = {
        name: term,
      };
      this.auth.allusersearch(obj).subscribe(res => {
       if(res.success){

           this.alluser = res.data;
      //  this.myInput='';
        console.log(this.alluser);
        }else{
          this.presentToast(res.msg).then(()=>{

        this.alluser = this.orginaluser;
      //  this.myInput='';
        console.log(this.alluser);

          })
       

        }
      });
    }
  }
  onCancel(e) {
    console.log("iiiiiiiiiiiiiiii")
    this.alluser = this.orginaluser;
  }
  doRefresh(refresher) {
    this.auth.alluser().subscribe((res) => {
      this.alluser = res.data;
      this.orginaluser = res.data;
      if (refresher != 0)
        refresher.complete();
    }, (error) => {

    });
  }

}
