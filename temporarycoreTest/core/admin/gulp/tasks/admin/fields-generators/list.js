import * as _ from 'lodash';

export class List {

  constructor({ availableLangs, listFields}) {
      this.listFields = listFields;
      this.availableLangs = availableLangs;
  }

  buildListColumns() {
      return {
          listHtmlColumnsArea: this.generateListHtmlColumns(),
          listComponentClassPropertiesArea: this.buildColumns()
      }
  }
  
  buildColumns() {
      if(!this.listFields) return '';
      let columns ='';
      Object.keys(this.listFields).map((key) => {
          columns += `'${key}', `;
      });
      return `
      displayedColumns = ['id', ${columns}'active'];`;
  }
  
  generateListHtmlColumns() {
      if(!this.listFields) return '';
      
      let template ='';
      Object.keys(this.listFields).map((key) => {
          switch( this.listFields[key] ) {
          case 'multilingualSchema': template += this.listColumnHtmlMultilingual(key);
              break;
          case 'String': template += this.listColumnHtmlString(key);
              break;
          }
      });
      return template;
  }
  
  listColumnHtmlMultilingual(key) {
      return `
          <!-- ${key} column -->
          <ng-container matColumnDef="${key}">
          <mat-header-cell *matHeaderCellDef #${key}Label> ${_.upperFirst(key)} </mat-header-cell>
          <mat-cell *matCellDef="let item">
              <p class="text-truncate">{{item.${key}?.${this.availableLangs[0]}}}</p>
          </mat-cell>
          </ng-container>
      `;
  }
  
  listColumnHtmlString(key) {
      return `
          <!-- ${key} column -->
          <ng-container matColumnDef="${key}">
          <mat-header-cell *matHeaderCellDef #${key}Label> ${_.upperFirst(key)} </mat-header-cell>
          <mat-cell *matCellDef="let item">
              <p class="text-truncate">{{item?.${key}}}</p>
          </mat-cell>
          </ng-container>
      `;
  }        
}
