
import os
from flask import Flask, flash, request, redirect, url_for, jsonify, send_file
from werkzeug.utils import secure_filename
import random
from pymongo import MongoClient
from flask_cors import CORS, cross_origin
from core import app

from .db.database import DB
from .models.student import Student 
from .models.project import Project
from .models.teacher import Teacher
from .models.sadna import Sadna
from .mail_service import Mail_Service
from .db.db_manager import DBManager
import bson
import json
import secrets
import string

db_manager=DBManager()
db = DB()
student = Student(db)
project = Project(db)
teacher = Teacher(db)
sadna = Sadna(db)

mail_service = Mail_Service()


app.config['JSON_AS_ASCII'] = False
UPLOAD_FOLDER = '/app/projects_pictures/'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


@app.route('/')
def index():
	mail_service.send_mail("levsagiv@gmail.com", "Test - subject", "Test - content")
	return db_manager.index()

@app.route('/init_db')
def init_for_testing_db():
	db.client.drop_database('finalProjectsDB')
	db.db= db.client.finalProjectsDB
	
	name = "Yossi"
	ID = "203516794"
	mail = "yossi@mta.ac.il"
	sadnas= []
	password="1234"
	teacherId = teacher.create({'name': name, 'mail': mail, 'sadnas': sadnas, 'password': password})
	sadnaId=db_manager.insert_sadna_and_append_it_to_teacher("sadna2", "Yossi")
	title = "project100"
	studentList =[{'firstName': "sagiv", 'lastName': "levy", 'id': "203516794", 'mail': "sagivle@mta.ac.il"},
					{'firstName': "daniel", 'lastName': "daniel", 'id': "123456789", 'mail': "levsagiv@gmail.com"}]
	imgLink = ""
	preview = "preview preview preview"
	status = "pendingTeacherApproval"
	githubLink = "htttp://github..."
	contactName = "sagiv"
	contactPhone="0522222222"
	contactEmail = "sagivle@mta.ac.il"
	lastUpdateByStudent = "1232131231231231231231"
	db_manager.insert_project(title, teacherId, sadnaId, studentList, imgLink, preview
				,status, githubLink, contactName, contactPhone, contactEmail, lastUpdateByStudent, False)

	teachers = set()
	with open('a.json') as data_file:    
		data = json.load(data_file)

	teachers_with_sadnaot_dict={}
	for project in data:
		teacher_temp = ""
		sadna_temp = ""
		for detail in project['details']:
			if detail['value'] ==":שם המנחה":
				teacher_temp = detail['key']
				teachers.add(detail['key'])
			elif detail['value'] == ":שם הסדנה":
				sadna_temp = detail['key']
			if sadna_temp!="" and teacher_temp!="":
				teachers_with_sadnaot_dict[sadna_temp] = teacher_temp
        
	mail = "levsagiv@gmail.com"
	
	for teacher_temp in teachers:
		alphabet = string.ascii_letters + string.digits
		password = ''.join(secrets.choice(alphabet) for i in range(8))
		teacher.create({'name': teacher_temp, 'mail': mail, 'sadnas': sadnas, 'password': password})
		mail_service.send_teacher_password_mail(mail, password)
	for sadna_name in teachers_with_sadnaot_dict.keys():
		sadnaId=db_manager.insert_sadna_and_append_it_to_teacher(sadna_name, teachers_with_sadnaot_dict[sadna_name])

	return jsonify("success to init DB")


@app.route('/teachers/validate/', methods=['POST'])
def validate_teacher():
	if request.method == "POST":
		request_json = request.get_json()
		response = db_manager.validate_teacher(request_json)
		if response == "Wrong password":
			return 404
		return jsonify(response), 201



@app.route('/teachers/', methods=['GET'])
def get_teachers():
	return db_manager.get_all_teachers(), 200


@app.route('/students/', methods=['GET'])
def get_students():
	return db_manager.get_all_students(), 200


@app.route('/students/<string:student_id>/', methods=['GET'])
def get_student(student_id):
	return student.find_by_id(student_id), 200


@app.route('/students/', methods=['POST'])
def add_student():
	if request.method == "POST":
		request_json = request.get_json()
		response = db_manager.insert_student(request_json)
		return response


@app.route('/students/<string:student_id>/', methods=['DELETE'])
def delete_student(student_id):
	if request.method == "DELETE":
		student.delete(student_id)
		return "student Deleted"


@app.route('/projects/', methods=['GET'])
def get_projects():
	if request.method == "GET":
		response = db_manager.get_all_projects()
		return response, 200


@app.route('/projects/', methods=['POST'])
def add_project():
	if request.method == "POST":
		request_json = request.get_json()
		response = db_manager.insert_project(request_json["title"], request_json["teacherId"], request_json["sadnaId"]
									, request_json["studentList"], request_json["imgLink"], request_json["preview"]
									, request_json["status"], request_json["githubLink"], request_json["contactName"]
									, request_json["contactPhone"], request_json["contactEmail"]
									, request_json["lastUpdateByStudent"], request_json["imageIsOld"])
		
		try:
			sadna = sadna.find_by_id(request_json["sadnaId"])
			if sadna:
				if sadna[name]:
					sadna_id = response[13:]
					project = db_manager.get_project_by_id(sadna_id)
					if project:
						if project["number"]:
							project_number = project["number"]
							mail_service.send_create_new_project_mail(["levsagiv@gmail.com", "danii1415@gmail.com"], sadna[name], project_number, request_json["title"])
		except Exception as e:
			print("Send Mail Error! " + str(e))
		return jsonify(response), 201


@app.route('/projects/<string:project_id>/', methods=['GET'])
def get_project_by_id(project_id):
		response = db_manager.get_project_by_id(project_id)
		return jsonify(response), 200


@app.route('/projects/msgs/<string:project_id>/', methods=['GET'])
def get_project_by_id_with_msgs(project_id):
		response = db_manager.get_project_by_id_with_msgs(project_id)
		return jsonify(response), 200


@app.route('/projects/<string:project_id>/', methods=['PUT'])
def update_project(project_id):
	if request.method == "PUT":
		request_json = request.get_json()
		response = db_manager.update_project(project_id, request_json)
		try:
			print(request_json["status"])
		except Exception as e:
			print("status wasn't changed. " + str(e))
			return response, 201

		mail_service.send_status_was_changed_mail(["levsagiv@gmail.com", "danii1415@gmail.com"], request_json["status"])
		return response, 201


@app.route('/msg/', methods=['POST'])
def insert_msg():
	if request.method == "POST":
		request_json = request.get_json()
		response = db_manager.insert_msg(request_json)
		#send_to_list=[]
		#project = db_manager.get_project_by_id(request_json["projectId"])
		#for student in project["studentList"]:
			#mail_service.send_mail(student["mail"], "Test - subject - " + request_json["name"], "Test - content - " + request_json["text"])
			#mail_service.send_mail("levsagiv@gmail.com", "Test - subject - " + request_json["name"], "Test - content - " + request_json["text"])
		#mail_service.send_mail(project["teacher]["mail"], "Test - subject - " + request_json["name"], "Test - content - " + request_json["text"])
		try:
			mail_service.send_msg_mail(["levsagiv@gmail.com", "danii1415@gmail.com"], request_json["text"])
		except Exception as e:
			print("Send Mail Error! " + str(e))
		return response, 201


@app.route('/projects/only_msgs/<string:project_id>/', methods=['GET'])
def get_msgs_by_project_id(project_id):
		response = db_manager.get_all_msgs_of_project(project_id)
		return jsonify(response), 200

@app.route('/projects/teacher/<string:teacher_id>/', methods=['GET'])
def get_all_projects_of_teacher(teacher_id):
		response = db_manager.get_all_projects_of_teacher(teacher_id)
		return response, 200


@app.route('/upload/', methods=['POST'])
def fileUpload():
    target=os.path.join(UPLOAD_FOLDER,'test_docs')
    if not os.path.isdir(target):
        os.mkdir(target)
    file = request.files['file'] 
    filename = request.form.get('filename')
    if filename[-3:] in ALLOWED_EXTENSIONS or filename[-4:] in ALLOWED_EXTENSIONS:
    	destination="/".join([target, filename])
    	file.save(destination)
    	response=filename
    	project_id = os.path.splitext(filename)[0]
    	db_manager.update_project(project_id, {"imgLink":filename})
    	return jsonify(response), 201
    response="Failed to upload image"
    return jsonify(response), 404


@app.route('/get_image/<string:project_id>/')
def get_image(project_id):
	target = os.path.join(UPLOAD_FOLDER,'test_docs')
	if not os.path.isdir(target):
		response = "Failed to get image"
		return jsonify(response), 404
	filename = db_manager.get_project_by_id(project_id)["imgLink"]
	destination = "/".join([target, filename])
	if not os.path.isfile(destination):
		response = "Failed to get image"
		return jsonify(response), 404
	extension = str(os.path.splitext(destination)[1])
	return send_file(destination, mimetype='image/' + extension[1:])