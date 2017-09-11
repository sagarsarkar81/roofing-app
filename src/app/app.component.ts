import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, Config } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//pages
import { Login } from '../pages/login/login';
import { Dashboard } from '../pages/dashboard/dashboard';
import { UserManagement } from '../pages/user-management/user-management';
import { Popover } from '../pages/popover/popover';
import { PopoverProjectListEdit } from '../pages/popover-project-list-edit/popover-project-list-edit';
import { PopoverProjectListFilter } from '../pages/popover-project-list-filter/popover-project-list-filter';
import { PopoverSort } from '../pages/popover-sort/popover-sort';
import { PopoverProjectSort } from '../pages/popover-project-sort/popover-project-sort';
import { AddNewUser } from '../pages/add-new-user/add-new-user';
import { UserProfile } from '../pages/user-profile/user-profile';
import { ChangePassword } from '../pages/change-password/change-password';
import { ForgotPassword } from '../pages/forgot-password/forgot-password';
import { CreateProject } from '../pages/create-project/create-project';
import { CreateProjectStep1 } from '../pages/create-project-step-1/create-project-step-1';
import { CreateProjectStep2 } from '../pages/create-project-step-2/create-project-step-2';
import { CreateProjectStep3 } from '../pages/create-project-step-3/create-project-step-3';
import { CreateProjectStep4 } from '../pages/create-project-step-4/create-project-step-4';
import { Constructure } from '../pages/constructure/constructure';
import { Supplierqoute } from '../pages/supplierqoute/supplierqoute';
import { Gutterquotetion } from '../pages/gutterquotetion/gutterquotetion';
import { Confirmdelivery } from '../pages/confirmdelivery/confirmdelivery';

import { AllProjects } from '../pages/all-projects/all-projects';
import { Supplier } from '../pages/supplier/supplier';
import { Allearning } from '../pages/allearning/allearning';
import { Yourquote } from '../pages/yourquote/yourquote';
import { NativeStorage } from '@ionic-native/native-storage';
import { MenuController } from 'ionic-angular';
//service import
import { Network } from '@ionic-native/network';
import { ToastController } from 'ionic-angular';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  msg: any;
  rootPage: any = Login;
  alert: any;
  pages: Array<{ title: string, component: any }>;
  pages1: Array<{ title: string, component: any }>;
  pages3: Array<{ title: string, component: any }>;
  constructor(public platform: Platform, public alertCtrl: AlertController, public menuController: MenuController,
    private network: Network, public nativeStorage: NativeStorage, public statusBar: StatusBar,
    public splashScreen: SplashScreen, public toastCtrl: ToastController,
    public config: Config, ) {
    this.initializeApp();
    this.pages = [
      { title: 'Dashboard', component: Dashboard },
      { title: 'User Management', component: UserManagement },
      { title: 'Add New User', component: AddNewUser },
      { title: 'User Profile', component: UserProfile },
      { title: 'Change Password', component: ChangePassword },
      // { title: 'Forgot Password', component: ForgotPassword },
      // { title: 'Create Project', component: CreateProject },
      { title: 'Projects', component: AllProjects },
      { title: 'Add New Project', component: CreateProject },
      { title: 'All Earning Commission', component: Allearning },
      { title: 'Supplier Assignment', component: Supplier },

      { title: 'Construction Quotes', component: Constructure },
      { title: 'Supplier Quotes', component: Supplierqoute },
      { title: 'Gutter Quotes', component: Gutterquotetion },
      { title: 'Confirmed Delevery Projects', component: Confirmdelivery },

    ];
    this.pages1 = [
      { title: 'Dashboard', component: Dashboard },
      { title: 'All Quotes', component: Yourquote },
      { title: 'Change Password', component: ChangePassword },


    ];

    this.pages3 = [
      { title: 'Dashboard', component: Dashboard },
      { title: 'Projects', component: AllProjects },
      { title: 'Add New Project', component: CreateProject },
      { title: 'All Earning Commission', component: Allearning },
      { title: 'Change Password', component: ChangePassword },


    ];

    this.nativeStorage.getItem('uesrInfo').then((data) => {
      console.log(data);

      //  this.menuController.enable(true);
      //  this.nav.setRoot(Dashboard);
    }, (error) => {

      //  this.nav.setRoot(Login);
    });
    platform.registerBackButtonAction(() => {


      //uncomment this and comment code below to to show toast and exit app
      // if (this.backButtonPressedOnceToExit) {
      //   this.platform.exitApp();
      // } else if (this.nav.canGoBack()) {
      //   this.nav.pop({});
      // } else {
      //   this.showToast();
      //   this.backButtonPressedOnceToExit = true;
      //   setTimeout(() => {

      //     this.backButtonPressedOnceToExit = false;
      //   },2000)
      // }

      if (this.nav.canGoBack()) {
        this.nav.pop();
      } else {
        if (this.alert) {
          this.alert.dismiss();
          this.alert = null;
        } else {
          this.showAlert();
        }
      }
    });
  }
  showAlert() {
    this.alert = this.alertCtrl.create({
      title: 'Exit?',
      message: 'Do you want to exit the app?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.alert = null;
          }
        },
        {
          text: 'Exit',
          handler: () => {
            this.platform.exitApp();
          }
        }
      ]
    });
    this.alert.present();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      let env = this;
      let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
        this.msg = "System Offline";
        this.presentToast(this.msg).then((res) => {


        })
      });

      // stop disconnect watch
      //  disconnectSubscription.unsubscribe();

      this.network.onConnect().subscribe(() => {
        this.msg = "System Online";
        this.presentToast(this.msg).then(() => {


        })

      })

      env.nativeStorage.getItem('uesrInfo').then((data) => {
        console.log(data);

        this.menuController.enable(true);
        this.nav.setRoot(Dashboard);
      }, (error) => {

        this.nav.setRoot(Login);
      });
      this.statusBar.styleDefault();
      setTimeout(() => {
        this.splashScreen.hide();
      }, 100);
    });
  }

  openPage(page) {
    console.log(page.component);
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    let obj = {
      success: false
    }
    if (page.component == Dashboard) {
      this.nav.setRoot(page.component, { obj: obj });
    } else {
      this.nav.push(page.component, { obj: obj });

    }

  }
  logoutApp() {

    this.nativeStorage.clear().then((res) => {

      this.nav.setRoot(Login);
    })
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
}
