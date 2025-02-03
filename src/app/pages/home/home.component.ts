import { Component } from '@angular/core';
import {BalanceComponent} from '../../components/balance/balance.component';
import {TransactionFormComponent} from '../../components/transaction-form/transaction-form.component';
import {TransactionListComponent} from '../../components/transaction-list/transaction-list.component';
import {MatToolbar} from '@angular/material/toolbar';
import {MatCard} from '@angular/material/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BalanceComponent,
    TransactionFormComponent,
    TransactionListComponent,
    MatToolbar,
    MatCard
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
