import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';
import { nanoid } from 'nanoid';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable, startWith, map } from 'rxjs';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatButton} from '@angular/material/button';
import {AsyncPipe, NgForOf} from '@angular/common';
import {MatSelect} from '@angular/material/select';
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatButton,
    NgForOf,
    AsyncPipe,
    MatSelect
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './transaction-form.component.html'
})
export class TransactionFormComponent {
  private fb = inject(FormBuilder);
  private transactionService = inject(TransactionService);

  categories: string[] = ['Groceries', 'Salary', 'Entertainment', 'Transport', 'Other'];
  filteredCategories!: Observable<string[]>;

  form = this.fb.group({
    name: ['', Validators.required],
    amount: [0, [Validators.required, Validators.min(0.01)]],
    type: ['expense', Validators.required],
    category: ['', Validators.required],
    date: [new Date()]
  });

  constructor() {
    this.filteredCategories = this.form.get('category')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.categories.filter(category =>
      category.toLowerCase().includes(filterValue)
    );
  }

  onCategorySelect(event: any) {
    this.form.patchValue({ category: event.option.value });
  }

  addTransaction() {
    if (this.form.valid) {
      const transaction: Transaction = { id: nanoid(), ...this.form.value } as Transaction;
      this.transactionService.addTransaction(transaction);
      this.form.reset({ type: 'expense', date: new Date() });
    }
  }
}
