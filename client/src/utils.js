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
