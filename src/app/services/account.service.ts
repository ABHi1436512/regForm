import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, CountryResponse } from '../_models/user-info';
import { COUNTRIES_FAKE_API, FORM_SUBMIT_API } from '../constant/urls';


@Injectable({
  providedIn: 'root'
})

export class AccountService {
  
  constructor(
    private http: HttpClient
  ) { }

  public GetCountries(): Observable<CountryResponse> {
    //fetch country list
    return this.http.get<any>(COUNTRIES_FAKE_API)
  }

  public SubmitForm(formData: any): Observable<ApiResponse> {
    // mimicked a post api
    return this.http.post<any>(FORM_SUBMIT_API, formData)
  }
}
