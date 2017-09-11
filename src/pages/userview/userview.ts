import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Userview page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-userview',
  templateUrl: 'userview.html',
})
export class Userview {
  arr: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.arr = this.navParams.get('val');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Userview');
  }
  popView() {
    this.navCtrl.pop();
  }
}
