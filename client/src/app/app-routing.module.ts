import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ListsComponent } from './Components/lists/lists.component';
import { MemberInfoComponent } from './Components/members/member-info/member-info.component';
import { MemberListComponent } from './Components/members/member-list/member-list.component';
import { MessagesComponent } from './Components/messages/messages.component';
import { NotFoundComponent } from './Errorhandler/not-found/not-found.component';
import { ServerErrorComponent } from './Errorhandler/server-error/server-error.component';
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
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  {path: '**', component: NotFoundComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
