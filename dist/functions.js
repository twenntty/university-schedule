"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProfessor = addProfessor;
exports.addLesson = addLesson;
exports.findAvailableClassrooms = findAvailableClassrooms;
exports.getProfessorSchedule = getProfessorSchedule;
exports.validateLesson = validateLesson;
exports.getClassroomUtilization = getClassroomUtilization;
exports.getMostPopularCourseType = getMostPopularCourseType;
exports.reassignClassroom = reassignClassroom;
exports.cancelLesson = cancelLesson;
var data_1 = require("./data");
var data_2 = require("./data");
function addProfessor(professor) {
    data_1.professors.push(professor);
}
function addLesson(lesson) {
    var conflict = validateLesson(lesson);
    if (conflict) {
        console.log("Конфлікт при додаванні заняття:", conflict);
        return false;
    }
    data_1.schedule.push(lesson);
    return true;
}
function findAvailableClassrooms(timeSlot, dayOfWeek) {
    var occupiedClassrooms = data_1.schedule
        .filter(function (lesson) { return lesson.timeSlot === timeSlot && lesson.dayOfWeek === dayOfWeek; })
        .map(function (lesson) { return lesson.classroomNumber; });
    return data_1.classrooms
        .filter(function (classroom) { return !occupiedClassrooms.includes(classroom.number); })
        .map(function (classroom) { return classroom.number; });
}
function getProfessorSchedule(professorId) {
    return data_1.schedule.filter(function (lesson) { return lesson.professorId === professorId; });
}
function validateLesson(lesson) {
    var professorConflict = data_1.schedule.find(function (l) { return l.professorId === lesson.professorId && l.timeSlot === lesson.timeSlot && l.dayOfWeek === lesson.dayOfWeek; });
    if (professorConflict) {
        return { type: "ProfessorConflict", lessonDetails: professorConflict };
    }
    var classroomConflict = data_1.schedule.find(function (l) { return l.classroomNumber === lesson.classroomNumber && l.timeSlot === lesson.timeSlot && l.dayOfWeek === lesson.dayOfWeek; });
    if (classroomConflict) {
        return { type: "ClassroomConflict", lessonDetails: classroomConflict };
    }
    return null;
}
function getClassroomUtilization(classroomNumber) {
    var totalSlots = 5 * 5;
    var occupiedSlots = data_1.schedule.filter(function (lesson) { return lesson.classroomNumber === classroomNumber; }).length;
    return (occupiedSlots / totalSlots) * 100;
}
function getMostPopularCourseType() {
    var typeCounts = {};
    data_1.schedule.forEach(function (lesson) {
        var _a;
        var courseType = (_a = data_2.courses.find(function (course) { return course.id === lesson.courseId; })) === null || _a === void 0 ? void 0 : _a.type;
        if (courseType) {
            typeCounts[courseType] = (typeCounts[courseType] || 0) + 1;
        }
    });
    return Object.keys(typeCounts).reduce(function (a, b) { return (typeCounts[a] > typeCounts[b] ? a : b); });
}
function reassignClassroom(lessonId, newClassroomNumber) {
    var lesson = data_1.schedule.find(function (l) { return l.courseId === lessonId; });
    if (lesson) {
        var conflict = validateLesson(__assign(__assign({}, lesson), { classroomNumber: newClassroomNumber }));
        if (!conflict) {
            lesson.classroomNumber = newClassroomNumber;
            return true;
        }
    }
    return false;
}
function cancelLesson(lessonId) {
    var index = data_1.schedule.findIndex(function (lesson) { return lesson.courseId === lessonId; });
    if (index !== -1) {
        data_1.schedule.splice(index, 1);
    }
}
