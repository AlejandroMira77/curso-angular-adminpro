import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graph1Component } from './graph1/graph1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';
import { UsersComponent } from './maintenances/users/users.component';
import { MedicosComponent } from './maintenances/medicos/medicos.component';
import { HospitalsComponent } from './maintenances/hospitals/hospitals.component';
import { MedicoComponent } from './maintenances/medicos/medico.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
            { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
            { path: 'progress', component: ProgressComponent, data: { title: 'ProgressBar' } },
            { path: 'graph1', component: Graph1Component, data: { title: 'Graph1' } },
            { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Account Settings' } },
            { path: 'promises', component: PromisesComponent, data: { title: 'Promises' } },
            { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJs' } },
            { path: 'perfil', component: PerfilComponent, data: { title: 'Mi Perfil' } },
            // Mantenimientos
            { path: 'users', component: UsersComponent, data: { title: 'Usuarios' } },
            { path: 'medicos', component: MedicosComponent, data: { title: 'Medicos' } },
            { path: 'medico/:id', component: MedicoComponent, data: { title: 'Medico' } },
            { path: 'hospitals', component: HospitalsComponent, data: { title: 'Hospitales' } },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
