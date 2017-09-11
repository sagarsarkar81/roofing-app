import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { UserManagement } from '../../pages/user-management/user-management';
import { MenuController } from 'ionic-angular';
import { LoadingController, AlertController } from 'ionic-angular';
/**
 * Generated class for the PopoverSort page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-popover-sort',
  templateUrl: 'popover-sort.html',
})
export class PopoverSort {
  obj: any;
  loading: any;
  checkvariable:any='2';
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,
     public auth: Auth, public navParams: NavParams, public viewCtrl: ViewController,
     public appCtrl: App,public menuCtrl: MenuController,) {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  }

  close(dt) {
this.checkvariable='1';
    let ob = {
      nm: dt
    }
    this.loading.present();
    this.auth.getsorteduser(ob).subscribe((res) => {
      console.log(res);
      if (res.success) {
        this.loading.dismiss();
        this.obj = res.data;
        this.viewCtrl.dismiss(this.obj);
        // this.navCtrl.pop(UserManagement).then((res) => {
        //
        //
        //   this.appCtrl.getRootNav().push(UserManagement, { obj: this.obj });
        // })
        // }, (err) => {
        //   console.log('error' + err);
        // })

      }

    }, (err) => {
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverSort');

  }
  ionViewDidLeave()
    {
      this.menuCtrl.enable(true);
      if(this.checkvariable!=1)
       {
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
    }}
}
