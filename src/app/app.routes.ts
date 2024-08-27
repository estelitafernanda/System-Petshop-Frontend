import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { ProdutolistComponent } from './components/produto/produtolist/produtolist.component';
import { ProdutodetailsComponent } from './components/produto/produtodetails/produtodetails.component';
import { AnimallistComponent } from './components/animal/animallist/animallist.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';

export const routes: Routes = [
    {path: "", redirectTo: "login", pathMatch: "full"},
    {path: "login", component: LoginComponent},
    { path: 'register', component: UserRegisterComponent },
    {path: "admin", component: PrincipalComponent, children: [
        {path: "produto", component: ProdutolistComponent },
        {path: "produto/new", component: ProdutodetailsComponent},
        {path: "produto/edit/:id", component: ProdutodetailsComponent},
        {path: "animal", component: AnimallistComponent},
    ]}
];
