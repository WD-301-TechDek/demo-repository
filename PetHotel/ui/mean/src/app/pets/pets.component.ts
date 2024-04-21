import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {
  readonly APIUrl = "http://localhost:5038/api/pets/";
  pets: any = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.refreshPets();
  }

  refreshPets() {
    this.http.get(this.APIUrl + 'GetPets').subscribe((data: any) => {
      this.pets = data;
    });
  }

  addPet() {
    const newPetName = (document.getElementById('newPetName') as HTMLInputElement).value;
    const newPetType = (document.getElementById('newPetType') as HTMLInputElement).value;
    const newPetBreed = (document.getElementById('newPetBreed') as HTMLInputElement).value;
    const newPetAge = (document.getElementById('newPetAge') as HTMLInputElement).value;
    const newPetDescription = (document.getElementById('newPetDescription') as HTMLInputElement).value;

    const formData = new FormData();
    formData.append('name', newPetName);
    formData.append('type', newPetType);
    formData.append('breed', newPetBreed);
    formData.append('age', newPetAge.toString());
    formData.append('description', newPetDescription);

    this.http.post(this.APIUrl + 'AddPet', formData).subscribe((data: any) => {
      alert(data);
      this.refreshPets();
    });
  }

  deletePet(id: any) {
    this.http.delete(this.APIUrl + 'DeletePet?id=' + id).subscribe((data: any) => {
      alert(data);
      this.refreshPets();
    });
  }

  updatePet(pet: any) {
    const updatedPetName = (document.getElementById('updatePetName' + pet.id) as HTMLInputElement).value;
    const updatedPetType = (document.getElementById('updatePetType' + pet.id) as HTMLInputElement).value;
    const updatedPetBreed = (document.getElementById('updatePetBreed' + pet.id) as HTMLInputElement).value;
    const updatedPetAge = (document.getElementById('updatePetAge' + pet.id) as HTMLInputElement).value;
    const updatedPetDescription = (document.getElementById('updatePetDescription' + pet.id) as HTMLInputElement).value;
  
    const formData = new FormData();
    formData.append('id', pet.id);
    formData.append('name', updatedPetName);
    formData.append('type', updatedPetType);
    formData.append('breed', updatedPetBreed);
    formData.append('age', updatedPetAge);
    formData.append('description', updatedPetDescription);
  
    this.http.put(this.APIUrl + 'UpdatePet', formData).subscribe((data: any) => {
      alert(data);
      this.refreshPets();
    });
  }
}
