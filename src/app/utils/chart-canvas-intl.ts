import { Inject, Injectable, LOCALE_ID } from '@angular/core';

@Injectable()
export class ChartCanvasI18nService {

  SUCCESS_LABEL: string;
  FAILED_LABEL: string;
  PENDING_LABEL: string;

  constructor(@Inject(LOCALE_ID) locale: string) {
    this.adjustLanguage(locale);
  }

  private adjustLanguage(locale: string = 'de') {

    switch (locale.toLowerCase()) {
      case 'en':
        this.SUCCESS_LABEL = 'successfull';
        this.FAILED_LABEL = 'defect';
        this.PENDING_LABEL = 'pending';
        break;
      default:
        this.SUCCESS_LABEL = 'erfolgreiche Prüfung(en)';
        this.FAILED_LABEL = 'fehlgeschlagene Prüfung(en)';
        this.PENDING_LABEL = 'ausstehend';
        break;
    }

  }
}
