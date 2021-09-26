import Axios from "axios";

export const getTeacherData = async () => {
  try {
    const res = await Axios.get("http://localhost:5000/teachers/");
    if (res && res.data) return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const uploadImage = async (formData) => {
  try {
    await Axios({
      method: "post",
      url: "http://localhost:5000/upload/",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
  } catch (e) {
    console.log(e);
  }
};

export const submitProject = async (
  title,
  teacherId,
  courseId,
  studentList,
  preview,
  githubLink,
  contactEmail,
  contactName,
  contactPhone
) => {
  try {
    const res = await Axios.post("http://localhost:5000/projects/", {
      title: title,
      teacherId: teacherId,
      courseId: courseId,
      studentList: studentList,
      imgLink: "",
      preview: preview,
      status: "pendingTeacherApproval",
      githubLink: githubLink,
      contactEmail: contactEmail,
      contactName: contactName,
      contactPhone: contactPhone,
      lastUpdateByStudent: Date.now().toString(),
      imageIsOld: false,
    });
    return res;
  } catch {}
};
