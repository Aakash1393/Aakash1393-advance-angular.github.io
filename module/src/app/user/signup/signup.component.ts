import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { AppService } from './../../app.service';
import {Router} from '@angular/router';
// import {ToastrModule} from 'ngx-toastr';
import {ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public firstName:any;
  public lastName:any;
  public mobile:any;
  public email:any;
  public password:any;
  public apiKey:any;


  constructor(
    public appService:AppService,
    public router:Router,
    private toastrService:ToastrService,
    vcr:ViewContainerRef) { }

  ngOnInit() {
  }

    public goToSignIn: any = () => { 

      this.router.navigate(['/']);
    };

    public signupFunction: any=()=>{

      if(this.firstName){
        this.toastrService.warning('Enter First Name');
      }

      else if(!this.lastName)
      {
        this.toastrService.warning('Enter Last Name');
      }

      else if(!this.mobile)
      {
        this.toastrService.warning('Enter Mobile');
      }

      else if(!this.email)
      {
        this.toastrService.warning('Enter Email');
      }

      else if(!this.password)
      {
        this.toastrService.warning('Enter Password');
      }

      else if(!this.apiKey)
      {
        this.toastrService.warning('Enter apiKey');
      }

      else{
        let data={
          firstName:this.firstName,
          lastName:this.lastName,
          mobile:this.mobile,
          email:this.email,
          password:this.password,
          apiKey:this.apiKey
        }

        console.log(data);
        this.appService.signupFunction(data).subscribe((apiResponse)=>{
          console.log(apiResponse);
          if(apiResponse.status === 200)
          {
            this.toastrService.success('Signup Successful');
            setTimeout(() => {
             this.goToSignIn();   
            },2000);
          }else{
            this.toastrService.error(apiResponse.message);
          }
        },(err) =>{
          this.toastrService.error('some error occured');
        });
      }
    }

}
