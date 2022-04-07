import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TarjetaService {


    public url:string;

  constructor(private  _http: HttpClient) {
    this.url="https://gnuino.com.ar/~mauri/www/apipivobar/";
    } 
    listarclientes(): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    

  return this._http.get(this.url+"listarclientes.php", {headers: headers});
  }
  verificar(dni:any): Observable<any>{
  let headers = new HttpHeaders().set('Content-Type', 'application/json');
  var params={"dni":dni};
  return this._http.post(this.url+"verificar.php",params, {headers: headers});
    
  }
  guardarcliente(nombre:any,dni:any,numero:any): Observable<any>{
  let headers = new HttpHeaders().set('Content-Type', 'application/json');
  var params={"nombre":nombre,"numero":numero,"dni":dni};
  return this._http.post(this.url+"guardarcliente.php",params, {headers: headers});
    
  }
}