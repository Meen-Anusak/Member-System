import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AccountService } from 'src/app/shared/services/account.service';
import { AuthenService } from 'src/app/shared/services/authen.service';
import { IUser, ISearch, SearchUser, IUSERS } from 'src/app/model/user-model';
import { PageChangedEvent } from 'ngx-bootstrap/pagination/public_api';
import { NotifyAlertService } from 'src/app/shared/services/notify-alert.service';
import { Router } from '@angular/router';
import { AppURL } from 'src/app/app.routing';
import { AuthenURL } from '../../authen.routing';
declare let swal;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  Users : IUSERS;
  userLogin : IUser;
  role = {
    admin:'admin',
    instructor:'instructor',
    student:'student',
  }


  searchText : string = '';
  searchType : ISearch ;
  searchTypeItem = [
    {key:'firstname',value:'Firstname'},
    {key:'lastname',value:'Lastname'},
    {key:'email',value:'Email'},
    {key:'role',value:'Role'},
  ]

  startPage:number = 1;
  limitPage:number = 15;


  constructor(
    private account : AccountService,
    private authen : AuthenService,
    private changeDect : ChangeDetectorRef,
    private alert : NotifyAlertService,
    private router : Router
  ) { this.searchType = this.searchTypeItem[0] }

  ngOnInit(): void {
    this.getUsers({
      startPage : this.startPage,
      limitPage : this.limitPage
    });
    this.getUserlogin();
  }


  private getUsers(option?:SearchUser){
      this.account.getUser(this.authen.getAccessToeken(),option)
        .subscribe(result =>{
          this.Users = result
        })
  }

  onSearch(){
    this.getUsers({
      searchText : this.searchText,
      searchType : this.searchType.key,
      startPage : this.startPage,
      limitPage : this.limitPage
    })
    this.changeDect.detectChanges();
  }

  onPageChange(page:PageChangedEvent){
    this.getUsers({
      searchText : this.searchText,
      searchType : this.searchType.key,
      startPage : page.page,
      limitPage : page.itemsPerPage
    })
   }

   onDeleteUser(id){
    swal({
      title: "ต้องการลบข้อมูลผู้ใช้งาน ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this.account.deleteUser(id).subscribe(result=>{
          console.log(result)
        },error =>{
          this.alert.notify(error.message,'danger')
        }
        )
        swal("ลบข้อมูลเรียบร้อย", {
          icon: "success",

        });
        this.getUsers({
          searchText : this.searchText,
          searchType : this.searchType.key,
          startPage : this.startPage,
          limitPage : this.limitPage
        })
      } else {
        swal("ลบข้อมูลไม่สำเร็จ");
      }
    });
   }

   onEditUser(id:any){
    this.router.navigate([
      AppURL.Authen,
      AuthenURL.AddUser,
      {id:id}
    ])
   }


   getUserlogin(){
     this.account.getUserLogin(this.authen.getAccessToeken())
      .subscribe(res=>{
        this.userLogin = res
      })
   }

}
