import { Component, ViewChild, ViewEncapsulation,OnInit  } from '@angular/core';
import {QrScannerComponent} from 'angular2-qrscanner';
import { Tarjeta } from './tarjeta';
import { TarjetaService } from './tarjeta.service';
import html2canvas from "html2canvas";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  title = 'angular-qrscanner';
  resultado:string;
  objtarjeta:Tarjeta;
  creado:number;
  data:any;
  img:any;
  escaneado:any;
  imagenCreada:boolean;
  clientes:any;

  constructor(private servicio:TarjetaService){
    this.resultado="";
    this.creado=0;
this.data=null;
    this.objtarjeta=new Tarjeta(0,"",0,0,0,null)
    this.imagenCreada=false;
    this.img="";
  }
  @ViewChild(QrScannerComponent, { static: false })
  qrScannerComponent!: QrScannerComponent;

  ngOnInit() {
      this.servicio.listarclientes().subscribe(
          result=>{

            localStorage.setItem('clientes', JSON.stringify(result.clientes));
            this.clientes=  localStorage.getItem('clientes')
            this.clientes=JSON.parse(this.clientes)
            alert("clientes obtenidos")
          },
          error=>{
            alert("clientes no obtenidos")
            console.log(error)

          }
      )
    }

    escanear(): void {
      
      this.qrScannerComponent.getMediaDevices().then(devices => {
        const videoDevices: MediaDeviceInfo[] = [];
        for (const device of devices) {
            if (device.kind.toString() === 'videoinput') {
                videoDevices.push(device);
            }
        }
        if (videoDevices.length > 0){
            let choosenDev;
            for (const dev of videoDevices){
                if (dev.label.includes('front')){
                    choosenDev = dev;
                    break;
                }
            }
            if (choosenDev) {
                this.qrScannerComponent.chooseCamera.next(choosenDev);
            } else {
                this.qrScannerComponent.chooseCamera.next(videoDevices[0]);
            }
        }
    });

    this.qrScannerComponent.capturedQr.subscribe(result => {
        let comparar:number;
        comparar=Number(result)
        let found = this.clientes.find((element: { dni: number; }) => element.dni == comparar);
        console.log("sumando puntos a " )
        console.log(found)
        this.servicio.verificar(found.dni).subscribe(
            result=>{
                console.log(result)
                this.servicio.listarclientes().subscribe(
                    result=>{
          
                      localStorage.setItem('clientes', JSON.stringify(result.clientes));
                      this.clientes=  localStorage.getItem('clientes')
                      this.clientes=JSON.parse(this.clientes)
                    alert("PUNTOS CARGADOS CORRECTAMENTE")
          
                    },
                    error=>{
          
                    }
                )
            },
            error=>{
                console.log(error)

            }
        )

    });
    }
    guardarcliente(formulario :any){
        this.servicio.guardarcliente(this.objtarjeta.nombre,this.objtarjeta.dni,this.objtarjeta.numero).subscribe(

            result=>{
                console.log(result)
            
console.log(this.clientes)
                this.creado=1
                this.objtarjeta.numero= String(this.objtarjeta.dni)
                this.data=String(this.objtarjeta.dni)
            },
            error=>{
                console.log(error)
                formulario.reset()
            }
        )

    }
    crearImagen() {
        let Url: HTMLInputElement = document.getElementById("contenido") as HTMLInputElement;
        html2canvas(Url).then(canvas => {
            this.img = canvas.toDataURL();      
        });    this.imagenCreada = true;
        console.log(this.img)
      
      }
}

