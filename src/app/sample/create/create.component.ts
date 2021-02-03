import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createValidationMessages: any;

  formErrors = {
    'firstName': '',
    'lastName': '',
    'email': '',
    'password': '',
    'language': ''
  }
  cities: any = ['Florida', 'South Dakota', 'Tennessee', 'Michigan']
  langs: string[] = ["English", "French", "German"];
  myform: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  password: FormControl;
  language: FormControl;
  cityName: FormControl;
  isSubmitted: boolean = false;

  constructor(private aroute: ActivatedRoute) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
    this.aroute.data.subscribe((data) => {
      this.createValidationMessages = data.validations;
      // console.log("create sample data" + JSON.stringify(data))
      console.log("Sample Validation Messages Data *" + JSON.stringify(this.createValidationMessages))
    })
  }

  createFormControls() {
    this.firstName = new FormControl("", Validators.required);
    this.lastName = new FormControl("", Validators.required);
    this.email = new FormControl("", [
      Validators.required,
      Validators.pattern("[^ @]*@[^ @]*")
    ]);
    this.password = new FormControl("", [
      Validators.required,
      Validators.minLength(8)
    ]);
    this.language = new FormControl("", Validators.required);
    this.cityName = new FormControl("", Validators.required);
  }
  createForm() {
    this.myform = new FormGroup({
      name: new FormGroup({
        firstName: this.firstName,
        lastName: this.lastName
      }),
      email: this.email,
      password: this.password,
      language: this.language,
      cityName: this.cityName
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    console.log("Form Submitted!");
    console.log(this.myform.value);
    this.myform.reset();
  }

  changeCity(e) {
    console.log(" ** "+ e.target.value)
    this.cityName.setValue(e.target.value, {
      onlySelf: true
    })
  }
}

