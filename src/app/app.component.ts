import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { Observable } from 'rxjs';

import { Todo } from './todo';
import { Filter, TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

  items$: Observable<Todo[]>;
  currentTheme = 'default';

  constructor(private todoService: TodoService, private themeService: NbThemeService) {
    this.items$ = this.todoService.filteredItems();
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'default' ? 'dark' : 'default';
    this.themeService.changeTheme(this.currentTheme);
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
