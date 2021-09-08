export const getStudentsNamesFormat = (students) => {
  let res = "";
  for (let i = 0; i < students.length; i++) {
    res +=
      students.length - i !== 1 ? `${students[i].name}, ` : students[i].name;
  }
  return res;
};

export class Student {
  constructor(firstName = "", lastName = "", id = "", mail = "") {
    this.firstName = firstName;
    this.lastName = lastName;
    this.id = id;
    this.mail = mail;
  }
}

export class ProjectToAdd {
  constructor(
    imgLink = "",
    title = "",
    teacherId = "",
    workshopId = "",
    studentsList = [new Student()],
    preview = "",
    status = "pendingTeacherApproval"
    // githubLink = "",
    // contactEmail = "",
    // contactName = "",
    // contactPhone = ""
  ) {
    this.title = title;
    this.teacherId = "";
    this.workshopId = "";
    this.studentsList = studentsList;
    this.imgLink = imgLink;
    this.preview = preview;
    this.status = status;
    // this.githubLink = githubLink;
    // this.contactEmail = contactEmail;
    // this.contactName = contactName;
    // this.contactPhone = contactPhone;
  }
}

export class ProjectToEdit {
  constructor(
    imgLink = "",
    title = "",
    studentsList = [new Student()],
    preview = "",
    status = "",
    workshopName = "",
    teacherName = ""
    // githubLink = "",
    // contactEmail = "",
    // contactName = "",
    // contactPhone = ""
  ) {
    this.title = title;
    this.studentsList = studentsList;
    this.imgLink = imgLink;
    this.preview = preview;
    this.status = status;
    this.workshopName = workshopName;
    this.teacherName = teacherName;
    // this.githubLink = githubLink;
    // this.contactEmail = contactEmail;
    // this.contactName = contactName;
    // this.contactPhone = contactPhone;
  }
}
