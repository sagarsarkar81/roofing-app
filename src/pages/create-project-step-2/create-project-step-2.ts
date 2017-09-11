import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CreateProjectStep3 } from '../create-project-step-3/create-project-step-3';
import { MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, AlertController } from 'ionic-angular';
import { GlobalValidator } from '../../validator/globalvalidator'
import { ToastController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Auth } from '../../providers/auth';
import { Dashboard } from '../dashboard/dashboard';

/**
 * Generated class for the CreateProjectStep2 page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-create-project-step-2',
  templateUrl: 'create-project-step-2.html',
})
export class CreateProjectStep2 {
  loading: any;
  Step2: FormGroup;
  createnewprojectstep3 = CreateProjectStep3;
  submitAttempt: boolean = false;
  msg: any;
  step1fromobj: any;
  pp_id:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    public menuCtrl: MenuController,
    public auth: Auth,
    public nativeStorage: NativeStorage) {
    this.step1fromobj = this.navParams.get('step1');
    this.menuCtrl.enable(true);
    this.Step2 = formBuilder.group({
      //  fullname: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      description: [''],
      budget: ['', Validators.compose([Validators.required])],
      deposit_amount: ['', Validators.compose([Validators.required])],
      //termcheck: ['',Validators.required]
    });
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.submitAttempt = false;
  }

  createprojectstep3() {
    let env = this;
    if (!this.Step2.valid) {
      this.submitAttempt = true;
      this.msg = "Please fill out all details accurately.";
      this.presentToast(this.msg).then(() => {


      })
    } else {
      let step2fromobj = this.Step2.value;
      console.log(step2fromobj);
      console.log(this.step1fromobj);
      this.nativeStorage.getItem('uesrInfo').then((data) => {
        if(this.pp_id!=''){

  var postobj = {
          user_id: data.id,
          address: '',
          phone: '',
          website: '',
          skype_id: '',
          facebook_profile_link: '',
          linkedin_profile_link: '',
          twitter_profile_link: '',
          short_note: '',
          photo: '',
          title: this.step1fromobj.title,
          client_name: this.step1fromobj.client_name,
          client_address: this.step1fromobj.client_address1 + '' + this.step1fromobj.client_address2,
          client_address_city: this.step1fromobj.client_address_city,
          client_address_state: this.step1fromobj.client_address_state,
          client_address_zip: this.step1fromobj.client_address_zip,
          client_address_country: this.step1fromobj.client_address_country,
          client_phone: this.step1fromobj.client_phone,
          client_email: this.step1fromobj.client_email,
          description: step2fromobj.description,
          budget: step2fromobj.budget,
          deposit_amount: step2fromobj.deposit_amount,
          projectId:this.pp_id,
        };

        }else{
            var postobj = {
          user_id: data.id,
          address: '',
          phone: '',
          website: '',
          skype_id: '',
          facebook_profile_link: '',
          linkedin_profile_link: '',
          twitter_profile_link: '',
          short_note: '',
          photo: '',
          title: this.step1fromobj.title,
          client_name: this.step1fromobj.client_name,
          client_address: this.step1fromobj.client_address1 + '' + this.step1fromobj.client_address2,
          client_address_city: this.step1fromobj.client_address_city,
          client_address_state: this.step1fromobj.client_address_state,
          client_address_zip: this.step1fromobj.client_address_zip,
          client_address_country: this.step1fromobj.client_address_country,
          client_phone: this.step1fromobj.client_phone,
          client_email: this.step1fromobj.client_email,
          description: step2fromobj.description,
          budget: step2fromobj.budget,
          deposit_amount: step2fromobj.deposit_amount,
            projectId:null,
        };
        }
      
        this.loading.present();
        this.auth.addnewprojects(postobj).subscribe((res) => {
          console.log(res);
          this.loading.dismiss();
          this.presentToast(res.msg).then(() => {
            let p_id = '';
            for (let g of res.data) {
              p_id = g.project_id;
              this.pp_id=g.project_id;
            }
            (this.navCtrl.push(this.createnewprojectstep3, { p_id: p_id }));
          }, () => {
            this.loading.dismiss();
          })

        }, (error) => {

          this.loading.dismiss();

        })
      }, (error) => {

        this.loading.dismiss();
      });


    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateProjectStep2');
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
