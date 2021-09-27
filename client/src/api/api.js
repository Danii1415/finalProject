import Axios from "axios";
import { BASE_ROUTE } from "../../src/const";

export const getProjects = async () => {
  try {
    const res = await Axios.get(`${BASE_ROUTE}/projects/`);
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const getTeacherData = async () => {
  try {
    const res = await Axios.get(`${BASE_ROUTE}/teachers/`);
    if (res && res.data) return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const uploadImage = async (formData) => {
  try {
    await Axios({
      method: "post",
      url: `${BASE_ROUTE}/upload/`,
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
    const res = await Axios.post(`${BASE_ROUTE}/projects/`, {
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
