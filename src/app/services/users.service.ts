import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class UsersService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) { }

  async changePassword(user:string,oldPassword:string,newPassword:string):Promise<any>{
    try {
      let url = environment.URL_GESTION_IDENTIDAD + "api/usuario/cambiarContrasenia"
      let body = {
        url: environment.URL_GESTION_IDENTIDAD + "api/usuario/cambiarContrasenia",
        usuario: user,
        json: JSON.stringify({
          usuario: user,
          contraseniaAnterior: oldPassword,
          contraseniaNueva: newPassword
        })
      }
      //return await this.http.post<any>(url, body , this.httpOptions).toPromise();
      let response:any = await this.http.post<any>(url, body , this.httpOptions).toPromise();
      let cambioClave = JSON.parse(response.body.respuesta[0].json);
      console.log('Respuesta cambio:', cambioClave);
      return cambioClave;
    } catch (e:any) {
      console.error(e.error?.msgError ? 'Error:' + e.error.msgError : e.message ? 'Error:' + e.message : 'Error interno');  
    }
  }

}