import { Injectable } from '@angular/core';
import { SuperAdmins } from "../super-admins";

@Injectable({
  providedIn: 'root'
})
export class CheckIfIsteamleaderService {

  constructor() { }

  isTeamLeadHandler() {
    const checkBox = {good: true, bad: true, glass: true, chest: true, no_working_chiller: true, working_chiller: true};
    const _user = localStorage.getItem('userId');
    const user_ = _user.split('.');
    const user__ = user_[1].split('@');
    const user = user_[0] + ' ' + user__[0];
    const superAdmin = new SuperAdmins().superAdmin.filter(data => data.toLowerCase() == _user.toLowerCase());
    return { checkBox, user, superAdmin  };
  }
}
