import {Component, inject} from '@angular/core';
import {TransactionService} from '../../services/transaction.service';
import {CommonModule, CurrencyPipe, DatePipe, NgFor, NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {Transaction} from '../../models/transaction.model';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule, NgFor, CurrencyPipe, MatIcon, MatIconButton, DatePipe],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss'
})
export class TransactionListComponent {
  protected transactionService = inject(TransactionService);
  transactions$ = this.transactionService.transactions$;
  categoryIcons: { [key: string]: string } = {
    'groceries': 'local_grocery_store',
    'salary': 'account_balance_wallet',
    'entertainment': 'theaters',
    'transport': 'directions_car',
    'other': 'category'
  };
  getAmountColor(transaction: Transaction): string {
    if (transaction.type === 'expense') {
      return 'red';
    } else if (transaction.type === 'income') {
      return 'green';
    }
    return 'black';
  }
}
