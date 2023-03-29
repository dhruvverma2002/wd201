// describe("first test case suit", ()=>{
//     test("first test case: ", ()=>{
//         expect(false).toBe(true);
//     })
// })

const todoList = require("../todo");
const { all, add, markAsComplete, overdue, dueToday, dueLater } = todoList();

describe("Todo List Test suite", () => {
    // Before starting all tests
    beforeAll(() => {
      add({
        title: "testig purpose",
        dueDate: new Date().toISOString().slice(0,10),
        completed: false,
      });
    });
  
    // for add function 
    test("Adding a new item", () => {
      const todoLength = all.length;
      add({
        title: "test item",
        dueDate: new Date().toISOString().slice(0,10),
        completed: false,
      });
      expect(all.length).toBe(todoLength + 1);
    });
  
    // for markAsComplete function 
    test("Marking as complete", () => {
      markAsComplete(0);
      expect(all[0].completed).toBe(true);
    });
  
    // for overdue function 
    test("Overdue", () => {
      add({
        title: "test overdue",
        dueDate: new Date(
          new Date().setDate(new Date().getDate() - 2)
        ).toISOString().slice(0,10),
        completed: false,
      });
      expect(overdue().length).toBe(1);
    });
  
    // for dueToday function
    test("Due today", () => {
      expect(dueToday().length).toBe(2);
    });
  
    // for dueLater function 
    test("later items", () => {
      add({
        title: "test due later",
        dueDate: new Date(
          new Date().setDate(new Date().getDate() + 2)
        ).toISOString().slice(0,10),
        completed: false,
      });
      expect(dueLater().length).toBe(1);
    });
  });