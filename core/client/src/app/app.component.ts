import { Component } from '@angular/core';
import { LangService } from './shared/services/lang.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';

  constructor(langService: LangService) {
    langService.init();
  }
}
