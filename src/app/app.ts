import { Component, OnInit} from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Expense {
  id: number;
  category: string;
  amount: number;
  date: Date;
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule,CurrencyPipe,DatePipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  expenses: Expense[] = [
    { id: 1, category: 'Food', amount: 500, date: new Date('2023-10-26') },
    { id: 2, category: 'Travel', amount: 1200, date: new Date('2023-10-25') },
    { id: 3, category: 'Movie', amount: 350, date: new Date('2023-10-26') },
    { id: 4, category: 'Food', amount: 200, date: new Date('2023-10-24') },
    { id: 5, category: 'Utilities', amount: 750, date: new Date('2023-10-23') }
  ];

  selectedCategory: string = '';
  categories: string[] = [];

  ngOnInit() {
    this.categories = [...new Set(this.expenses.map(e => e.category))];
  }

  // BUG: This getter is not reactive to `selectedCategory` changes.
  get filteredExpenses(): Expense[] {
    if (!this.selectedCategory) {
      return this.expenses;
    }
    return this.expenses.filter(expense => expense.category === this.selectedCategory);
  }

  // BUG: This method calculates total based on *all* expenses, not filtered ones.
  calculateTotal(): number {
    if (!this.selectedCategory) {
      return this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
    }
    return this.filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  }
}

