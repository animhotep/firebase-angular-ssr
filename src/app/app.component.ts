import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const PAGES = 'https://jsonplaceholder.typicode.com/posts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SSR';
  pages: {};

  constructor(private http: HttpClient) {

    this.http.get(PAGES).subscribe(
      data => this.pages = data,
      err => console.log(err)
    );
  }

}
