import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from '../dialogo-confirmacion/dialogo-confirmacion.component';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-cambiar-contrasenia',
  templateUrl: './cambiar-contrasenia.component.html',
  styleUrls: ['./cambiar-contrasenia.component.css'],
})
export class CambiarContraseniaComponent implements OnInit {
  public titulo: string = "Cambio de contraseña";
  public hide:boolean = true;

  user: string="";
  oldPassword: string="";
  newPassword: string="";

  isFormValid(): boolean {
    return !!this.user && !!this.oldPassword && !!this.newPassword;
  }

  constructor(
    public dialog: MatDialog,
    public usersService: UsersService
  ) {}

  ngOnInit(): void {
  }  
  
  navigateToConfirmation(): void {
      const dialogRef = this.dialog.open(DialogoConfirmacionComponent, {
        width: "30%",
        height: '50%',
        panelClass: 'custom-dialog-container',
        autoFocus: false,
        data: { accion: "G", mensaje: " ¿Desea de continuar con la operación? " }
      });
      dialogRef.afterClosed().subscribe(async (result: any) => {
        if (result) {
          this.save()
        }else{
          this.user = "";
          this.oldPassword = "";
          this.newPassword = "";
        }
      })
  }

  async save(){
      console.log(this.user,this.oldPassword,this.newPassword)
      try {
        await this.usersService.changePassword(
          this.user,
          this.oldPassword,
          this.newPassword
        );
      } catch (e:any) {
        console.error(e.error?.msgError ? 'Error:' + e.error.msgError : e.message ? 'Error:' + e.message : 'Error interno');  
      }
    }
}