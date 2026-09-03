import { Injectable, inject } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class HttpErrorService {
  private readonly toastController = inject(ToastController);

  async display(error: HttpErrorResponse): Promise<void> {
    const toast = await this.toastController.create({
      message: this.messageFor(error),
      duration: 4000,
      color: 'danger',
      position: 'bottom',
    });
    await toast.present();
  }

  private messageFor(error: HttpErrorResponse): string {
    if (error.status === 0) return 'Impossible de joindre le serveur. Vérifiez votre connexion.';
    if (error.status === 401) return 'Votre session a expiré. Veuillez vous reconnecter.';
    if (error.status === 403) return 'Vous n’êtes pas autorisé à effectuer cette action.';
    if (error.status === 404) return 'La ressource demandée est introuvable.';
    return 'Une erreur est survenue. Réessayez dans quelques instants.';
  }
}
