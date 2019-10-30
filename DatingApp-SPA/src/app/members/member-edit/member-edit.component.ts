import { AuthService } from './../../_services/auth.service';
import { AlertifyService } from './../../_services/alertify.service';
import { User } from './../../_models/user';
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm', { static: true }) editForm: NgForm;
  user: User;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  // tslint:disable-next-line: max-line-length
  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
  }

  updateUser() {
    this.userService
      .updateUser(this.authService.decodedToken.nameid, this.user)
      .subscribe(
        next => {
          this.alertify.success('Profile edited successfully');
          this.editForm.reset(this.user);
        },
        error => {
          this.alertify.error(error);
        }
      );
  }
}
