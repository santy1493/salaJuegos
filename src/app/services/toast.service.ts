import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toastr: ToastrService
  ) { }

  showError(mensaje: string) {
    this.toastr.error(mensaje);
  }

  showSuccess(mensaje: string) {
    this.toastr.success(mensaje);
  }
}