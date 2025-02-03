import { Injectable, signal } from '@angular/core';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private transactions = signal<Transaction[]>(this.loadFromStorage());

  get transactions$() {
    return this.transactions.asReadonly();
  }

  addTransaction(transaction: Transaction) {
    this.transactions.update(transactions => [...transactions, transaction]);
    this.saveToStorage();
  }

  removeTransaction(id: string) {
    this.transactions.update(transactions => transactions.filter(t => t.id !== id));
    this.saveToStorage();
  }

  private saveToStorage() {
    localStorage.setItem('transactions', JSON.stringify(this.transactions()));
  }

  private loadFromStorage(): Transaction[] {
    if (typeof window !== 'undefined' && localStorage) {
      return JSON.parse(localStorage.getItem('transactions') || '[]');
    }
    return [];
  }

}
