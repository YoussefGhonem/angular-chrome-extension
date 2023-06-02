import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  saveData(key: string, value: any): void {
    chrome.storage.sync.set({ [key]: value }, () => {
      console.log('Data saved:', key, value);
    });
  }

  removeData(key: string): void {
    chrome?.storage?.sync?.remove(key, () => {
      console.log('Data removed:', key);
    });
  }


  getData(key: string): any {
    chrome?.storage?.sync?.get(key, ({ value }) => {
      console.log("value", value);
      return value;
    });
  }


}
