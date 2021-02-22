import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

export interface Weapon {
  name: string;
  image: string;
  price: number;
  addedToCart: boolean;
  desc: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'weapon';
  selected: Weapon[] = [];
  totalPrice: number = 0;
  price: number = 0;
  weapons: Weapon[] = [
    {
      name: 'Kokorowatari',
      image: 'assets/img/Kokorowatari.jpg',
      price: 444,
      addedToCart: false,
      desc: `
        Demon sword that harms and effectively kills oddities.
        The sword belonged to a powerful vampire named Kiss-Shot Acerola-Orion Heart-Under-Blade.`,
    },
    {
      name: 'Star Platinum',
      image: 'assets/img/StarPlatinum.jpg',
      price: 555,
      addedToCart: false,
      desc: `Star Platinum is the Stand of Kujo Jotaro.
      It has long, flowing hair, and resembling a tall, well-built man.
      It is silent, except when it throws punches, during which it cries "ORAORAORA" loudly and repeatedly.`,
    },
    {
      name: 'The World',
      price: 500,
      addedToCart: false,
      image: 'assets/img/The_World.jpg',
      desc: `The World is the Stand of DIO. The World shows no particular personality,
      although it occasionally smiles as it pummels others,
      hinting that it may be a rather cruel entity that takes pleasure in causing pain.
      Its Stand cry, seemingly communicated by DIO, is Muda Muda Muda!`,
    },
    {
      name: '3D Maneuver Gear',
      price: 200,
      addedToCart: false,
      image: 'assets/img/3D_Maneuver_Gear.jpg',
      desc: `The vertical maneuvering equipment is a set of equipment developed by humans allowing for great mobility.
      The equipment enables the user to fight in a 3D space as opposed to a 2D one.
      The equipment itself takes the form of a body harness that encompasses much of the body below the neck.`,
    },
    {
      name: 'Excalibur',
      price: 300,
      addedToCart: false,
      image: 'assets/img/Excalibur.jpg',
      desc: `Excalibur: Sword of Promised Victory is the strongest and most majestic holy sword that symbolizes King Arthur.
      As that which can be called the physical actualization of her ideals and the symbol of her heroism,
      it is her greatest and most powerful Noble Phantasm.`,
    },
    {
      name: 'Dragon Slayer',
      price: 450,
      addedToCart: false,
      image: 'assets/img/Dragon_Slayer.jpg',
      desc: `It was too big to be called a sword. Massive, thick, heavy, and far too rough.
      Indeed, it was a heap of raw iron.
      The Dragon Slayer is the massive sword Guts has wielded as his signature weapon since surviving the Eclipse.`,
    },
  ];

  constructor() {}

  onSelected(id: number) {
    this.weapons[id]['addedToCart'] = true;
    let select = this.weapons[id];
    this.selected.push(select);
    this.price += select.price;
  }

  onDiscard(id: number) {
    let select = this.weapons[id];
    this.weapons[id]['addedToCart'] = false;
    // this.selected.splice(0, 1);
    this.price -= select.price;
  }

  onBuy() {
    if (this.price > 1000) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You dont have enough gold Bro!',
        footer: '',
      });
    } else if (this.price == 0) {
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'Please buy something Bro!',
        footer: '',
      });
    } else {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Transaction Success Brooo!',
        showConfirmButton: false,
        timer: 2000,
      });
    }
  }
}
