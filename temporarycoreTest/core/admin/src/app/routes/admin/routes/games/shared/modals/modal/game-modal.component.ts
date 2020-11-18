import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as _ from 'lodash';
  import { SubjectApiService } from 'app/shared/http/subject-api.service';
  
  import { MetaFormComponent } from '../../../../../../../shared/components/meta-form/meta-form.component';
import { FormComponent } from 'app/shared/components/form.component';
import { FormComponent as _FormComponent } from '../../form/form.component';
import { Game } from 'app/shared/models/game';

@Component({
  selector: 'app-game-modal',
  templateUrl: './game-modal.component.html',
  styleUrls: ['./game-modal.component.scss']
})
export class GameModalComponent implements OnInit, AfterViewInit {
  showFormWarning = false;
  submitted = false;
  showSubmit = false;
    
    SubjectReferenseTypes: any;
    
    meta: any;

  @ViewChild('gameForm', { static: false }) gameFormComponent: _FormComponent;
  @ViewChild('MetaForm', { static: false }) MetaComponent: MetaFormComponent;

  gameType: Game;

  constructor(
      private subjectApiService: SubjectApiService,
        
    private dialogRef: MatDialogRef<GameModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Game
  ) { }

  formComponents: FormComponent[];

  ngOnInit(): void {
    
      this.subjectApiService.getByQuery({all: true}).subscribe((data: any) => {
          this.SubjectReferenseTypes = data.items;
      });
    
      this.meta = {};
  }

  ngAfterViewInit(): void {
    this.formComponents = [
      this.gameFormComponent,
      this.MetaComponent,
    ];
  }

  formsAreValid(): any {
    return this.formComponents.filter(component => component)
      .every((formComponent: FormComponent) => formComponent.formIsValid());
  }

  onFinish(): void {
    this.showFormWarning = false;
    this.submitted = true;
    if (this.formsAreValid()) {
      this.dialogRef.close(this.getGameData());
    } else {
      this.showFormWarning = true;
    }
  }

  getGameData(): any {
    const data = _.cloneDeep(_.merge(
      this.gameType,
      this.gameFormComponent.getFormValue(),
      this.MetaComponent.getFormValue(),
    ));
    return data;
  }

} 
