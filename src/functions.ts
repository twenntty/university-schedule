import { Professor, Lesson, ScheduleConflict } from "./types";
import { professors, classrooms, schedule } from "./data";
import { courses } from './data';

export function addProfessor(professor: Professor): void {
  professors.push(professor);
}

export function addLesson(lesson: Lesson): boolean {
  const conflict = validateLesson(lesson);
  if (conflict) {
    console.log("Конфлікт при додаванні заняття:", conflict);
    return false;
  }
  schedule.push(lesson);
  return true;
}

export function findAvailableClassrooms(timeSlot: string, dayOfWeek: string): string[] {
  const occupiedClassrooms = schedule
    .filter((lesson) => lesson.timeSlot === timeSlot && lesson.dayOfWeek === dayOfWeek)
    .map((lesson) => lesson.classroomNumber);

  return classrooms
    .filter((classroom) => !occupiedClassrooms.includes(classroom.number))
    .map((classroom) => classroom.number);
}

export function getProfessorSchedule(professorId: number): Lesson[] {
  return schedule.filter((lesson) => lesson.professorId === professorId);
}

export function validateLesson(lesson: Lesson): ScheduleConflict | null {
  const professorConflict = schedule.find(
    (l) => l.professorId === lesson.professorId && l.timeSlot === lesson.timeSlot && l.dayOfWeek === lesson.dayOfWeek
  );
  if (professorConflict) {
    return { type: "ProfessorConflict", lessonDetails: professorConflict };
  }

  const classroomConflict = schedule.find(
    (l) => l.classroomNumber === lesson.classroomNumber && l.timeSlot === lesson.timeSlot && l.dayOfWeek === lesson.dayOfWeek
  );
  if (classroomConflict) {
    return { type: "ClassroomConflict", lessonDetails: classroomConflict };
  }

  return null;
}

export function getClassroomUtilization(classroomNumber: string): number {
  const totalSlots = 5 * 5;
  const occupiedSlots = schedule.filter((lesson) => lesson.classroomNumber === classroomNumber).length;
  return (occupiedSlots / totalSlots) * 100;
}

export function getMostPopularCourseType(): string {
  const typeCounts: { [key: string]: number } = {};

  schedule.forEach((lesson) => {
    const courseType = courses.find((course) => course.id === lesson.courseId)?.type;
    if (courseType) {
      typeCounts[courseType] = (typeCounts[courseType] || 0) + 1;
    }
  });

  return Object.keys(typeCounts).reduce((a, b) => (typeCounts[a] > typeCounts[b] ? a : b));
}

export function reassignClassroom(lessonId: number, newClassroomNumber: string): boolean {
  const lesson = schedule.find((l) => l.courseId === lessonId);
  if (lesson) {
    const conflict = validateLesson({ ...lesson, classroomNumber: newClassroomNumber });
    if (!conflict) {
      lesson.classroomNumber = newClassroomNumber;
      return true;
    }
  }
  return false;
}

export function cancelLesson(lessonId: number): void {
  const index = schedule.findIndex((lesson) => lesson.courseId === lessonId);
  if (index !== -1) {
    schedule.splice(index, 1);
  }
}
