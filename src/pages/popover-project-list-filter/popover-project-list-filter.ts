import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { AllProjects } from '../all-projects/all-projects';
import { MenuController } from 'ionic-angular';
import { LoadingController, AlertController } from 'ionic-angular';
/**
 * Generated class for the PopoverProjectListFilter page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-popover-project-list-filter',
  templateUrl: 'popover-project-list-filter.html',
})
export class PopoverProjectListFilter {
  obj: any = '';
  loading: any;
    checkvariable:any='2';
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public menuCtrl: MenuController, public navParams: NavParams, public viewCtrl: ViewController
    , public auth: Auth, public appCtrl: App) {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  }

  close() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverProjectListFilter');
  }
  getopen() {
  this.checkvariable='1';
    this.loading.present();
    this.auth.getopen().subscribe((res) => {


      if (res.success) {
        this.obj = res.data;
        //  this.navCtrl.pop(AllProjects).then((res) => {
        this.loading.dismiss();
        this.viewCtrl.dismiss({obj:this.obj,st:'open'});

        //  })

      } else {
        this.loading.dismiss();
        this.viewCtrl.dismiss(this.obj);
      }

    }, (err) => {
      this.obj='';
      this.loading.dismiss();
      this.viewCtrl.dismiss(this.obj);
    })
  }
  getprogress() {
    //  this.viewCtrl.dismiss();
      this.checkvariable='1';
    this.loading.present();
    this.auth.getworkingprogress().subscribe((res) => {

      if (res.success) {
        this.obj = res.data;
        //  this.navCtrl.pop(AllProjects).then((res) => {
        this.loading.dismiss();
        this.viewCtrl.dismiss({obj:this.obj,st:'workinprogress'});

        //  })

      } else {
        this.loading.dismiss();
        this.viewCtrl.dismiss(this.obj);
      }

    }, (err) => {
       this.obj='';
      this.loading.dismiss();
      this.viewCtrl.dismiss(this.obj);
    })
  }
  getonhold() {
    //  this.viewCtrl.dismiss();
      this.checkvariable='1';
    this.loading.present();
    this.auth.getonhold().subscribe((res) => {

      if (res.success) {
        this.obj = res.data;
        //  this.navCtrl.pop(AllProjects).then((res) => {
        this.loading.dismiss();
        this.viewCtrl.dismiss({obj:this.obj,st:'onhold'});

        //  })

      } else {
        this.loading.dismiss();
        this.viewCtrl.dismiss(this.obj);
      }


    }, (err) => {
       this.obj='';
      this.loading.dismiss();
      this.viewCtrl.dismiss(this.obj);
    })
  }
  getcomplete() {
    //  this.viewCtrl.dismiss();
      this.checkvariable='1';
    this.loading.present();
    this.auth.getcomplite().subscribe((res) => {

      if (res.success) {
        this.obj = res.data;
        //  this.navCtrl.pop(AllProjects).then((res) => {
        this.loading.dismiss();
        this.viewCtrl.dismiss({obj:this.obj,st:'onhold'});

        //  })

      } else {
        this.loading.dismiss();
        this.viewCtrl.dismiss(this.obj);
      }


    }, (err) => {
       this.obj='';
      this.loading.dismiss();
      this.viewCtrl.dismiss(this.obj);
    })
  }
  getall() {
    //  this.viewCtrl.dismiss();
      this.checkvariable='1';
    this.loading.present();
    this.auth.getallprojects().subscribe((res) => {

      if (res.success) {
        this.obj = res.data;
        //  this.navCtrl.pop(AllProjects).then((res) => {
        this.loading.dismiss();
        this.viewCtrl.dismiss({obj:this.obj,st:''});
        //  })

      } else {
        this.loading.dismiss();
        this.viewCtrl.dismiss(this.obj);

      }


    }, (err) => {
       this.obj='';
      this.loading.dismiss();
      this.viewCtrl.dismiss(this.obj);
    })
  }
  ionViewWillLeave() {
    this.menuCtrl.enable(true);
  }

  ionViewDidLeave()
    {
       
       if(this.checkvariable!=1)
        {
          this.menuCtrl.enable(true);
          console.log("yyyyyyyyyyyyyyyyyyy")
          this.loading.present();
          this.auth.getallprojects().subscribe((res) => {
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

             this.appCtrl.getRootNav().setRoot(AllProjects, { obj: res });
          }, () => {
            this.loading.dismiss();
            this.viewCtrl.dismiss('');
          })
        }

    }
}
