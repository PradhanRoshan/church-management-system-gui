import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ActiveMembersComponent } from './internal-registration/active-members/active-members.component';
import { EditMembersComponent } from './internal-registration/edit-members/edit-members.component';
import { InactiveMembersComponent } from './internal-registration/inactive-members/inactive-members.component';
import { MembersListsComponent } from './internal-registration/members-lists/members-lists.component';
import { MembersRegistrationComponent } from './internal-registration/members-registration/members-registration.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FundTypesComponent } from './tithe-offering/fund-types/fund-types.component';
import { PaymentMethodsComponent } from './tithe-offering/payment-methods/payment-methods.component';
import { TitheOfferingComponent } from './tithe-offering/tithe-offering.component';

const routes: Routes = [
  { path: '', component: MembersRegistrationComponent },
  { path: 'resistration', component: MembersRegistrationComponent },
  { path: 'active-members', component: ActiveMembersComponent },
  { path: 'inactive-members', component: InactiveMembersComponent },
  { path: 'all-members', component: MembersListsComponent },
  { path: 'edit-member/:id', component: EditMembersComponent },
  // { path: 'fund-type', component: FundTypesComponent },
  // { path: 'payment-method', component: PaymentMethodsComponent },
  { path: 'tithe-offering', component: TitheOfferingComponent },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo:'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
