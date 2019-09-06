import { MatPaginatorIntl } from '@angular/material';
import { Injectable, LOCALE_ID, Inject } from '@angular/core';

@Injectable()
export class MatPaginatorI18nService extends MatPaginatorIntl {

  private rangeSeparator: 'of' | 'von' = 'von';

  constructor(@Inject(LOCALE_ID) locale: string) {

    super();

    this.adjustLanguage(locale);

  }

  private adjustLanguage(locale: string = 'de') {

    switch (locale.toLowerCase()) {
      case 'en': {
        this.rangeSeparator = 'of';
        this.itemsPerPageLabel = 'Items per page:';
        this.nextPageLabel = 'Next page';
        this.previousPageLabel = 'Previous page';
        this.firstPageLabel = 'First page';
        this.lastPageLabel = 'Last page';
        this.getRangeLabel = this.rangeLabel;
        break;
      }
      default: {
        this.rangeSeparator = 'von';
        this.itemsPerPageLabel = 'Einträge pro Seite:';
        this.nextPageLabel = 'Nächste Seite';
        this.previousPageLabel = 'Vorherige Seite';
        this.firstPageLabel = 'Erste Seite';
        this.lastPageLabel = 'Letzte Seite';
        this.getRangeLabel = this.rangeLabel;
        break;
      }
    }

  }

  private rangeLabel(page: number, pageSize: number, length: number): string {

    if (length === 0 || pageSize === 0) {
      return `0 ${this.rangeSeparator} ${length}`;
    }

    length = Math.max(length, 0);

    const startIndex = page * pageSize;

    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;

    return `${startIndex + 1} - ${endIndex} ${this.rangeSeparator} ${length}`;

  }

}
