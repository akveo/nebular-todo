import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'td-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

  currentTheme = 'default';

  constructor(private themeService: NbThemeService) {
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'default' ? 'dark' : 'default';
    this.themeService.changeTheme(this.currentTheme);
  }
}
