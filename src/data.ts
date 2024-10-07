import { Professor, Classroom, Course, Lesson } from "./types";

export const professors: Professor[] = [
  { id: 1, name: "Залива Віталій Вікторович", department: "Інженерія Програмного Забезпечення" },
  { id: 2, name: "Шикула Олена Миколаївна", department: "Штучний Інтелект" }
];

export const classrooms: Classroom[] = [
  { number: "202", capacity: 30, hasProjector: true },
  { number: "101", capacity: 20, hasProjector: false }
];

export const courses: Course[] = [
  { id: 1, name: "Хмарні технології", type: "Лк" },
  { id: 2, name: "Спеціальні мови програмування (TypeScript)", type: "Пр" }
];

export const schedule: Lesson[] = [];
