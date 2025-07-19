// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private axiosClient: AxiosInstance;

  constructor() {
    this.axiosClient = axios.create({
      baseURL: 'http://localhost:8080/api', // replace with your backend URL
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  // Generic POST request
  postData(endpoint: string, data: any) {
    return this.axiosClient.post(endpoint, data);
  }

  // Generic GET request (if needed)
  getData(endpoint: string) {
    return this.axiosClient.get(endpoint);
  }
}
