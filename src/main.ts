import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HttpClientModule } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: HttpClientModule, useClass: HttpClientModule }
  ]
})
.catch(err => console.error(err));