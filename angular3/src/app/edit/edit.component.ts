import { ShopService } from './../shop.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Item } from '../orders.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  @Input() orderEdit: any = [];

  orderForm!: FormGroup;
  get itemsControls() {
    return (this.orderForm.get('items') as FormArray).controls;
  }
  editMode: boolean = false;
  customerName: string = '';
  email: string = '';
  items: Item[] = [];
  id: number = 0;

  category: any;

  slctchange: any = [];
  slctNamechange: any;
  isItemName: boolean = false;
  selectItemName: any[] = [];

  name: string = '';
  price: number = 0;

  constructor(private shopservis: ShopService) {}

  ngOnInit(): void {
    this.editMode = this.orderEdit.editMode == null;
    this.customerName = this.orderEdit.customerName;
    this.email = this.orderEdit.email;
    this.id = this.shopservis.id;
    this.category = this.shopservis.category;

    this.initForm();
  }

  changeSelect(e: any) {
    this.slctchange = e.target.value;
    let x = this.slctchange;
    let cpuList = this.shopservis.cpuList;
    let motherBoardList = this.shopservis.motherBoardList;
    let videoCardList = this.shopservis.videoCardList;
    let memoryList = this.shopservis.memoryList;
    this.selectItemName = []; //reset select dulu.
    // this.price = 0;
    switch (x) {
      case 'CPU':
        for (const i in cpuList) {
          const value = cpuList[i];
          this.selectItemName.push(value);
        }
        break;
      case 'Motherboard':
        for (const i in motherBoardList) {
          const value = motherBoardList[i];
          this.selectItemName.push(value);
        }
        break;
      case 'Video Card':
        for (const i in videoCardList) {
          const value = videoCardList[i];
          this.selectItemName.push(value);
        }
        break;
      case 'Memory':
        for (const i in memoryList) {
          const value = memoryList[i];
          this.selectItemName.push(value);
        }
        break;

      default:
        this.selectItemName = [];
        break;
    }
  }

  changeSelectName(e: any) {
    let data = e.target.value;
    let dataSplit = data.split('|');
    let name = dataSplit[0];
    let price = dataSplit[1];
    this.name = name;
    this.price = price;
  }

  private initForm() {
    let itemCustomerName = '';
    let itemEmail = '';
    let itemArray = new FormArray([]);
    if (this.editMode) {
      itemCustomerName = this.customerName;
      itemEmail = this.email;
    }
    for (let item of this.items) {
      itemArray.push(
        new FormGroup({
          category: new FormControl(item.category, Validators.required),
          name: new FormControl(item.name, Validators.required),
          price: new FormControl(item.price, [
            Validators.required,
            Validators.pattern(/^[1-9]+[0-9]*$/),
          ]),
        })
      );
    }

    this.orderForm = new FormGroup({
      customerName: new FormControl(itemCustomerName, Validators.required),
      email: new FormControl(itemEmail, Validators.required),
      items: itemArray,
    });
  }

  onSave() {
    console.log(this.orderForm.value);
  }

  onAddItem() {
    (<FormArray>this.orderForm.get('items')).push(
      new FormGroup({
        category: new FormControl(null, Validators.required),
        name: new FormControl(null, Validators.required),
        price: new FormControl(null, null),
      })
    );
  }

  onDeleteItem(index: number) {
    (<FormArray>this.orderForm.get('items')).removeAt(index);
  }

  clickClose() {
    this.editMode = false;
    (<FormArray>this.orderForm.get('items')).clear();
    this.orderForm.reset();
  }
}
