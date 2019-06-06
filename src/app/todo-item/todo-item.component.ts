import { Component, ElementRef, EventEmitter, HostBinding, Input, Output, ViewChild } from '@angular/core';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {

  @ViewChild('input', { static: false }) input: ElementRef;
  @HostBinding('class.completed')
  get completed() {
    return this.item.completed;
  }

  @Input() item: Todo;
  @Output() save = new EventEmitter<[Todo, string]>();
  @Output() delete = new EventEmitter<Todo>();
  @Output() toggleComplete = new EventEmitter<[Todo, boolean]>();

  onEdit(item: Todo) {
    item.inEdit = true;
    setTimeout(() => this.input.nativeElement.focus());
  }

  onSave(item: Todo, message: string) {
    item.inEdit = false;
    this.save.emit([item, message]);
  }

  onDelete(item: Todo) {
    this.delete.emit(item);
  }

  onToggleComplete(item: Todo, completed: boolean) {
    this.toggleComplete.emit([item, completed]);
  }

}
