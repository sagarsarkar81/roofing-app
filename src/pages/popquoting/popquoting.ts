import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App} from 'ionic-angular';
import { Addgutter } from '../../pages/addgutter/addgutter';
import { Addconstructer } from '../../pages/addconstructer/addconstructer';
import { MenuController } from 'ionic-angular';
import { Auth } from '../../providers/auth';
/**
 * Generated class for the Popquoting page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-popquoting',
  templateUrl: 'popquoting.html',
})
export class Popquoting {
  passdt: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public auth: Auth, public menuCtrl: MenuController, public appCtrl: App) {
    this.passdt = this.navParams.get('passdata');
    console.log('got here good job');
    console.log(this.passdt);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Popquoting');
  }
  view() {
    this.viewCtrl.dismiss();
    let dt = {
      id: this.passdt.id
    }
    this.appCtrl.getRootNav().push(Addgutter, { passdata: dt })
  }
  view1() {
    this.viewCtrl.dismiss();
    let dt = {
      id: this.passdt.id
    }
    this.appCtrl.getRootNav().push(Addconstructer, { passdata: dt })
  }
}
