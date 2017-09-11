import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import {Commonpost} from '../models/commonpost';
import {Success} from '../models/success';
import { NativeStorage } from '@ionic-native/native-storage';
import { MenuController } from 'ionic-angular';
/*
  Generated class for the Auth provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Auth {
  API_URL: any;
  constructor(public http: Http, public nativeStorage: NativeStorage, public menuCtrl: MenuController, ) {
    console.log('Hello Auth Provider');
    this.API_URL = 'http://50.62.31.191/~roofingtracking/roofing-app/public/index.php/api';
  }

  login(data): Observable<Commonpost> {

    const url: string = `${this.API_URL}/login`;
    return this.http.post(url, data)
      .map(res => <Commonpost>res.json());
  }
  getrole(): Observable<Commonpost> {
    const url: string = `${this.API_URL}/display_role`;
    return this.http.get(url)
      .map(res => <Commonpost>res.json());
  }
  adduser(data): Observable<Commonpost> {
    const url: string = `${this.API_URL}/user_add`;
    return this.http.post(url, data)
      .map(res => <Commonpost>res.json());
  }
  changpass(data): Observable<Commonpost> {
    const url: string = `${this.API_URL}/changepass`;
    return this.http.post(url, data)
      .map(res => <Commonpost>res.json());
  }
  alluser(): Observable<Commonpost> {
    const url: string = `${this.API_URL}/profile_details/0/0`;
    return this.http.get(url)
      .map(res => <Commonpost>res.json());
  }
  allusersearch(dt): Observable<Commonpost> {
    console.log(dt.name);
    let val = dt.name;
    const url: string = `${this.API_URL}/profile_details/search/` + val;
    return this.http.get(url)
      .map(res => <Commonpost>res.json());
  }
  updateuser(data): Observable<Commonpost> {
    const url: string = `${this.API_URL}/edit_save`;
    return this.http.post(url, data)
      .map(res => <Commonpost>res.json());
  }
  getallprojects(): Observable<Commonpost> {
    const url: string = `${this.API_URL}/all_projects/null`;
    return this.http.get(url)
      .map(res => <Commonpost>res.json());
  }
  getallprojectsx(data): Observable<Commonpost> {
    const url: string = `${this.API_URL}/all_projects_assign/null/` + data.id;
    return this.http.get(url)
      .map(res => <Commonpost>res.json());
  }
  getallprojectssearch(dt): Observable<Commonpost> {
    const url: string = `${this.API_URL}/all_projects/` + dt.name;
    return this.http.get(url)
      .map(res => <Commonpost>res.json());
  }
  getallprojectssearchst(dt): Observable<Commonpost> {
    const url: string = `${this.API_URL}/all_projects_new/` + dt.name+'/'+dt.status;
    console.log(url);
    return this.http.get(url)
      .map(res => <Commonpost>res.json());
  }
  getallprojectssearchx(dt): Observable<Commonpost> {
    const url: string = `${this.API_URL}/all_projects_assign/` + dt.name + '/' + dt.id;
    return this.http.get(url)
      .map(res => <Commonpost>res.json());
  }
  getallprojectssearchass(dt): Observable<Commonpost> {
    const url: string = `${this.API_URL}/all_open_projects_for_assignement/` + dt.name;
    return this.http.get(url)
      .map(res => <Commonpost>res.json());
  }
  getindividualuserdetails(dt): Observable<Commonpost> {
    const url: string = `${this.API_URL}/profile_edit_individual/` + dt.id;
    console.log(url);
    return this.http.get(url)
      .map(res => <Commonpost>res.json());
  }
  getopen(): Observable<Commonpost> {
    const url: string = `${this.API_URL}/all_open_projects/null`;
    return this.http.get(url)
      .map(res => <Commonpost>res.json());
  }
  getopenassignement(): Observable<Commonpost> {
    const url: string = `${this.API_URL}/all_open_projects_for_assignement/null`;
    return this.http.get(url)
      .map(res => <Commonpost>res.json());
  }
  getworkingprogress(): Observable<Commonpost> {
    const url: string = `${this.API_URL}/all_workinprogress_projects`;
    return this.http.get(url)
      .map(res => <Commonpost>res.json());
  }
  getonhold(): Observable<Commonpost> {
    const url: string = `${this.API_URL}/all_problem_projects`;
    return this.http.get(url)
      .map(res => <Commonpost>res.json());
  }
  getcomplite(): Observable<Commonpost> {
    const url: string = `${this.API_URL}/all_completed_projects`;
    return this.http.get(url)
      .map(res => <Commonpost>res.json());
  }
  getgraph(): Observable<Commonpost> {
    const url: string = `${this.API_URL}/graph_projects`;
    return this.http.get(url)
      .map(res => <Commonpost>res.json());
  }
  getprofiledata(dt): Observable<Commonpost> {
    const url: string = `${this.API_URL}/view_individual_user/` + dt.id;
    return this.http.get(url)
      .map(res => <Commonpost>res.json());
  }
  profileupdate(data): Observable<Success> {
    const url: string = `${this.API_URL}/view_individual_user_save_button`;
    return this.http.post(url, data).delay(2000)
      .map(res => <Success>res.json());
  }
  getsorteduser(dt): Observable<Commonpost> {
    const url: string = `${this.API_URL}/profile_details/` + dt.nm + '/1';
    console.log(url);
    return this.http.get(url)
      .map(res => <Commonpost>res.json());
  }
  userdel(dt): Observable<Commonpost> {
    const url: string = `${this.API_URL}/delete_user/` + dt.id;
    console.log(url);
    return this.http.delete(url)
      .map(res => <Commonpost>res.json());
  }
  getsalesman(): Observable<Commonpost> {
    const url: string = `${this.API_URL}/all_sales_person`;
    return this.http.get(url)
      .map(res => <Commonpost>res.json());
  }
  addnewprojects(data): Observable<Commonpost> {
    const url: string = `${this.API_URL}/project_add_new`;
    return this.http.post(url, data).delay(2000)
      .map(res => <Commonpost>res.json());
  }
  addattachment(data): Observable<Success> {
    const url: string = `${this.API_URL}/project_attachment`;
    return this.http.post(url, data).delay(2000)
      .map(res => <Success>res.json());
  }
  addsalesman(data): Observable<Success> {
    const url: string = `${this.API_URL}/assigned_project`;
    return this.http.post(url, data).delay(2000)
      .map(res => <Success>res.json());
  }
  userprojectdel(dt): Observable<Commonpost> {
    const url: string = `${this.API_URL}/delete_project/` + dt.id;
    console.log(url);
    return this.http.delete(url)
      .map(res => <Commonpost>res.json());
  }
  updateproject(data): Observable<Success> {
    const url: string = `${this.API_URL}/update_project`;
    return this.http.post(url, data).delay(2000)
      .map(res => <Success>res.json());
  }
  getindividualproject(dt): Observable<Commonpost> {
    const url: string = `${this.API_URL}/individual_project_show/` + dt.id;
    return this.http.get(url)
      .map(res => <Commonpost>res.json());
  }
  getallprojectfile(dt): Observable<Commonpost> {
    const url: string = `${this.API_URL}/project_attachment/` + dt.id;
    return this.http.get(url)
      .map(res => <Commonpost>res.json());
  }
  allsupplier(): Observable<Commonpost> {
    const url: string = `${this.API_URL}/all_supplier`;
    return this.http.get(url)
      .map(res => <Commonpost>res.json());
  }
  addsupplier(data): Observable<Commonpost> {
    const url: string = `${this.API_URL}/add_supplier`;
    return this.http.post(url, data).delay(2000)
      .map(res => <Success>res.json());
  }
  allsupplierpendingquote(dt): Observable<Commonpost> {
    const url: string = `${this.API_URL}/supplier_pending_quotes/` + dt.id;
    console.log(url);
    return this.http.get(url)
      .map(res => <Commonpost>res.json());
  }
  allgutterpendingquote(dt): Observable<Commonpost> {
    const url: string = `${this.API_URL}/gutter_pending_quotes/` + dt.id;
    console.log(url);
    return this.http.get(url)
      .map(res => <Commonpost>res.json());
  }
  allconstructorpendingquote(dt): Observable<Commonpost> {
    const url: string = `${this.API_URL}/constructor_pending_quotes/` + dt.id;
    console.log(url);
    return this.http.get(url)
      .map(res => <Commonpost>res.json());
  }
  addquote(data): Observable<Success> {
    console.log(data);
    const url: string = `${this.API_URL}/supplier_insert_quotes`;
    return this.http.post(url, data).delay(2000)
      .map(res => <Success>res.json());
  }
  allearning(): Observable<Commonpost> {
    const url: string = `${this.API_URL}/all_earnings/null`;

    return this.http.get(url)
      .map(res => <Commonpost>res.json());
  }
  allearningsales(data): Observable<Commonpost> {
    const url: string = `${this.API_URL}/all_earnings_of_sales/null/` + data.id;
    console.log(url);
    return this.http.get(url)
      .map(res => <Commonpost>res.json());
  }
  allsupplierqoute(): Observable<Commonpost> {

    const url: string = `${this.API_URL}/supplier_con_quotes/null`;
    return this.http.get(url)
      .map(res => <Commonpost>res.json());
  }
  allgutterqoute(): Observable<Commonpost> {

    const url: string = `${this.API_URL}/gutter_con_quotes/null`;
    return this.http.get(url)
      .map(res => <Commonpost>res.json());
  }
  allconstructorqoute(): Observable<Commonpost> {

    const url: string = `${this.API_URL}/constructor_con_quotes/null`;
    return this.http.get(url)
      .map(res => <Commonpost>res.json());
  }
  allgutter(): Observable<Commonpost> {
    const url: string = `${this.API_URL}/all_gutter`;
    return this.http.get(url)
      .map(res => <Commonpost>res.json());
  }
  allconstructor(): Observable<Commonpost> {
    const url: string = `${this.API_URL}/all_constructor`;
    return this.http.get(url)
      .map(res => <Commonpost>res.json());
  }
  confirmdeliveryproject(): Observable<Commonpost> {
    const url: string = `${this.API_URL}/condition_projects/null`;
    return this.http.get(url)
      .map(res => <Commonpost>res.json());
  }
  addgutter(data): Observable<Commonpost> {
    console.log(data);
    const url: string = `${this.API_URL}/add_gutter`;
    return this.http.post(url, data).delay(2000)
      .map(res => <Success>res.json());
  }
  addconstructur(data): Observable<Commonpost> {
    console.log(data);
    const url: string = `${this.API_URL}/add_constructor`;
    return this.http.post(url, data).delay(2000)
      .map(res => <Success>res.json());
  }

  //all search
  allearningearch(dt): Observable<Commonpost> {
    console.log(dt.name);
    let val = dt.name;
    const url: string = `${this.API_URL}/all_earnings/` + val;
    return this.http.get(url)
      .map(res => <Commonpost>res.json());
  }
  allearningearchsales(dt): Observable<Commonpost> {
    console.log(dt.name);
    let val = dt.name;
    const url: string = `${this.API_URL}/all_earnings_of_sales/` + val + '/' + dt.id;
    return this.http.get(url)
      .map(res => <Commonpost>res.json());
  }
  confirmsearch(dt): Observable<Commonpost> {
    console.log(dt.name);
    let val = dt.name;
    const url: string = `${this.API_URL}/condition_projects/` + val;
    return this.http.get(url)
      .map(res => <Commonpost>res.json());
  }

  suppliersearch(dt): Observable<Commonpost> {
    console.log(dt.name);
    let val = dt.name;
    const url: string = `${this.API_URL}/supplier_con_quotes/` + val;
    return this.http.get(url)
      .map(res => <Commonpost>res.json());
  }
  guttersearch(dt): Observable<Commonpost> {
    console.log(dt.name);
    let val = dt.name;
    const url: string = `${this.API_URL}/gutter_con_quotes/` + val;
    return this.http.get(url)
      .map(res => <Commonpost>res.json());
  }
  constsearch(dt): Observable<Commonpost> {
    console.log(dt.name);
    let val = dt.name;
    const url: string = `${this.API_URL}/constructor_con_quotes/` + val;
    return this.http.get(url)
      .map(res => <Commonpost>res.json());
  }
  menuectrl() {
    return new Promise((resolve, reject) => {

      this.nativeStorage.getItem('uesrInfo').then((datax) => {
        if ((datax.type == '5') || (datax.type == '6') || (datax.type == '7')) {
          this.menuCtrl.enable(true, 'authenticated');
          this.menuCtrl.enable(false, 'authenticated1');
          this.menuCtrl.enable(false, 'unauthenticated');

        } else if ((datax.type == '4')) {
          this.menuCtrl.enable(false, 'authenticated');
          this.menuCtrl.enable(true, 'authenticated1');
          this.menuCtrl.enable(false, 'unauthenticated');


        } else {
          this.menuCtrl.enable(false, 'authenticated');
          this.menuCtrl.enable(true, 'unauthenticated');
          this.menuCtrl.enable(false, 'authenticated1');
        }
        resolve('1');
      }, (err) => {

        reject('2');

      });


    });

  }
  forgetpass(data): Observable<Commonpost> {
    console.log(data);
    const url: string = `${this.API_URL}/forgetpass`;
    return this.http.post(url, data).delay(2000)
      .map(res => <Commonpost>res.json());
  }
}
