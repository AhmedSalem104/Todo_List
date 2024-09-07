import { Component, NgModule, OnInit, signal, WritableSignal } from '@angular/core';
import { Todo } from '../../Core/Interface/CRUD';
import { CrudOperationService } from '../../Core/Service/crud-operation.service';
import { FormsModule, NgModel } from '@angular/forms';


import {ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit {

  markcompletedClass:WritableSignal<string> = signal("iscompleted")
  markNotcompletedClass:WritableSignal<string> = signal("isNotcompleted")
  todoList:WritableSignal<Todo[]>  = signal([])
  Text: string = ""
  constructor(private _CrudOperationService: CrudOperationService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.dispalyAllTodos()
  }
  addTodo() {
    if (this.Text.trim() == "" || this.Text == "undefiend") {
       this.showError() 
    } else {
      this.addTodoFetchApi()
    }

  }
  dispalyAllTodos() {
    this._CrudOperationService.getAllTodos().subscribe({
      next: (res) => {
        this.todoList.set( res.todos)
      },
    })
  }
  addTodoFetchApi() {
    this._CrudOperationService.addTodo(this.Text).subscribe({
      next: (res) => {
        this.todoList.set(res.todos)
        this. showSuccess()
        this.clear()
        this.dispalyAllTodos()
      },
    })
  }
  deleteTask(id: string) {
    this._CrudOperationService.deleteTodo(id).subscribe({
      next: (res) => {
         this.showSuccessDeleted() 
        this.dispalyAllTodos()
      },
    })
  }
  markCompletedTask(id: string) {

    this._CrudOperationService.markCompleted(id).subscribe({
      next: (res) => {
        this.dispalyAllTodos()
         this.showSuccessCompleted() 
      },
    })
  }
  clear() {
    this.Text = " ";
  }

  showSuccess() {
    this.toastr.success(' Todo added',"Todo App",{
      timeOut: 1000,
    });
  }
  showError() {
    this.toastr.warning('Todo is Empty..?',"Todo App",{
      timeOut: 1000,
    });
  }
  showSuccessDeleted() {
    this.toastr.success(' Todo was Deleted!',"Todo App",{
      timeOut: 1000,
    });
  }
  showSuccessCompleted() {
    this.toastr.info(' Todo was Completed',"Todo App",{
      timeOut: 1000,
    });
  }

/*   succesfulyAlert() {

    Swal.fire({
      icon: "success",
      title: 'successfly',
      position: "top-end",
      showClass: {
        popup: `
          animate__animated
          animate__bounceInRight    
        `
      },
      hideClass: {
        popup: `
          animate__animated
          animate__bounceOutRight
        `
      },
     timer: 900,
      showConfirmButton: false

    });


  }
  faildAlert() {

    Swal.fire({
      title: "Todo is Empty",
      icon: "error",
      position: "top-end",
      showClass: {
        popup: `
          animate__animated
          animate__bounceInRight    
        `
      },
      hideClass: {
        popup: `
          animate__animated
          animate__bounceOutRight
        `
      },
     timer: 900,
      showConfirmButton: false

    });






  }
  deletTodoAlert() {

    Swal.fire({
      title: "Todo was Deleted",
      icon: "success",
      position: "top-end",
      showClass: {
        popup: `
          animate__animated
          animate__bounceInRight    
        `
      },
      hideClass: {
        popup: `
          animate__animated
          animate__bounceOutRight
        `
      },
     timer: 900,
      showConfirmButton: false

    });






  }
  markCompletedTodoAlert() {

    Swal.fire({
      title: "Todo Completed",
      icon: "success",
      position: "top-end",
       showClass: {
         popup: `
           animate__animated
           animate__slideInRight    
         `
       },
       hideClass: {
         popup: `
           animate__animated
           animate__bounceOutRight
         `
       },
      timer: 900,
      imageWidth: 200,
      imageHeight: 200,
      showConfirmButton: false

    });






  } */

}




