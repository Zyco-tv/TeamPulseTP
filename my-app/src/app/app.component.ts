import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent implements OnInit {
    totalAngularPackages;
    teamSearchForm: FormGroup;

    constructor(private http: HttpClient, private fb: FormBuilder) { }

    ngOnInit() {     
      this.initForm();
    //   this.http.get<any>('https://api.npms.io/v2/search?q=scope:angular').subscribe(data => {
    //     this.totalAngularPackages = data.total;
    // })  
    }

    initForm(){
      this.teamSearchForm = this.fb.group({
        team: ['', [Validators.required, Validators.maxLength(16), Validators.pattern('^[\\S]*$')]]
      });
    }

    onSubmitForm(){
      console.log('submit', this.teamSearchForm);

    }
}