import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App, LoadingController } from 'ionic-angular';
import { Editprojects } from '../../pages/editprojects/editprojects';
import { Viewprojects } from '../../pages/viewprojects/viewprojects';
import { MenuController } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { AllProjects } from '../../pages/all-projects/all-projects';
import { AllfilesPage } from '../../pages/allfiles/allfiles';
import { AlertController } from 'ionic-angular';
import { CreateProjectStep3 } from '../create-project-step-3/create-project-step-3';
import { NativeStorage } from '@ionic-native/native-storage';
/**
 * Generated class for the PopoverProjectListEdit page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-popover-project-list-edit',
  templateUrl: 'popover-project-list-edit.html',
})
export class PopoverProjectListEdit {
  passdt: any;
  loading: any;
  checkvariable: any = '2';
  logtype:any='';
  constructor(public navCtrl: NavController, private nativeStorage: NativeStorage, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public navParams: NavParams, public viewCtrl: ViewController, public auth: Auth, public menuCtrl: MenuController, public appCtrl: App) {
    this.passdt = this.navParams.get('passdata');
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

     this.nativeStorage.getItem('uesrInfo').then((data) => {
      console.log(data.type);
      if (data.type == '4') {
        this.logtype=data.type;
      }
      });
  }

  close() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverProjectListEdit');
    
  }
  view() {
    this.checkvariable = '1';

    this.getall();


    let val = this.passdt;
    let obj = {
      id: val.id
    }
    console.log('ok');
    this.auth.getindividualproject(obj).subscribe((data) => {
      console.log(data);

      this.appCtrl.getRootNav().push(Viewprojects, { val: data });

    }, (error) => {

    })
  }
  Editfile() {
    this.checkvariable = '1';
    this.getall();
    let val = this.passdt;
    console.log(val);
    let obj = {
      id: val.id
    }
    console.log('ok');
    this.auth.getindividualproject(obj).subscribe((data) => {
      console.log(data);
      this.loading.dismiss();
      this.appCtrl.getRootNav().push(CreateProjectStep3, { p_id: val.id, showbox: true });

    }, (error) => {

    })

  }
  allfile() {
    this.checkvariable = '1';
    this.getall();
    console.log('all');
    let val = this.passdt;
    let obj = {
      id: val.id
    }
    console.log('ok');
    this.auth.getallprojectfile(obj).subscribe((data) => {
      console.log(data);
      this.appCtrl.getRootNav().push(AllfilesPage, { val: data, project_id: val.id });

    }, (error) => {

    })
  }
  edit() {
    this.checkvariable = '1';
    this.getall();
    let val = this.passdt;
    console.log(val);
    let obj = {
      id: val.id
    }
    console.log('ok');
    this.auth.getindividualproject(obj).subscribe((data) => {
      console.log(data);
      this.loading.dismiss();
      this.appCtrl.getRootNav().push(Editprojects, { val: val, alldata: data.data });

    }, (error) => {

    })


  }
  presentConfirm() {
    this.checkvariable = '1';
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
            this.del();
          }
        }
      ]
    });
    alert.present();
  }
  del() {
    this.checkvariable = '1';
    let val = this.passdt;
    let obj = {
      id: val.id
    }
    console.log('ok');
    this.loading.present().then(() => {
      this.auth.userprojectdel(obj).subscribe((data) => {
        console.log(data);
        this.getall();

      }, (error) => {
        this.loading.dismiss();
      })
    }, () => {

    })

  }
  ionViewDidLeave() {
    if (this.checkvariable != '1') {

      this.getall();
    }

  }

  getall() {
    this.loading.present();
    this.nativeStorage.getItem('uesrInfo').then((data) => {
      console.log(data.type);
      if (data.type == '4') {
        let obj = {
          id: data.id
        }
        console.log(obj);
        this.auth.getallprojectsx(obj).subscribe((res) => {
          if (res.success) {
            this.loading.dismiss();
            var pobj = res.data;
            console.log(pobj);
            this.viewCtrl.dismiss(pobj);
          } else {
            this.loading.dismiss();
            this.viewCtrl.dismiss('');
          }

          //  this.appCtrl.getRootNav().push(AllProjects, { obj: res });
        }, () => {
          this.loading.dismiss();
          this.viewCtrl.dismiss('');
        })
      } else {

        this.auth.getallprojects().subscribe((res) => {
          if (res.success) {
            this.loading.dismiss();
            var pobj = res.data;
            console.log(pobj);
            this.viewCtrl.dismiss(pobj);
          } else {
            this.loading.dismiss();
            this.viewCtrl.dismiss('');
          }

          //  this.appCtrl.getRootNav().push(AllProjects, { obj: res });
        }, () => {
          this.loading.dismiss();
          this.viewCtrl.dismiss('');
        })
      }

    }, () => {


    });
  }

}
