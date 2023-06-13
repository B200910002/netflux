import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-file',
        url: '/',
      },
      {
        label: 'Quit',
        icon: 'pi pi-fw pi-power-off',
        url: '/',
      },
    ];
  }
}
