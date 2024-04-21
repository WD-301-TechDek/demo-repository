import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pet-shop-advocacy-app';
  readonly APIUrl = "http://localhost:5038/api/pets/"; // Update the API URL for pets

  constructor(private http: HttpClient) {}

  pets: any = [];

  // Method to fetch pets from the server
  refreshPets() {
    this.http.get(this.APIUrl + 'GetPets').subscribe((data: any) => {
      this.pets = data;
    });
  }

  // Method to add a new pet
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

  // Method to delete a pet by ID
  deletePet(id: any) {
    this.http.delete(this.APIUrl + 'DeletePet?id=' + id).subscribe((data: any) => {
      alert(data);
      this.refreshPets();
    });
  }

  ngOnInit() {
    this.refreshPets();
  }

  updatePet(pet: any) {
    const updatedPetName = (document.getElementById('updatePetName') as HTMLInputElement).value;
    const updatedPetType = (document.getElementById('updatePetType') as HTMLInputElement).value;
    const updatedPetBreed = (document.getElementById('updatePetBreed') as HTMLInputElement).value;
    const updatedPetAge = (document.getElementById('updatePetAge') as HTMLInputElement).value;
    const updatedPetDescription = (document.getElementById('updatePetDescription') as HTMLInputElement).value;
  
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