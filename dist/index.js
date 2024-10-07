"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var functions_1 = require("./functions");
(0, functions_1.addProfessor)({ id: 3, name: "Звенігородський Олександр Сергійович", department: "Штучний Інтелект" });
var lesson = {
    courseId: 1,
    professorId: 1,
    classroomNumber: "101",
    dayOfWeek: "Понеділок", // Це значення вже є частиною union type DayOfWeek
    timeSlot: "8:30-10:00"
};
var added = (0, functions_1.addLesson)(lesson);
console.log("Заняття додано:", added);
console.log("Розклад професора 1:", (0, functions_1.getProfessorSchedule)(1));
console.log("Використання аудиторії 101:", (0, functions_1.getClassroomUtilization)("101") + "%");
console.log("Найпопулярніший тип занять:", (0, functions_1.getMostPopularCourseType)());
var availableClassrooms = (0, functions_1.findAvailableClassrooms)("8:30-10:00", "Понеділок");
console.log("Доступні аудиторії на понеділок у 8:30:", availableClassrooms);
