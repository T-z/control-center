import { NgModule } from "@angular/core";
import { MatCardModule, MatDividerModule, MatProgressBarModule, MatIconModule, MatInputModule, MatFormFieldModule, MatButtonModule } from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./login.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatProgressBarModule,
    RouterModule.forChild([{
      path: '',
      component: LoginComponent
    }])
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule {
  
}