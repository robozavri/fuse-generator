import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as _ from 'lodash';
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
  

  @ViewChild('gameForm', { static: false }) gameFormComponent: _FormComponent;
  

  gameType: Game;

  constructor(
    private dialogRef: MatDialogRef<GameModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Game
  ) { }

  formComponents: FormComponent[];

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.formComponents = [
      this.gameFormComponent,
      
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
      
    ));
    return data;
  }

} 
