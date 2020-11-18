import * as _ from 'lodash';

export class MetaField {

  constructor() {
  }

  builder(key) {
    return {
      modalImportsArea: this.generateMeta('modalImports'),
      modalComponentClassPropertiesArea: this.generateMeta('modalClassProperties'),
      modalComponentClassViewChildArea: this.generateMeta('modalViewChild'),
      modalComponentClassNgAfterViewInitArrayArea: this.generateMeta('modalNgAfterViewInit'),
      modalComponentClassFormValuesMergeArea: this.generateMeta('modalMerge'),
      modalHtmlTabArea: this.generateMeta('modalHtml'),
      modalComponentClassPropertiesArea: this.generateMeta('modalClassProperties'),
      modalComponentClassOnInitBodyArea: this.generateMeta('modalOnInitBody'),

      editPageComponentImportsArea: this.generateMeta('editPageImports'),
      editPageComponentClassViewChildArea: this.generateMeta('editPageViewChild'),
      editPageComponentClassNgAfterViewInitArrayArea: this.generateMeta('editPageNgAfterViewInit'),
      editPageComponentClassFormValuesMergeArea: this.generateMeta('editPageMerge'),
      editPageHtmlTabArea: this.generateMeta('editPageHtml'),
      editPageComponentClassPropertiesArea: this.generateMeta('editPageClassProperties'),
      editPageComponentClassOnInitBodyArea: this.generateMeta('editPageOnInitBody'),
      editPageComponentClassPageLoadDataMeta: this.generateMeta('editPageLoadDataMeta'),

      listHtmlTabArea: this.generateMeta('listComponentMetaHtml'),
    }
  }

  generateMeta(property) {
    let obj = {
      modalImports: `
  import { MetaFormComponent } from '../../../../../../../shared/components/meta-form/meta-form.component';`,
      modalViewChild: `@ViewChild('MetaForm', { static: false }) MetaComponent: MetaFormComponent;`,
      modalNgAfterViewInit: `this.MetaComponent,`,
      modalMerge: `this.MetaComponent.getFormValue(),`,
      modalHtml: `
            <mat-tab label="Meta">
              <div class="page_body">
                <app-meta-form [meta]="meta" [showSubmit]="showSubmit" #MetaForm></app-meta-form>
              </div>
            </mat-tab>
  `,
      modalClassProperties: `
    meta: any;`,
      modalOnInitBody: `
      this.meta = {};`,
      editPageImports: `
  import { MetaFormComponent } from '../../../../shared/components/meta-form/meta-form.component';`,
      editPageViewChild: `@ViewChild('MetaForm', { static: false }) MetaComponent: MetaFormComponent;`,
      editPageNgAfterViewInit: `this.MetaComponent,`,
      editPageMerge: `this.MetaComponent.getFormValue(),`,
      editPageHtml: `
            <mat-tab label="Meta">
              <div class="page_body">
                <app-meta-form [meta]="meta" [showSubmit]="showSubmit" #MetaForm></app-meta-form>
              </div>
            </mat-tab>
  `,
      editPageClassProperties: `
    meta: any;`,
      editPageOnInitBody: `
      this.meta = {};`, 
      editPageLoadDataMeta: `this.meta = this.mainData.hasOwnProperty('meta') ? this.mainData.meta : {};`, 
      listComponentMetaHtml: `
          <mat-tab label="Meta">
            <app-meta-form [meta]="item.meta" (submitMeta)="submitMeta($event, item._id)"></app-meta-form>
          </mat-tab>`, 
      };
    return obj[property];
  }
}