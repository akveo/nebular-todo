import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Todo } from './todo';
import { todos } from './mock-todos';

export type Filter = 'all' | 'completed' | 'active';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private items$ = new BehaviorSubject<Todo[]>(todos);
  private filter$ = new BehaviorSubject<Filter>('all');

  filteredItems(): Observable<Todo[]> {
    return combineLatest([
      this.items$,
      this.filter$
    ])
      .pipe(
        map(([items, filterValue]: [Todo[], Filter]) => {
          return items.filter((item: Todo) => {
            if (filterValue === 'all') {
              return !!item;
            }

            if (filterValue === 'completed') {
              return item.completed;
            }

            return !item.completed;
          });
        }),
      );
  }

  filteredItemsNumber(): Observable<number> {
    return this.filteredItems().pipe(
      map((items: Todo[]) => {
        return items.length;
      }),
    );
  }

  setFilter(filer: Filter) {
    this.filter$.next(filer);
  }

  add(item: Todo) {
    this.items$.next([...this.items$.getValue(), item]);
  }

  updateMessage(editedItem: Todo, message: string) {
    const newItems: Todo[] = this.items$.getValue().map((item: Todo) => {
      if (item === editedItem) {
        return { ...item, message };
      }
      return item;
    });

    this.items$.next(newItems);
  }

  toggleCompleted(toggledItem: Todo, completed: boolean) {
    const newItems: Todo[] = this.items$.getValue().map((item: Todo) => {
      if (item === toggledItem && item.completed !== completed) {
        return {...item, completed};
      }
      return item;
    });

    this.items$.next(newItems);
  }

  delete(deletedItem: Todo) {
    const newItems: Todo[] = this.items$.getValue().filter((item: Todo) => {
      return item !== deletedItem;
    });

    this.items$.next(newItems);
  }
}
