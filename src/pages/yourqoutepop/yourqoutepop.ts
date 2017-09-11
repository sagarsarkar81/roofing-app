import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App } from 'ionic-angular';
import { Makequote } from '../../pages/makequote/makequote';
import { AddNewUser } from '../../pages/add-new-user/add-new-user';
import { EditUser } from '../../pages/edit-user/edit-user';
import { UserManagement } from '../../pages/user-management/user-management';
import { MenuController } from 'ionic-angular';
import { Auth } from '../../providers/auth';
/**
 * Generated class for the Yourqoutepop page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-yourqoutepop',
  templateUrl: 'yourqoutepop.html',
})
export class Yourqoutepop {
  arr: any;
  constructor(public navCtrl: NavController, public auth: Auth, public navParams: NavParams, public viewCtrl: ViewController, public menuCtrl: MenuController, public appCtrl: App) {

    this.arr = this.navParams.get('passdata');
    console.log(this.arr.id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Yourqoutepop');
  }
  view() {
    this.viewCtrl.dismiss();
    let val = this.arr;



    this.appCtrl.getRootNav().push(Makequote, { val: val });




  }
}
