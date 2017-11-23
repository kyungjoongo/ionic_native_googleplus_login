import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {GooglePlus} from '@ionic-native/google-plus';
import {HttpModule} from '@angular/http';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireModule} from 'angularfire2';
import {FirebaseProvider} from '../providers/firebase/firebase';

import {HttpClientModule} from "@angular/common/http";
import {HttpProvider} from '../providers/http/http';
import { LocalStorageModule } from 'angular-2-local-storage';

const firebaseConfig = {
    apiKey: "AIzaSyA8pHuo5qMXU0Wk9tRJxsrjsrQ1FGMrbW4",
    authDomain: "fir-001-9e43a.firebaseapp.com",
    databaseURL: "https://fir-001-9e43a.firebaseio.com",
    projectId: "fir-001-9e43a",
    storageBucket: "fir-001-9e43a.appspot.com",
    messagingSenderId: "96753856506"
};


@NgModule({
    declarations: [
        MyApp,
        HomePage,
        ListPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        HttpModule, HttpClientModule,
        AngularFireDatabaseModule,
        AngularFireModule.initializeApp(firebaseConfig),
        LocalStorageModule.withConfig({
            prefix: 'kyungjoon-app001',
            storageType: 'localStorage'
        }),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        ListPage
    ],
    providers: [

        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler}, GooglePlus,
        FirebaseProvider,
        HttpProvider


    ]


})
export class AppModule {
}
