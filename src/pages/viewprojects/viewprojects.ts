import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController,App} from 'ionic-angular';
import { AllfilesPage } from '../../pages/allfiles/allfiles';
import { Auth } from '../../providers/auth';
/**
 * Generated class for the Viewprojects page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-viewprojects',
  templateUrl: 'viewprojects.html',
})
export class Viewprojects {
  arr: any;
  loading: any;
  constructor(public navCtrl: NavController,public appCtrl: App, public navParams: NavParams,public auth: Auth,public loadingCtrl: LoadingController,) {
    this.arr = this.navParams.get('val');
     this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
     this.auth.menuectrl().then(() => {


    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Viewprojects');
  }
  popView() {
    this.navCtrl.pop();
  }
  allfile(v){
        console.log(v);
    let obj = {
      id: v
    }
    this.loading.present()
    this.auth.getallprojectfile(obj).subscribe((data) => {
   
      this.loading.dismiss();
      this.appCtrl.getRootNav().push(AllfilesPage, { val: data, project_id: v});
   
    }, (error) => {
      this.loading.dismiss();
    })
    
  }
}
