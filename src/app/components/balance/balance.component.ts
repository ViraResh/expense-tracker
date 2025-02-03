import { Component, inject, computed } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import {CurrencyPipe} from '@angular/common';
import {MatCard, MatCardContent, MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-balance',
  standalone: true,
  imports: [
    CurrencyPipe,
    MatCard,
    MatCardContent,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './balance.component.html',
})
export class BalanceComponent {
  private transactionService = inject(TransactionService);
  balance$ = computed(() =>
    this.transactionService.transactions$().reduce(
      (acc, t) => acc + (t.type === 'income' ? t.amount : -t.amount),
      0
    )
  );
}
