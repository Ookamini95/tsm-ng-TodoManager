import { NgClass } from '@angular/common';
import { Component, inject, input, OnInit, signal } from '@angular/core';

import { TodoStatus } from '@shared/models/todo.model';
import { TodoService } from '@shared/services/data/todos.service';

@Component({
    selector: 'app-slot-control',
    standalone: true,
    templateUrl: './dnd-slot-control.component.html',
    styleUrl: './dnd-slot-control.component.css',
    imports: [
        NgClass
    ],
})
export class DndSlotControlComponent {
    protected ts = inject(TodoService);

    todoId = input.required<string>();
    todoStatus = input.required<TodoStatus>();
    
    _isOpen = signal(false);

    toggle() {
        this._isOpen.update(prev => !prev);
    }
    changedStatus(e: any) {
        this.ts.updateTodo({
            action: "todo/update",
            id: this.todoId(),
            status: e.target.id as TodoStatus
        })
    }
    editTodo(e: any) {
        e.preventDefault();
        this.ts.selectedTodoId.set(+this.todoId());
    }
    deleteTodo(e: any) {
        e.preventDefault();
        this.ts.deleteTodo({
            action: "todo/delete",
            id: this.todoId()
        })
    }
    _openMenuAnimation() {
        const baseClasses = "flex justify-center items-center p-2 mask mask-circle transition-all duration-300 "
        if (this._isOpen()) return baseClasses + "bg-slate-400/50";
        return baseClasses + "bg-slate-300 rotate-180";
    }
}