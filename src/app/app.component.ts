import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';
import {LocalStorageService} from "angular-2-local-storage";
import {Events} from 'ionic-angular';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = HomePage;
    avatar_img :string= 'rhrud_아바타';
    displayName : string = '';

    pages: Array<{ title: string, component: any }>;

    constructor(public platform: Platform, public statusBar: StatusBar
        , public splashScreen: SplashScreen
                ,public events : Events
        , public localStorageSvc: LocalStorageService) {
        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            {title: 'Home', component: HomePage},
            {title: 'List', component: ListPage}
        ];

        /*if (this.localStorageSvc.get("imageUrl") ===null  ) {

        }else{
            console.log('새로운이미지가있다');
            this.avatar_img = this.localStorageSvc.get('imageUrl');
        }*/

        events.subscribe('username:changed', result => {


            console.log("--->"+ result.imageUrl);

            if(result !== undefined && result !== ""){



                if (result.imageUrl == undefined){
                    console.log("--->222"+ result.imageUrl);

                    this.avatar_img = 'assets/imgs/avatar_placeholder.jpg';
                }else{
                    this.avatar_img = result.imageUrl
                }
                this.displayName = result.displayName;



            }
        }) //.


    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
}
