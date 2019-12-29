import { Component, OnInit } from '@angular/core';
import { Lazy } from '@gewd/lazy/utils';

// lazy load and bundle out
const lazyBlockstack = Lazy.create(
  () => import('./blockstack')
    .then(i => i.default)
    .then(loader => loader.init())
);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'blockstack-test';

  async ngOnInit() {
    // check for cookie / localstorage before loading...

    const blockstack = await lazyBlockstack.getValue();

    const userSession = new blockstack.UserSession();

    if (userSession.isUserSignedIn()) {
      const userData = userSession.loadUserData();

      const profile = userData.profile;
      console.info(profile);


      let options = {
        decrypt: true
      };

      userSession.getFile('/message.txt', options)
      .then((fileContents) => {
        console.info(fileContents);

        // just an example
        let newContent = parseInt(fileContents as string || '0', 10);

        newContent++;

        userSession.putFile('/message.txt', newContent + '', {
          encrypt: true
        });
      });

      // userSession.listFiles((s) => console.warn(s));
    }

    if (userSession.isSignInPending()) {
       const userData = await userSession.handlePendingSignIn();

       const profile = userData.profile;
       console.info(profile);
    }
  }

  async login() {
    const blockstack = await lazyBlockstack.getValue();

    var userSession = new blockstack.UserSession();
    userSession.redirectToSignIn();
  }
}
