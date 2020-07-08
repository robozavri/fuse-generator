import { CookieService } from 'ngx-cookie-service';
import { TranslateService } from '@ngx-translate/core';
import { langs } from '../constants/lang';
import { ge, en } from '../constants/translate';
import { Injectable } from '@angular/core';

const LOCAL_LANG_KEY = 'local-lang';

@Injectable()
export class LangService {

  constructor(private cookieService: CookieService, private translateService: TranslateService) { }

  init() {
    const lang = this.getCurrent() || langs.EN;
    this.translateService.setTranslation(langs.EN, en);
    this.translateService.setTranslation(langs.GE, ge);
    this.translateService.use(lang);
  }

  getCurrent() {
    return this.cookieService.get(LOCAL_LANG_KEY) || 'en';
  }

  use(lang) {
    this.translateService.use(lang);
    this.cookieService.set(LOCAL_LANG_KEY, lang);
  }

}