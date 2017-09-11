import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App} from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, AlertController } from 'ionic-angular';
import { GlobalValidator } from '../../validator/globalvalidator'
import { ToastController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Dashboard } from '../dashboard/dashboard';
import { UserManagement } from '../../pages/user-management/user-management';
import { AllProjects } from '../../pages/all-projects/all-projects';
import { CreateProjectStep3 } from '../create-project-step-3/create-project-step-3';
/**
 * Generated class for the Editprojects page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-editprojects',
  templateUrl: 'editprojects.html',
})
export class Editprojects {
  getdata: any;
  loading: any;
  EditProjectForm: FormGroup;
  msg: any;
  arr = [];
  indidata: any;
  submitAttempt: boolean = false;
  projectdata: any;
  statelist: any;
  state: any;
  project_status:any;
  logtype:any='';
  constructor(public navCtrl: NavController, public navParams: NavParams, private nativeStorage: NativeStorage,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    public menuCtrl: MenuController,
    public auth: Auth,
    public viewCtrl: ViewController,
    public appCtrl: App) {
       this.nativeStorage.getItem('uesrInfo').then((data) => {
      console.log(data.type);
      if (data.type == '4') {
        this.logtype=data.type;
      }
      });
    this.statelist = [
      {
        "name": "Alabama",
        "abbreviation": "AL"
      },
      {
        "name": "Alaska",
        "abbreviation": "AK"
      },
      {
        "name": "American Samoa",
        "abbreviation": "AS"
      },
      {
        "name": "Arizona",
        "abbreviation": "AZ"
      },
      {
        "name": "Arkansas",
        "abbreviation": "AR"
      },
      {
        "name": "California",
        "abbreviation": "CA"
      },
      {
        "name": "Colorado",
        "abbreviation": "CO"
      },
      {
        "name": "Connecticut",
        "abbreviation": "CT"
      },
      {
        "name": "Delaware",
        "abbreviation": "DE"
      },
      {
        "name": "District Of Columbia",
        "abbreviation": "DC"
      },
      {
        "name": "Federated States Of Micronesia",
        "abbreviation": "FM"
      },
      {
        "name": "Florida",
        "abbreviation": "FL"
      },
      {
        "name": "Georgia",
        "abbreviation": "GA"
      },
      {
        "name": "Guam",
        "abbreviation": "GU"
      },
      {
        "name": "Hawaii",
        "abbreviation": "HI"
      },
      {
        "name": "Idaho",
        "abbreviation": "ID"
      },
      {
        "name": "Illinois",
        "abbreviation": "IL"
      },
      {
        "name": "Indiana",
        "abbreviation": "IN"
      },
      {
        "name": "Iowa",
        "abbreviation": "IA"
      },
      {
        "name": "Kansas",
        "abbreviation": "KS"
      },
      {
        "name": "Kentucky",
        "abbreviation": "KY"
      },
      {
        "name": "Louisiana",
        "abbreviation": "LA"
      },
      {
        "name": "Maine",
        "abbreviation": "ME"
      },
      {
        "name": "Marshall Islands",
        "abbreviation": "MH"
      },
      {
        "name": "Maryland",
        "abbreviation": "MD"
      },
      {
        "name": "Massachusetts",
        "abbreviation": "MA"
      },
      {
        "name": "Michigan",
        "abbreviation": "MI"
      },
      {
        "name": "Minnesota",
        "abbreviation": "MN"
      },
      {
        "name": "Mississippi",
        "abbreviation": "MS"
      },
      {
        "name": "Missouri",
        "abbreviation": "MO"
      },
      {
        "name": "Montana",
        "abbreviation": "MT"
      },
      {
        "name": "Nebraska",
        "abbreviation": "NE"
      },
      {
        "name": "Nevada",
        "abbreviation": "NV"
      },
      {
        "name": "New Hampshire",
        "abbreviation": "NH"
      },
      {
        "name": "New Jersey",
        "abbreviation": "NJ"
      },
      {
        "name": "New Mexico",
        "abbreviation": "NM"
      },
      {
        "name": "New York",
        "abbreviation": "NY"
      },
      {
        "name": "North Carolina",
        "abbreviation": "NC"
      },
      {
        "name": "North Dakota",
        "abbreviation": "ND"
      },
      {
        "name": "Northern Mariana Islands",
        "abbreviation": "MP"
      },
      {
        "name": "Ohio",
        "abbreviation": "OH"
      },
      {
        "name": "Oklahoma",
        "abbreviation": "OK"
      },
      {
        "name": "Oregon",
        "abbreviation": "OR"
      },
      {
        "name": "Palau",
        "abbreviation": "PW"
      },
      {
        "name": "Pennsylvania",
        "abbreviation": "PA"
      },
      {
        "name": "Puerto Rico",
        "abbreviation": "PR"
      },
      {
        "name": "Rhode Island",
        "abbreviation": "RI"
      },
      {
        "name": "South Carolina",
        "abbreviation": "SC"
      },
      {
        "name": "South Dakota",
        "abbreviation": "SD"
      },
      {
        "name": "Tennessee",
        "abbreviation": "TN"
      },
      {
        "name": "Texas",
        "abbreviation": "TX"
      },
      {
        "name": "Utah",
        "abbreviation": "UT"
      },
      {
        "name": "Vermont",
        "abbreviation": "VT"
      },
      {
        "name": "Virgin Islands",
        "abbreviation": "VI"
      },
      {
        "name": "Virginia",
        "abbreviation": "VA"
      },
      {
        "name": "Washington",
        "abbreviation": "WA"
      },
      {
        "name": "West Virginia",
        "abbreviation": "WV"
      },
      {
        "name": "Wisconsin",
        "abbreviation": "WI"
      },
      {
        "name": "Wyoming",
        "abbreviation": "WY"
      }
    ]
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
    this.auth.menuectrl().then(()=>{

    })
    this.getdata = this.navParams.get('val');
    //this.projectdata=this.navParams.get('alldata')
    for (let g of this.navParams.get('alldata')) {
      this.projectdata = g;
    }
    console.log(this.projectdata);

    let val = this.getdata.id;
    let obj = {
      id: val
    }
    console.log('ok');

    this.loading.dismiss();
    this.state = this.projectdata.client_address_state;
    
    this.project_status=this.projectdata.project_status;
    this.EditProjectForm = formBuilder.group({
      //  fullname: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      title: [this.projectdata.title],
      client_name: [this.projectdata.client_name, Validators.compose([Validators.required])],
      client_address: [this.projectdata.client_address, Validators.compose([Validators.required])],
      client_address_city: [this.projectdata.client_address_city, Validators.compose([Validators.required])],
      //client_address_state: [this.projectdata.client_address_state, Validators.compose([Validators.required])],
      client_address_zip: [this.projectdata.client_address_zip, Validators.compose([Validators.required])],
      client_address_country: ['USA', Validators.compose([Validators.required])],
      client_phone: [this.projectdata.client_phone],
      client_email: [this.projectdata.client_email],
      description: [this.projectdata.description],
      deposit_amount: [this.projectdata.deposit_amount, Validators.compose([Validators.required])],
     // project_status: [this.projectdata.project_status, Validators.compose([Validators.required])],
      budget: [this.projectdata.budget, Validators.compose([Validators.required])],




      //termcheck: ['',Validators.required]
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Editprojects');
  }
  updateaction() {
    let env = this;
    if (!this.EditProjectForm.valid) {
      this.submitAttempt = true;
      this.msg = "Please fill out all details accurately.";
      this.presentToast(this.msg).then(() => {


      })

    } else {
      let obj = this.EditProjectForm.value;
      var postobj = {

        title: obj.title,
        client_address: obj.client_address,
        client_address_city: obj.client_address_city,
        client_address_state: this.state,
        client_address_zip: obj.client_address_zip,
        client_address_country: 'USA',
        client_phone: obj.client_phone,
        client_email: obj.client_email,
        description: obj.description,
        budget: obj.budget,
        deposit_amount: obj.deposit_amount,
        project_id: this.getdata.id,
        project_status: this.project_status,
        client_name: obj.client_name





      }
     
      this.loading.present();
      this.auth.updateproject(postobj).subscribe((res) => {

        console.log(res);
        if (res.success) {
          this.loading.dismiss();
          this.auth.getallprojects().subscribe((data) => {
            this.appCtrl.getRootNav().setRoot(AllProjects, { obj: data.data });
          });
        }

      }, (error) => {
        this.loading.dismiss();
      })

    }

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
  popView() {
    this.navCtrl.pop();
  }
allfile(){
  let obj = {
      id: this.getdata.id,
    }
    console.log(this.getdata.id);
  
this.loading.present();
    this.auth.getindividualproject(obj).subscribe((data) => {
      console.log(data);
      this.loading.dismiss();
      this.appCtrl.getRootNav().push(CreateProjectStep3, { p_id: this.getdata.id, showbox: true });

    }, (error) => {
  this.loading.dismiss();
    })

  
}
}
