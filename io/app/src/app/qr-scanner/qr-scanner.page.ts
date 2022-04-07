import { Component, forwardRef, Inject } from '@angular/core';
import { Events, IonicPage, NavController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { NativeService } from '../../../providers/scan/NativeService';
 
/**
 * Escanear código QR 
 * @example
 this.navCtrl.push('QrscannerPage').then(() => {
        this.events.subscribe('qrscanner:result', text => {
                     alerta ('resultado del análisis:' + texto);
        });
      });
 */
@IonicPage()
@Component({
  selector: 'page-qrscanner',
  templateUrl: 'qrscanner.html',
})
 
export class QrscannerPage {
     light: boolean = false; // Determinar el flash
     isShow: boolean = false; // Controla el fondo de la pantalla para evitar atascos de páginas
 
  constructor(
    private navCtrl: NavController,
    private nativeService: NativeService,
    private events: Events,
         // ** Si no presta atención al problema de la versión y el método de introducción es incorrecto, las siguientes dependencias reportarán un error:
    // Error: Can't resolve all parameters for QrscannerPage: ([object Object], [object Object], [object Object], ?).
    private qrScanner: QRScanner,
  ) { }
  showScanner() {
    this.navCtrl.push('QrscannerPage')
  }
  ionViewDidLoad() {
         if (! this.nativeService.isMobile ()) {// Determinar el dispositivo actual
             alert ('Utilice una máquina real para depurar');
      return;
    }
    this.qrScanner.prepare().then((status: QRScannerStatus) => {
             if (status.authorized) {// Determine si hay permiso de cámara
        let scanSub = this.qrScanner.scan().subscribe((text: string) => {
          this.events.publish('qrscanner:result', text);
          scanSub.unsubscribe();
          this.navCtrl.pop();
        });
                 // Enciende la camara
        this.qrScanner.show();
      } else if (status.denied) {
                 alert ('Sin permiso de cámara, vaya a la configuración para habilitar');
      } else {
                 alert ('Sin permiso de cámara, vaya a la configuración para habilitar');
      }
         }). catch ((e: any) => console.log ('Error al llamar al complemento de escaneo de códigos QR', e));
  }
 
  ionViewWillEnter() {
         // Establecer el fondo de la página de escaneo para que sea transparente
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView'); // tslint:disable-line
         this.isShow = true; // mostrar el fondo
  }
 
  ionViewWillLeave() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView'); // tslint:disable-line
         this.qrScanner.hide (); // Necesita apagar el escaneo, de lo contrario la cámara está siempre encendida
         this.qrScanner.destroy (); // cerrar
         this.events.unsubscribe ('qrscanner: result'); // Salga de la página para cancelar todas las suscripciones, debe suscribirse antes de ingresar a la página
  }
 
     // cambiar linterna
  toggleLight() {
    this.light ? this.qrScanner.disableLight() : this.qrScanner.enableLight();
    this.light = !this.light;
  }
 
     // cancelar escaneo
  close() {
    this.navCtrl.pop();
  }
}