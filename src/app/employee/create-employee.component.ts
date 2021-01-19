import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormControlName, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';
import { CustomValidator } from '../shared/CustomValidator';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee/employee.service'
import { IEmployee } from '../employee/IEmployee';
import { ISkill } from '../employee/ISkill'

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  fullNameLength: any = 0;
  employee: IEmployee;
  pageTitle: string;

  // This object contains all the validation messages for this form
  validationMessages = {
    'fullname': {
      'required': 'Full Name is required.',
      'minlength': 'Full Name must be greater than 2 characters.',
      'maxlength': 'Full Name must be less than 10 characters.'
    },
    'email': {
      'required': 'Email is required.',
      'emailDomain': 'Email Domain must be gmail.com'
    },
    'confirmEmail': {
      'required': 'confirm mail is required'
    },
    'emailGroup': {
      'emailMisMatch': 'Email and confirm Mail not match'
    },
    'phone': {
      'required': 'Phone Number is required.'
    }
  };

  // This object will hold the messages to be displayed to the user
  // Notice, each key in this object has the same name as the
  // corresponding form control
  formErrors = {
    'fullname': '',
    'email': '',
    'confirmEmail': '',
    'emailGroup': '',
    'phone': ''
  };

  constructor(private fb: FormBuilder, private aroute: ActivatedRoute, private empservice: EmployeeService,
    private router: Router) { }

  ngOnInit(): void {
    // create ReactiveForm with formgroup and formcontrol
    // this.employeeForm = new FormGroup({
    //   fullname : new FormControl,
    //   email: new FormControl,
    //   skills: new FormGroup({
    //     skillsName: new FormControl(),
    //     experienceInYears: new FormControl(),
    //     proficiency: new FormControl()
    //   })
    // })

    // create ReactiveForm with Formbuilder service
    this.employeeForm = this.fb.group({
      fullname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      contactPreference: ['email'],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, CustomValidator.emailDomain('gmail.com')]],
        confirmEmail: ['', Validators.required],
      }, { validator: matchMail }),
      phone: [''],
      skills: this.fb.array([
        this.addskillFormGroup()
      ])
    });

    this.employeeForm.get('contactPreference').valueChanges.subscribe((data: string) => {
      //console.log("$$$$  "+data);
      this.onContactPreferenceChange(data);
    });

    this.employeeForm.get('fullname').valueChanges.subscribe(value => {
      this.fullNameLength = value.length;
      //console.log(value);
    })

    // this.employeeForm.valueChanges.subscribe(value =>{
    //   console.log(value);
    // })

    // this.employeeForm.get('skills').valueChanges.subscribe(value =>{
    //   console.log(value);
    // })

    this.employeeForm.valueChanges.subscribe(data => {
      this.logValidationErrors(this.employeeForm);
    })

    // this method is used to get id of employee from URL
    this.aroute.paramMap.subscribe(params => {
      const empId = +params.get('id');
      if (empId) {
        this.pageTitle = 'Edit Employee'
        this.getEmployee(empId);
      } else {
        this.pageTitle = 'Create Employee'
        this.employee = {
          id: null,
          fullName: '',
          contactPreference: '',
          email: '',
          phone: null,
          skills: []
        }
      }
    }

    )
  }
  getEmployee(empId: number) {
    this.empservice.getEmployeesbyID(empId).subscribe(
      (data: IEmployee) => {
        this.employee = data;
        this.editEmployee(data);
      },
      (err) => console.log(err)

    );
    // throw new Error("Method not implemented.");
  }
  editEmployee(employee: IEmployee): void {
    this.employeeForm.patchValue({
      fullname: employee.fullName,
      contactPreference: employee.contactPreference,
      emailGroup: {
        email: employee.email,
        confirmEmail: employee.email
      },
      phone: employee.phone
    });
    this.employeeForm.setControl('skills', this.setExistingSkills(employee.skills))
    //throw new Error("Method not implemented.");
  }
  setExistingSkills(skillSets: ISkill[]): FormArray {
    const formArray = new FormArray([]);
    skillSets.forEach(s => {
      formArray.push(this.fb.group({
        skillsName: s.skillsName,
        experienceInYears: s.experienceInYears,
        proficiency: s.proficiency
      }))
    })
    return formArray;
  }

  addSkillButtonclick(): void {
    (<FormArray>this.employeeForm.get('skills')).push(this.addskillFormGroup());
    //console.log("pp" + this.employeeForm.controls);
  }

  removeSkillButtonclick(skillGroupIndex): void {
    const skillsFormArray = (<FormArray>this.employeeForm.get('skills'))
    skillsFormArray.removeAt(skillGroupIndex);
    skillsFormArray.markAsDirty();
    skillsFormArray.markAsTouched();
  }

  addskillFormGroup(): FormGroup {
    return this.fb.group({
      skillsName: ['', Validators.required],
      experienceInYears: ['', Validators.required],
      proficiency: ['', Validators.required]
    })
  }



  onSubmit(): void {
    console.log(this.employeeForm);
    this.markFormValuesToEmployeeModel();
    if (this.employee.id) {
      this.empservice.updateEmployee(this.employee).subscribe(
        () => this.router.navigate(['employees']),
        (err) => console.log(err)
      );
    } else {
      this.empservice.save(this.employee).subscribe(
        () => this.router.navigate(['employees']),
        (err) => console.log(err)
      );
    }
  }

  markFormValuesToEmployeeModel() {
    this.employee.fullName = this.employeeForm.value.fullname;
    this.employee.email = this.employeeForm.value.emailGroup.email;
    this.employee.phone = this.employeeForm.value.phone;
    this.employee.contactPreference = this.employeeForm.value.contactPreference;
    this.employee.skills = this.employeeForm.value.skills;
  }
  onContactPreferenceChange(selectedValue: string) {
    const phonecontrol = this.employeeForm.get('phone');
    console.log("***** " + selectedValue);
    if (selectedValue === 'phone') {
      phonecontrol.setValidators(Validators.required);
      phonecontrol.markAsTouched();
    } else {
      phonecontrol.clearValidators();
    }
    phonecontrol.updateValueAndValidity();
  }

  logValidationErrors(group: FormGroup = this.employeeForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      console.log("keys " + key);
      const abstractControl = group.get(key);

      this.formErrors[key] = '';
      if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty || abstractControl.value !== '')) {
        const messages = this.validationMessages[key];
        //console.log("messages "+ JSON.stringify(messages));
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            console.log("@@@  " + errorKey);
            this.formErrors[key] += messages[errorKey] + ' ';
            console.log("a " + JSON.stringify(messages[errorKey]));
          }
        }
      }

      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
        // abstractControl.disable();
      }
      // if (abstractControl instanceof FormArray) {
      //   for (const control of abstractControl.controls) {
      //     if (control instanceof FormGroup) {
      //       this.logValidationErrors(control);
      //     }
      //   }
      // }
      // else {
      //   //console.log("Key= " + key + "Value = " + abstractControl.value);
      //   //abstractControl.disable(); to disable the fields
      //   //abstractControl.markAsDirty(); to marks as dirty

      // }
    })
  }
  onLoadData() {
    // this.logValidationErrors(this.employeeForm);
    //console.log(this.formErrors);

    const formArray = new FormArray([
      new FormControl('John', Validators.required),
      new FormGroup({
        country: new FormControl('', Validators.required)
      }),
      new FormArray([])
    ]);

    console.log(formArray.length);

    for (const control of formArray.controls) {
      if (control instanceof FormControl) {
        console.log(control.value);
      }
      if (control instanceof FormGroup) {
        console.log(control.value);
      }
      if (control instanceof FormArray) {
        console.log(control.value)
      }
    }

    const formArray1 = this.fb.array([
      new FormControl('John', Validators.required),
      new FormControl('IT', Validators.required),
      new FormControl('', Validators.required)
    ])
    console.log(formArray1.value)
  }
}

function matchMail(group: AbstractControl): { [key: string]: any } | null {
  const emailMatch = group.get('email');
  const confirmEmailMatch = group.get('confirmEmail');
  if (emailMatch.value === confirmEmailMatch.value || (confirmEmailMatch.pristine && confirmEmailMatch.value === '')) {
    return null;
  } else {
    return { 'emailMisMatch': true }
  }
}

