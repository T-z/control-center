import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MatCardModule, MatIconModule, MatInputModule, MatButtonModule, MatDividerModule, MatFormFieldModule, MatProgressBarModule, MatSnackBarModule } from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ResetComponent } from "./reset.component";
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
    MatSnackBarModule,
    MatFormFieldModule,
    MatProgressBarModule,
    RouterModule.forChild([{
      path: '',
      component: ResetComponent
    }])
  ],
  declarations: [
    ResetComponent
  ]
})
export class ResetModule {

}
