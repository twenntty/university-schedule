export type DayOfWeek = "Понеділок" | "Вівторок" | "Середа" | "Четвер" | "Пятниця";

export type TimeSlot = "8:30-10:00" | "10:15-11:45" | "12:15-13:45" | "14:00-15:30" | "15:45-17:15";

export type CourseType = "Лк" | "Сем" | "Лб" | "Пр";

export type Professor = {
  id: number;
  name: string;
  department: string;
};

export type Classroom = {
  number: string;
  capacity: number;
  hasProjector: boolean;
};

export type Course = {
  id: number;
  name: string;
  type: CourseType;
};

export type Lesson = {
  courseId: number;
  professorId: number;
  classroomNumber: string;
  dayOfWeek: DayOfWeek;
  timeSlot: TimeSlot;
};

export type ScheduleConflict = {
  type: "ProfessorConflict" | "ClassroomConflict";
  lessonDetails: Lesson;
};
