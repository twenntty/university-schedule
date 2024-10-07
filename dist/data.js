"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schedule = exports.courses = exports.classrooms = exports.professors = void 0;
exports.professors = [
    { id: 1, name: "Залива Віталій Вікторович", department: "Інженерія Програмного Забезпечення" },
    { id: 2, name: "Шикула Олена Миколаївна", department: "Штучний Інтелект" }
];
exports.classrooms = [
    { number: "202", capacity: 30, hasProjector: true },
    { number: "101", capacity: 20, hasProjector: false }
];
exports.courses = [
    { id: 1, name: "Хмарні технології", type: "Лк" },
    { id: 2, name: "Спеціальні мови програмування (TypeScript)", type: "Пр" }
];
exports.schedule = [];
