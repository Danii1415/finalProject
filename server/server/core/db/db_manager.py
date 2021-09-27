from flask import jsonify
from .database import DB
from core.models.student import Student
from core.models.teacher import Teacher
from core.models.course import Course
from core.models.project import Project
from core.models.msg import Msg
import json
from datetime import datetime
from random import randint

class DBManager(object):
	def __init__(self):
		self.db = DB()
		self.student = Student(self.db)
		self.project = Project(self.db)
		self.teacher = Teacher(self.db)
		self.course = Course(self.db)
		self.msg = Msg(self.db)


	def index(self):
		return "success";

	def insert_project(self, title, teacherId, courseId, studentList, imgLink, preview, status,
				githubLink, contactName, contactPhone, contactEmail, lastUpdateByStudent, imageIsOld):
		students_id_list = []
		for student_json in studentList:
			students_id_list.append(self.insert_student(student_json))
		number = randint(100000, 999999)
		ans=self.project.find({'number': number})
		while len(ans) != 0:
			number = randint(100000, 999999)
			ans=self.project.find({'number': number})

		response = self.insert_project_with_json({'title': title, 'teacherId': teacherId, 'courseId': courseId, 
								'studentList': students_id_list, 'imgLink': imgLink, 'preview': preview, 'status': status,
								'githubLink': githubLink, 'contactName': contactName, 'contactPhone': contactPhone,
								'contactEmail': contactEmail, 'lastUpdateByStudent':lastUpdateByStudent,
								'number': number, "imageIsOld": imageIsOld})
		return response


	def insert_project_with_json(self, project_json):
		response = self.project.create(project_json)
		return response


	def get_all_projects_fron_ans(self, ans):
		for project in ans:
			
			project["teacher_name"] = self.get_teacher_by_id(project["teacherId"])["name"]
			project.pop("teacherId")
			project["course_name"] = self.course.find_by_id(project["courseId"])["name"]
			project.pop("courseId")
			project.pop("studentList")
			project.pop("contactEmail") 
			project.pop("contactName") 
			project.pop("contactPhone") 
			project.pop("created")
			project.pop("updated")
			project.pop("lastUpdateByStudent")
			project.pop("preview")
			project.pop("githubLink")
		ans = sorted(ans, key=lambda k: k['course_name'])
		return ans


	def get_all_projects(self):
		ans=self.project.find({})
		return jsonify(self.get_all_projects_fron_ans(ans))


	def get_all_projects_of_teacher(self, teacher_id):
		ans=self.project.find({'teacherId': teacher_id})
		return jsonify(self.get_all_projects_fron_ans(ans))


	def get_project_by_id(self, project_id):
		response = self.project.find_by_id(project_id)
		students_list=[]
		for student_id in response["studentList"]:
			students_list.append(self.student.find_by_id(student_id))
		response["studentList"] = students_list
		response["teacher"] = self.get_teacher_by_id(response["teacherId"])
		response.pop("teacherId")
		response["course"] = self.course.find_by_id(response["courseId"])
		response.pop("courseId")
		return (response)
		

	def update_project(self, project_id, request_json):
		project = self.project.find_by_id(project_id)

		for key in request_json:
			project[key] = request_json[key]
		
		project.pop("updated")
		project.pop("created")
		project.pop("_id")

		self.project.update(project_id, project)	
		return jsonify(request_json)


	def insert_student(self, first_name, last_name, ID, mail):
		response = self.insert_student({'firstName': first_name, 'lastName': last_name, 'id': ID, 'mail': mail})
		return response


	def insert_student(self, student_json):
		response = self.student.create(student_json)
		return response


	def get_all_students(self):
		return jsonify(self.student.find({}))

	def get_all_teachers(self):
		ans=self.teacher.find({})
		for teacher in ans:
			courses_list=[]
			for course in teacher["courses"]:
				courses_list.append(self.course.find_by_id(course))
			teacher["courses"]=courses_list
			teacher.pop("password")
		return jsonify(ans)


	def get_teacher_by_id(self, teacher_id):
		teacher=self.teacher.find_by_id(teacher_id)
		courses_list=[]
		for course in teacher["courses"]:
			courses_list.append(self.course.find_by_id(course))
		teacher["courses"]=courses_list
		teacher.pop("password")
		return teacher


	def validate_teacher(self, teacher_json):
		teacher = self.teacher.find(teacher_json)
		if teacher== []:
			return "Wrong password"
		teacher = teacher[0]
		courses_list=[]
		for course in teacher["courses"]:
			courses_list.append(self.course.find_by_id(course))
		teacher["courses"]=courses_list
		teacher.pop("password")
		return teacher["_id"]


	def insert_teacher(self, name, mail):
		response = self.teacher.create({'name': name, 'mail': mail, 'courses': []})
		return response


	def get_all_courses(self):
		return jsonify(self.course.find({}))


	def insert_course_and_append_it_to_teacher(self, name, teacher_name):
		response = self.course.create({'name': name})
		course_record = self.course.find_by_id(response)

		teacher_record = self.teacher.find_by_name(teacher_name)
		teacher_id=teacher_record['_id']
		teacher_courses = teacher_record['courses']

		teacher_courses.append(course_record["_id"])
		teacher_record['courses'] = teacher_courses
		teacher_record.pop("created")
		teacher_record.pop("updated")
		teacher_record.pop("_id")
		response2 = self.teacher.update(teacher_id, teacher_record)
		return course_record["_id"] # courseID


	def insert_msg(self, name, text, projectId, fromTeacher):
		response = self.insert_msg({"name": name, "text": text, "projectId": projectId, "fromTeacher": fromTeacher})
		return response


	def insert_msg(self, msg_json):
		response = self.msg.create(msg_json)
		return response


	def get_all_msgs_of_project(self, project_id):
		ans=self.msg.find({'projectId': project_id})
		ans = sorted(ans, key=lambda k: k['created'], reverse=True)
		return ans


	def get_project_by_id_with_msgs(self, project_id):
		response = self.get_project_by_id(project_id)
		response["msgs"] = self.get_all_msgs_of_project(project_id)
		return (response)