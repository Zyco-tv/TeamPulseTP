import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Team } from './team';

@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent implements OnInit {
    teamSearchForm: FormGroup;
    team: Team;

    constructor(private http: HttpClient, private fb: FormBuilder) { }

    ngOnInit() {     
      this.initForm();
    
    }

    initForm(){
      this.teamSearchForm = this.fb.group({
        team: ['', [Validators.required, Validators.maxLength(16), Validators.pattern('^[\\S]*$')]]
      });
    }

    onSubmitForm(){
      console.log('submit', this.teamSearchForm.controls.team.value);
        this.http.get<any>(`http://localhost:4200/api/teams/code/${this.teamSearchForm.controls.team.value}`, {
          headers: new HttpHeaders({ 
            'Accept':'application/json',
            'Access-Control-Allow-Origin':'*'
          })
        }).subscribe(data => {
          console.log('data', data);
          this.team = new Team();
          this.team.playersCount = data.players_count;
          this.team.playersName = data.name;
          this.team.playersUrl = data.team_picture.url;
          console.log('team', this.team);  
        })  
    }
}