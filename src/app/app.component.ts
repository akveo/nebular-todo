import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThemeService } from './theme.service';

@Component({
  selector: 'td-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

  constructor(private themeService: ThemeService) {
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
