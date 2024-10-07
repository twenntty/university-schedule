import { addProfessor, addLesson, getProfessorSchedule, getClassroomUtilization, getMostPopularCourseType, findAvailableClassrooms } from "./functions";
import { Lesson } from "./types";

addProfessor({ id: 3, name: "Звенігородський Олександр Сергійович", department: "Штучний Інтелект" });

const lesson: Lesson = {
    courseId: 1,
    professorId: 1,
    classroomNumber: "101",
    dayOfWeek: "Понеділок",  // Це значення вже є частиною union type DayOfWeek
    timeSlot: "8:30-10:00"
  };

const added = addLesson(lesson);
console.log("Заняття додано:", added);

console.log("Розклад професора 1:", getProfessorSchedule(1));

console.log("Використання аудиторії 101:", getClassroomUtilization("101") + "%");

console.log("Найпопулярніший тип занять:", getMostPopularCourseType());

const availableClassrooms = findAvailableClassrooms("8:30-10:00", "Понеділок");
console.log("Доступні аудиторії на понеділок у 8:30:", availableClassrooms);
