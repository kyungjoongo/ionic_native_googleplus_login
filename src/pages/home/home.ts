import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {GooglePlus} from "@ionic-native/google-plus";
import {FirebaseListObservable} from 'angularfire2/database';
import {FirebaseProvider} from "../../providers/firebase/firebase";
import {HttpProvider} from "../../providers/http/http";
import {LocalStorageService} from 'angular-2-local-storage';
import {ListPage} from "../list/list";
import {MyApp} from "../../app/app.component";
import {Events} from 'ionic-angular';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    savedUserId: string;
    shoppingItems: FirebaseListObservable<any[]>;
    newItem = {};
    displayName: any;
    email: any;
    familyName: any;
    givenName: any;
    userId: any;
    imageUrl: any;
    isLoggedIn: boolean = false;


    constructor(public navCtrl: NavController, private googlePlus: GooglePlus
        , public firebaseProvider: FirebaseProvider
        , private httpProvider: HttpProvider
        , private events: Events
        , private localStorageService: LocalStorageService) {


    }

    ionViewDidEnter() {

        /* if (this.localStorageService.get("userId") === null) {
             console.log('널이네');
         } else {
             let savedUserId = this.localStorageService.get("userId").toString();
             console.log(savedUserId);

             this.login();
         }
 */

    }


    login() {

        /**
         *
         * 일치 한는 정보가 있는지를 db와 oatuh에서 확인하여
         *
         * 일치한느 정보가 있으면 list페이지로
         * 그렇지 않으면
         * 가입 페이지를 보여준다.
         *
         */


        this.googlePlus.login({}).then(loginResponse => {




            //디비에서 유저정보를 가지고 온다..
            this.httpProvider.getItem(loginResponse.userId).then(res => {

                if (res != null) {
                    console.log('이미 가입된 아이디가 있습니다')

                    //로컬 스토리지에 이미지 저장
                    this.localStorageService.set('imageUrl', loginResponse.imageUrl);

                    this.navCtrl.push(ListPage)
                } else {
                    this.displayName = loginResponse.displayName;
                    this.email = loginResponse.email;
                    this.familyName = loginResponse.familyName;
                    this.givenName = loginResponse.givenName;
                    this.userId = loginResponse.userId;
                    this.imageUrl = loginResponse.imageUrl;
                    this.isLoggedIn = true;
                    console.log(this.displayName);

                    this.navCtrl.push(MyApp);

                }

                this.events.publish('username:changed', { 'imageUrl': loginResponse.imageUrl, 'displayName': loginResponse.displayName});
            })


            /**
             * 해당id가 있어서 페치가 되어진 경우는 아이디가 존재하는 것이므로 리다이렉트.
             */


            // this.localStorageService.set('userId', this.userId);

        })
            .catch(err => {

                alert('애러네');
                console.error(err)
            });

        //alert('sdflksdlkflsdkf')

    }

    logout() {
        this.googlePlus.logout()
            .then(res => {
                console.log(res);
                this.displayName = "";
                this.email = "";
                this.familyName = "";
                this.givenName = "";
                this.userId = "";
                this.imageUrl = "";

                this.isLoggedIn = false;

                this.localStorageService.set('imageUrl', null);

                alert('로그아웃되었어요!');
            })
            .catch(err => console.error(err));
    }


    register() {

        /*this.httpProvider.addItem()*/

        let userInfo = {
            displayName: this.displayName,
            email: this.email,
            familyName: this.familyName,
            givenName: this.givenName,
            userId: this.userId,
            imageUrl: this.imageUrl
        }


        this.httpProvider.addItem(userInfo).then(res => {

            console.log("res->" + JSON.stringify(res));

            alert('가입되었어요!');
            this.navCtrl.push(ListPage)

        });

    }


}
