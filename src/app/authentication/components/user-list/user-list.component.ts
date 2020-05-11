import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AccountService } from 'src/app/shared/services/account.service';
import { AuthenService } from 'src/app/shared/services/authen.service';
import { IUser, ISearch, SearchUser, IUSERS } from 'src/app/model/user-model';
import { PageChangedEvent } from 'ngx-bootstrap/pagination/public_api';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  Users : IUSERS
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
    private changeDect : ChangeDetectorRef
  ) { this.searchType = this.searchTypeItem[0] }

  ngOnInit(): void {
    this.getUsers({
      startPage : this.startPage,
      limitPage : this.limitPage
    })
  }
  private getUsers(option?:SearchUser){
      this.account.getUser(this.authen.getAccessToeken(),option)
        .subscribe(result =>{
          console.log(result.usertotal);

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

}
