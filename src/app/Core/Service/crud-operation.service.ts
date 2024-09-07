import { DataStatic } from './../Enviroment/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoObject, TodoObjContentId, TodoObjToAdd } from '../Interface/CRUD';

@Injectable({
  providedIn: 'root'
})
export class CrudOperationService {


  dataObj: WritableSignal<TodoObjToAdd> = signal({} as TodoObjToAdd);

  dataObjPassId:WritableSignal<TodoObjContentId> = signal({} as TodoObjContentId)
  constructor(private _HttpClient: HttpClient) { }


  //  display Todos
  getAllTodos(): Observable<TodoObject> {
    return this._HttpClient.get<TodoObject>(`${DataStatic.BaseUrl}${DataStatic.Apikey}`)
  }

  // add todo
  addTodo(data: string): Observable<any> {
    this.dataObj.set({ title: data, apiKey: DataStatic.Apikey })
    return this._HttpClient.post<any>(`${DataStatic.BaseUrl}`, this.dataObj())
  }

  // delete todo 
  deleteTodo(id: string): Observable<ArrayBuffer> {
    this.dataObjPassId.set({ todoId: id })
    return this._HttpClient.delete<ArrayBuffer>(`${DataStatic.BaseUrl}`,
      {
        body: this.dataObjPassId()
      }
    )
  }
  // Mark Completed todo 
  markCompleted(id: string): Observable<any> {
    this.dataObjPassId.set( { todoId: id })
    return this._HttpClient.put<any>(`${DataStatic.BaseUrl}`,this.dataObjPassId())
  }
}
