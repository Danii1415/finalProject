from flask import jsonify
from .database import DB
from core.models.models import Quote
from core.models.student import Student
from core.models.teacher import Teacher
from core.models.workshop import Workshop
from core.models.project import Project
from core.models.msg import Msg


class DBManager(object):
	def __init__(self):
		self.db = DB()
		self.student = Student(self.db)
		self.project = Project(self.db)
		self.teacher = Teacher(self.db)
		self.workshop = Workshop(self.db)
		self.msg = Msg(self.db)



	def index(self):
		return "success";

	def insert_project(self, title, teacherId, workshopId, studentList, imgLink, preview, status):
		students_id_list = []
		for student_json in studentList:
			students_id_list.append(self.insert_student(student_json))
		response = self.insert_project_with_json({'title': title, 'teacherId': teacherId, 'workshopId': workshopId
											, 'studentList': students_id_list, 'imgLink': imgLink, 'preview': preview, 'status': status})
		return response


	def insert_project_with_json(self, project_json):
		response = self.project.create(project_json)
		return response


	def get_all_projects(self):
		ans=self.project.find({})
		for project in ans:
			students_list=[]
			for student_id in project["studentList"]:
				students_list.append(self.student.find_by_id(student_id))
			project["studentList"] = students_list
			project["teacher"] = self.get_teacher_by_id(project["teacherId"])
			project.pop("teacherId")
			project["workshop"] = self.workshop.find_by_id(project["workshopId"])
			project.pop("workshopId")

		return jsonify(ans)


	def get_all_projects_of_teacher(self, teacher_id):
		ans=self.project.find({'teacherId': teacher_id})
		for project in ans:
			students_list=[]
			for student_id in project["studentList"]:
				students_list.append(self.student.find_by_id(student_id))
			project["studentList"] = students_list
			project["teacher"] = self.get_teacher_by_id(project["teacherId"])
			project.pop("teacherId")
			project["workshop"] = self.workshop.find_by_id(project["workshopId"])
			project.pop("workshopId")
		return jsonify(ans)


	def get_project_by_id(self, project_id):
		response = self.project.find_by_id(project_id)
		students_list=[]
		for student_id in response["studentList"]:
			students_list.append(self.student.find_by_id(student_id))
		response["studentList"] = students_list
		response["teacher"] = self.get_teacher_by_id(project["teacherId"])
		response.pop("teacherId")
		response["workshop"] = self.workshop.find_by_id(project["workshopId"])
		response.pop("workshopId")
		return jsonify(response)
		
	

	def update_project(self, request_json):
		project = get_project_by_id(request_json["_id"])
		for prop in request_json:
			for attribute, value in prop.items():
				if attribute != "_id":
					project[attribute] = value

		project.update(project["_id"], project)	
		return jsonify(project)


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

	def get_teacher_by_id(self, teacher_id):
		teacher=self.teacher.find_by_id(teacher_id)
		workshops_list=[]
		for workshop in teacher["workshops"]:
			workshops_list.append(self.workshop.find_by_id(workshop))
		teacher["workshops"]=workshops_list
		return (teacher)

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
		teacher_workshops = teacher_record['workshops']

		#del teacher_record['_id']
		#del teacher_record['created']
		#del teacher_record['updated']
		teacher_workshops.append(workshop_record["_id"])
		teacher_record['workshops'] = teacher_workshops
		teacher_record.pop("created")
		teacher_record.pop("updated")
		teacher_record.pop("_id")
		print(teacher_record)
		response2 = self.teacher.update(teacher_id, teacher_record)
		return workshop_record["_id"] # workshopID




	def insert_msg(self, name, text, projectId, fromTeacher):
		response = self.insert_msg({"name": name, "text": text, "projectId": projectId, "fromTeacher": fromTeacher})
		return response

	def insert_msg(self, msg_json):
		response = self.msg.create(msg_json)
		return response

	def get_all_msgs_of_project(self, project_id):
		ans=self.msg.find({'projectId': project_id})
		return jsonify(ans)