// BAD PRACTICE - not proper MVC. Should be separated to files.
class Renderer {


render(todos) {

    $("#todos").empty()
    const source = $("#todo-template").html();
    const template = Handlebars.compile(source);
    let newHTML = template({todo:todos});
    $("#todos").append(newHTML)
}
}

const renderer = new Renderer()

const add = function () {
    $.post('/todo', { text: $("#todo-input").val(), priority: $("#priority").find(":selected").val() }, function (todos) {
        renderer.render(todos)
        $("#todo-input").val("")
    })
}

$("#todos").on("click", ".fa-check-circle", function () {
    const id = $(this).closest(".todo").data().id
    console.log(id)
    $.ajax({
        method: "PUT",
        url: "/todo/" + id,
        success: todos => renderer.render(todos)
    })
})

$("#todos").on("click", ".fa-trash", function () {
    const id = $(this).closest(".todo").data().id
    $.ajax({
        method: "DELETE",
        url: "/todo/" + id,
        success: todos => renderer.render(todos)
    })
})

$("#todos").on("click", ".text", function () {
    const id = $(this).closest(".todo`").data().id
    $.ajax({
        method: "PUT",
        url: "/upgrade/" + id,
        success: todos => renderer.render(todos)
    })
});

$.get('/todos', todos => renderer.render(todos))