import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App } from 'ionic-angular';
import { AddNewUser } from '../../pages/add-new-user/add-new-user';
import { EditUser } from '../../pages/edit-user/edit-user';
import { UserManagement } from '../../pages/user-management/user-management';
import { Userview } from '../../pages/userview/userview';
import { MenuController } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { LoadingController, AlertController } from 'ionic-angular';
/**
 * Generated class for the Popover page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})



export class Popover {
  passdt: any;
  loading: any;
  checkvariable:any='2';
  constructor(public navCtrl: NavController, public auth: Auth, public navParams: NavParams,
     public viewCtrl: ViewController, public menuCtrl: MenuController,
      public appCtrl: App,public loadingCtrl: LoadingController,public alertCtrl:AlertController,) {
    //console.log();
    this.passdt = this.navParams.get('passdata');
    console.log(this.passdt);
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  }

  close() {
    this.checkvariable='1';
    this.viewCtrl.dismiss();
    let val = this.passdt;
    if (val.from_page == 'userman') {


      this.appCtrl.getRootNav().push(EditUser, { val: val });



    }
  }
  userview() {
    this.checkvariable='1';
    this.viewCtrl.dismiss();
    let val = this.passdt;
    let obj = {
      id: val.id
    }
    console.log('ok');
    this.auth.getindividualuserdetails(obj).subscribe((data) => {
      console.log(data);
      this.appCtrl.getRootNav().push(Userview, { val: data });

    }, (error) => {

    })
  }
  presentConfirm() {
      this.checkvariable='1';
  let alert = this.alertCtrl.create({
    title: 'Alert',
    message: 'Are you Sure you Want To Do This?',
    buttons: [
      {
        text: 'No',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Yes',
        handler: () => {
        this.deluser();
        }
      }
    ]
  });
  alert.present();
}
  deluser() {
    this.checkvariable='1';
    this.viewCtrl.dismiss();
    let val = this.passdt;
    let obj = {
      id: val.id
    }
    console.log('ok');
    this.auth.userdel(obj).subscribe((data) => {
      console.log(data);
      this.auth.alluser().subscribe((res) => {
        this.appCtrl.getRootNav().setRoot(UserManagement, { obj: res });
      }, () => {

      })

    }, (error) => {

    })

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Popover');
  }
  ionViewDidLeave()
    {
      this.menuCtrl.enable(true);
      if(this.checkvariable!='1'){


      console.log("yyyyyyyyyyyyyyyyyyy")
      this.loading.present();
      this.auth.alluser().subscribe((res) => {
        console.log(res);
          console.log('res')
        if (res.success) {
          this.loading.dismiss();
          var pobj = res.data;
          console.log(pobj);
          this.viewCtrl.dismiss(pobj);
        } else {
          this.loading.dismiss();
          this.viewCtrl.dismiss('');
        }

         this.appCtrl.getRootNav().setRoot(UserManagement, { obj: res });
      }, () => {
        this.loading.dismiss();
        this.viewCtrl.dismiss('');
      })
        }
    }
}
