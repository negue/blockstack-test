import { Component } from '@angular/core';

import * as blockstack from 'blockstack';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'blockstack-test';

  login() {
    blockstack.redirectToSignIn();
  }
}
