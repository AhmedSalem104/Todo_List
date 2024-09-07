export interface TodoObject {
    message: string
    todos: Todo[]
}

export interface Todo {
    _id: string
    title: string
    completed: boolean
    apiKey: string
    __v: number
    createdAt: string
    updatedAt: string
}

export interface TodoObjToAdd {
    title: string
    apiKey: string
}

export interface TodoObjContentId {
    todoId: string
}
