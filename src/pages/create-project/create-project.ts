import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { CreateProjectStep1 } from '../create-project-step-1/create-project-step-1';
import { NativeStorage } from '@ionic-native/native-storage';
import { ToastController } from 'ionic-angular';
import { Auth } from '../../providers/auth';
/**
 * Generated class for the CreateProject page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-create-project',
  templateUrl: 'create-project.html',
})
export class CreateProject {
  selectAll: boolean;
  createnewprojectstep1 = CreateProjectStep1;
  options = [
    { name: 'OptionA', value: '0', checked: false },
    { name: 'OptionB', value: '1', checked: false },
    { name: 'OptionC', value: '2', checked: false },
    { name: 'OptionB', value: '3', checked: false },
    { name: 'OptionB', value: '4', checked: false },
    { name: 'OptionB', value: '5', checked: false },
    { name: 'OptionB', value: '6', checked: false },
    { name: 'OptionB', value: '7', checked: false },
    { name: 'OptionB', value: '8', checked: false },
    { name: 'OptionB', value: '9', checked: false },
  ]
  constructor(public navCtrl: NavController, public auth: Auth, public toastCtrl: ToastController, public navParams: NavParams, public nativeStorage: NativeStorage, public menucontroller: MenuController) {
   this.auth.menuectrl().then(()=>{
     
   })
    this.selectAll = false;
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
  createprojectstep1() {
    console.log(this.options);
    for (let i = 0; i < (this.options.length - 1); i++) {
      if (this.options[i]['checked'] == true) {
        this.selectAll = true;

      } else {
        this.selectAll = false;
        break;
      }
    }
    if (this.selectAll) {
      (this.navCtrl.push(this.createnewprojectstep1));
    } else {
      this.presentToast('Please Select All').then(() => {

      }, () => {

      })

    }

  }
  notify(v, id) {
    console.log(id);
    if (v.checked) {
      this.options[id]['checked'] == true
      console.log(this.options);
    } else {
      this.options[id]['checked'] == false

    }
  }
  checkAll() {
    if (this.selectAll) {
      for (let i = 0; i < this.options.length; i++) {
        this.options[i]['checked'] = true;
      }
      this.selectAll = false;
    } else {
      for (let i = 0; i < this.options.length; i++) {
        this.options[i]['checked'] = false;
      }
      this.selectAll = true;
    }


  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateProject');
  }

}
