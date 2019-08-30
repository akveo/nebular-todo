import { Injectable } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

export type Theme = 'default' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  currentTheme: Theme = 'default';

  constructor(private themeService: NbThemeService) {
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'default' ? 'dark' : 'default';
    this.themeService.changeTheme(this.currentTheme);
  }
}
