import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { ApiResponse, Country, CountryResponse } from './_models/user-info';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  errorMessage: string = '';
  submitted = false;
  countries: Country[] = [];

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private accountService: AccountService
  ) { }

  ngOnInit() {
      this.form = this.formBuilder.group({
          username: ['', Validators.required],
          country: ['', Validators.required]
      });
      this.loadCountries();
  }

  loadCountries() {
    this.accountService.GetCountries()
      .pipe(take(1))
      .subscribe(
        (response: any) => {
          if (!response?.error)
            this.countries = response;
          else
            alert(`No Countries Found: ${response?.msg}`);
        },
        (error: any) => {
          alert(`Error loading countries: ${error}`);
        }
      );
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;
      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }

      this.loading = true;
      const formData = this.form?.value;
      this.accountService.SubmitForm(formData)
        .pipe(take(1))
        .subscribe(
          (response: ApiResponse) => {
            if (response?.msg){ alert(response?.msg)
              this.loading = false;
            }
            else alert('Data Not Submitted')
          },
          error => {
            alert(`Error registering user: ${error}`);
            this.errorMessage = 'Failed to register user. Please try again later.';
            this.loading = false;
          }
        );
  }
}
