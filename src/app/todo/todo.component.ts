import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './todo';
import { Filter, TodoService } from './todo.service';

@Component({
  selector: 'td-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {

  items$: Observable<Todo[]>;
  itemsNumber$: Observable<number>;

  constructor(private todoService: TodoService) {
    this.items$ = this.todoService.filteredItems();
    this.itemsNumber$ = this.todoService.filteredItemsNumber();
  }

  changeFilter(filterValue: Filter) {
    this.todoService.setFilter(filterValue);
  }

  onAdd(message: string) {
    if (message.trim()) {
      this.todoService.add({ message, completed: false });
    }
  }

  onSave([item, message]: [Todo, string]) {
    this.todoService.updateMessage(item, message);
  }

  onToggleCompleted([item, completed]: [Todo, boolean]) {
    this.todoService.toggleCompleted(item, completed);
  }

  onDelete(item) {
    this.todoService.delete(item);
  }
}
