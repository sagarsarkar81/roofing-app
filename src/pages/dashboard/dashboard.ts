import { Component, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { Auth } from '../../providers/auth';
import { NativeStorage } from '@ionic-native/native-storage';
import { Login } from '../../pages/login/login';
import { MenuController } from 'ionic-angular';
import { LoadingController, AlertController } from 'ionic-angular';
/**
 * Generated class for the Dashboard page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class Dashboard {
  barChart: any;
  doughnutChart: any;
  lineChart: any;
  graphdata: any;
  arr = [];
  arr1: any;
  @ViewChild('barCanvas') barCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('lineCanvas') lineCanvas;
  loading: any;
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams, public auth: Auth, public nativeStorage: NativeStorage, public menuCtrl: MenuController) {
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

    });

    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  }

  ionViewDidLoad() {
    this.loading.present();
    this.auth.getgraph().subscribe((data) => {
      this.graphdata = data.data;
      this.loading.dismiss();
      this.arr1 = '[';
      for (let j of this.graphdata) {
        this.arr.push(j.open);
        this.arr.push(j.complete);
        this.arr.push(j.onhold);
        this.barChart = new Chart(this.barCanvas.nativeElement, {

          type: 'bar',
          data: {
            labels: ["Open Projects", "Completed Projects", "Projects On Hold"],
            datasets: [{
              label: '# of Projects',
              data: [j.open, j.complete, j.onhold],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'

              ],
              borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'

              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }

        });
        this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

          type: 'doughnut',
          data: {
            labels: ["Open Projects", "Completed Projects", "Projects On Hold"],
            datasets: [{
              label: '# of Projects',
              data: [j.open, j.complete, j.onhold],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'

              ],
              hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"

              ]
            }]
          }

        });

      }



    }, (error) => {

    })





  }

  logout() {
    this.nativeStorage.clear().then((res) => {

      this.navCtrl.setRoot(Login);
    })
  }
}
