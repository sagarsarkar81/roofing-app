import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App } from 'ionic-angular';
import { Editprojects } from '../../pages/editprojects/editprojects';
import { Viewprojects } from '../../pages/viewprojects/viewprojects';
import { MenuController } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { AllProjects } from '../../pages/all-projects/all-projects';
import { Addsupplier } from '../../pages/addsupplier/addsupplier';

/**
 * Generated class for the Popsupplier page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-popsupplier',
  templateUrl: 'popsupplier.html',
})
export class Popsupplier {

  passdt: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public auth: Auth, public menuCtrl: MenuController, public appCtrl: App) {
    this.passdt = this.navParams.get('passdata');
    console.log(this.passdt);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Popsupplier');
  }
  view() {

    this.viewCtrl.dismiss();
    let dt = {
      id: this.passdt.id
    }
    this.appCtrl.getRootNav().push(Addsupplier, { passdata: dt })
  }
}
