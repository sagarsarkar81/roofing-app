import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
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
import { Userview } from '../pages/userview/userview';
import { AllProjects } from '../pages/all-projects/all-projects';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { EditUser } from '../pages/edit-user/edit-user';
import { Supplier } from '../pages/supplier/supplier';
import { Allearning } from '../pages/allearning/allearning';
import { Yourquote } from '../pages/yourquote/yourquote';
import { Popsupplier } from '../pages/popsupplier/popsupplier';
import { Addsupplier } from '../pages/addsupplier/addsupplier';
import { Editprojects } from '../pages/editprojects/editprojects';
import { Viewprojects } from '../pages/viewprojects/viewprojects';
import { Yourqoutepop } from '../pages/yourqoutepop/yourqoutepop';
import { Makequote } from '../pages/makequote/makequote';
import { Constructure } from '../pages/constructure/constructure';
import { Supplierqoute } from '../pages/supplierqoute/supplierqoute';
import { Gutterquotetion } from '../pages/gutterquotetion/gutterquotetion';
import { Addgutter } from '../pages/addgutter/addgutter';
import { Addconstructer } from '../pages/addconstructer/addconstructer';
import { Qoutemodal } from '../pages/qoutemodal/qoutemodal';
import { Popquoting } from '../pages/popquoting/popquoting';
import { Confirmdelivery } from '../pages/confirmdelivery/confirmdelivery';
import { AllfilesPage } from '../pages/allfiles/allfiles';


import {Sort} from '../pipes/sort';
//my import
import { HttpModule } from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';
import { Network } from '@ionic-native/network';
import { Auth } from '../providers/auth';
import { FileChooser } from '@ionic-native/file-chooser';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FileOpener } from '@ionic-native/file-opener';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Base64 } from '@ionic-native/base64';
@NgModule({
  declarations: [
    MyApp,
    Login,
    Dashboard,
    UserManagement,
    Popover,
    PopoverProjectListEdit,
    PopoverProjectListFilter,
    PopoverSort,
    PopoverProjectSort,
    AddNewUser,
    UserProfile,
    ChangePassword,
    ForgotPassword,
    CreateProject,
    CreateProjectStep1,
    CreateProjectStep2,
    CreateProjectStep3,
    CreateProjectStep4,
    AllProjects,
    EditUser,
    Userview,
    Sort,
    Supplier,
    Allearning,
    Yourquote,
    Editprojects,
    Viewprojects,
    Popsupplier,
    Addsupplier,
    Yourqoutepop,
    Makequote,
    Constructure,
    Supplierqoute,
    Gutterquotetion,
    Addgutter,
    Addconstructer,
    Qoutemodal,
    Popquoting,
    Confirmdelivery,
    AllfilesPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp, {
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      backButtonText: '',
      iconMode: 'ios',
      tabsPlacement: 'bottom',
      pageTransition: 'ios-transition',
      swipeBackEnabled: true,
      tabsHideOnSubPages: true,
      scrollAssist:false,
      autoFocusAssist:true
    }, ),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Login,
    Dashboard,
    UserManagement,
    Popover,
    PopoverProjectListEdit,
    PopoverProjectListFilter,
    PopoverSort,
    PopoverProjectSort,
    AddNewUser,
    UserProfile,
    ChangePassword,
    ForgotPassword,
    CreateProject,
    CreateProjectStep1,
    CreateProjectStep2,
    CreateProjectStep3,
    CreateProjectStep4,
    AllProjects,
    EditUser,
    Userview,
    Supplier,
    Allearning,
    Yourquote,
    Editprojects,
    Viewprojects,
    Popsupplier,
    Addsupplier,
    Yourqoutepop,
    Makequote,
    Constructure,
    Supplierqoute,
    Gutterquotetion,
    Addgutter,
    Addconstructer,
    Qoutemodal,
    Popquoting,
    Confirmdelivery,
    AllfilesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeStorage,
    Network,
    Auth,
    FileChooser,
    File,
    FilePath,
    Camera,
    FileTransfer,
    FileOpener,
    AndroidPermissions,
    Base64,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
