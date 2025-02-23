import {Component, input, OnInit} from '@angular/core';
import {AbstractControl, FormControl, Validators} from '@angular/forms';
import * as messages from '../../../../assets/error-messages.json'
import {ErrorMessages} from '../../../interfaces/error-messages';
import {MatError} from '@angular/material/form-field';

@Component({
  selector: 'investment-error-handler',
  imports: [
    MatError
  ],
  templateUrl: './error-handler.component.html',
  styleUrl: './error-handler.component.scss'
})
export class ErrorHandlerComponent{
  ERROR_MESSAGES:ErrorMessages = messages;
  field = input.required<AbstractControl<unknown> | null>()
  ERRORS = [
    'required','min','max'
  ]

  message(){
    for(const error of this.ERRORS){
      if(this.field()?.hasError(error))
        return this.ERROR_MESSAGES[error]
    }
    return null;
  }

}
