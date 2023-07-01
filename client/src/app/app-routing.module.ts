import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ListsComponent } from './Components/lists/lists.component';
import { MemberInfoComponent } from './Components/members/member-info/member-info.component';
import { MemberListComponent } from './Components/members/member-list/member-list.component';
import { MessagesComponent } from './Components/messages/messages.component';
import { TestErrorComponent } from './Errorhandler/test-error/test-error.component';
import { AuthGuard } from './_Guards/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: '', runGuardsAndResolvers: 'always', canActivate: [AuthGuard], children: [
    {path: 'matches', component: MemberListComponent},
    {path: 'matches/:id', component: MemberInfoComponent},
    {path: 'lists', component: ListsComponent},
    {path: 'messages', component: MessagesComponent},
  ]},
  {path: 'errors', component: TestErrorComponent},
  {path: '**', component: HomeComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
