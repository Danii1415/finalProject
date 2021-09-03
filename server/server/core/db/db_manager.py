from flask import jsonify
from .database import DB
from core.models.student import Student
from core.models.teacher import Teacher
from core.models.workshop import Workshop
from core.models.project import Project


class DBManager(object):
	def __init__(self):
		self.db = DB()
		self.student = Student(self.db)
		self.project = Project(self.db)
		self.teacher = Teacher(self.db)
		self.workshop = Workshop(self.db)



	def index(self):
		return "success";

	def insert_project(self, title, teacherId, workshopId, studentList, imgLink, preview):
		students_id_list = []
		for student_json in studentList:
			students_id_list.append(self.insert_student(student_json))
		response = self.project.create({'title': title, 'teacherId': teacherId, 'workshopId': workshopId
											, 'studentList': students_id_list, 'imgLink': imgLink, 'preview': preview		
											})
		return response

	def get_all_projects(self):
		ans=self.project.find({})
		for project in ans:
			students_list=[]
			for student_id in project["studentList"]:
				students_list.append(self.student.find_by_id(student_id))
			project["studentList"] = students_list
		return jsonify(ans)
		
	
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
			workshops_list=[]
			for workshop in teacher["workshops"]:
				workshops_list.append(self.workshop.find_by_id(workshop))
			teacher["workshops"]=workshops_list
		return jsonify(ans)

	def insert_teacher(self, name, mail):
		response = self.teacher.create({'name': name, 'mail': mail, 'workshops': []})
		return response



	def get_all_workshops(self):
		return jsonify(self.Workshop.find({}))

	def insert_workshop_and_append_it_to_teacher(self, name, teacher_name):
		response = self.workshop.create({'name': name})
		workshop_record = self.workshop.find_by_id(response)

		teacher_record = self.teacher.find_by_name(teacher_name)
		#teacher_record["workshops"] = [ DBRef(collection = "workshops", id = workshop_record["_id"]) ]
		teacher_id=teacher_record['_id']
		teacher_workshops = []#teacher_record['workshops']
		#del teacher_record['_id']
		#del teacher_record['created']
		#del teacher_record['updated']
		teacher_workshops.append(workshop_record["_id"])
		response2 = self.teacher.update(teacher_id, {'workshops': teacher_workshops})
		return workshop_record["_id"] # workshopID