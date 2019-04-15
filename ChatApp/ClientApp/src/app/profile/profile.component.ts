import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { IUser, User } from '../model/user';
import { AppService } from '../app.service';
import { HubService } from '../hub.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isExpanded = false;

  constructor(private _appService: AppService, private route: Router, private _hubService: HubService) { }

  Users: User[];
  interval: any;
  sender: string;
  msgCount: number = 0;
  msgSender: string;
  msgUnread: number = 0;
  count: number = 0;
  msgArray: string[] = [];

  ngOnInit() {

    this._appService.getUsers().subscribe((data: any) => {
      this.Users = data
      // console.log(this.Users);
    });



    this.sender = this._appService.getSenderName();

    this._appService.getMessages().subscribe((data: any) => {
      for (var i = 0; i < data.length; i++) {
        //console.log(data[i].sender);
        if (data[i].unread === true) {
          // console.log(data[i]);
          if (data[i].receiver == this.sender) {
            console.log(data[i].sender);
            let msgSender = data[i].sender;
            this.msgArray.push(data[i].sender);

          }
        }

      }
      this.messageCount();
    }

      //console.log(data);
    );

    this.interval = setInterval(() => {

      this._appService.getUsers().subscribe((data: any) => {
        this.Users = data
        // console.log(this.Users);



        // this.messageCount();
      });
    }, 10000);

    console.log(this.msgArray);
  }

  logout() {
    var a = confirm("do you want to logout???");

    if (a) {
      this._hubService.removeStatus(this.sender);
      this.route.navigate(['/logout']);
    }

  }



  chatPage(userName, id) {
    console.log("inside navigation");
    if (this.sender == userName) {
      this.route.navigate(['/profile/', this.sender]);
    } else {
      this.route.navigate(['/profile/' + this.sender + '/' + userName + '/' + id]);
    }
    var a = this.Users.find(x => x.userName === userName);
    a.count = 0;

  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  messageCount() {

    var map = this.msgArray.reduce(function (prev, cur) {
      prev[cur] = (prev[cur] || 0) + 1;
      return prev;
    }, {});

    console.log(map);

    for (let key in map) {
      //let value = map[key];
      console.log(key);
      for (var i = 0; i < this.Users.length; i++) {
        if (key == this.Users[i].userName) {
          this.Users[i].count = map[key];
          console.log(this.Users[i].userName + ":" + map[key]);
          console.log(this.Users[i]);
        }
      }
    }


  }
}
