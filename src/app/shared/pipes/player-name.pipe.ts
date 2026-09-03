import { Pipe, PipeTransform } from '@angular/core';
import { Player } from '../../core/models/player.model';

@Pipe({ name: 'playerName' })
export class PlayerNamePipe implements PipeTransform {
  transform(player: Player): string {
    return `${player.firstName} ${player.lastName}`;
  }
}
