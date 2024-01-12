import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateTicketDto } from '@lotto-challenge/dto';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'lotto-challenge-ticket-form',
  templateUrl: './ticket-form.html',
})
export class TicketFormComponent {
  @Output() formSubmit = new EventEmitter<CreateTicketDto>();

  formBuilder = inject(FormBuilder);
  ticketForm = this.formBuilder.group({
    boxes: [12, [Validators.min(1), Validators.max(20)]],
    withSuperNumber: [true, Validators.required],
  });

  createTicket() {
    console.log(this.ticketForm);
    if (this.ticketForm.valid) {
      this.formSubmit.emit({
        boxes: this.ticketForm.value.boxes as number,
        withSuperNumber: this.ticketForm.value.withSuperNumber as boolean,
      });
      this.ticketForm.reset({
        boxes: 12,
        withSuperNumber: true,
      });
    }
  }
}
